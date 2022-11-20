import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string,
  given_name: string,
  email: string,
  picture?: string
}

interface AuthorizationResponse {
  params: {
    access_token: string
  },
  type: string
}

interface AuthContextProps {
  user: User,
  sigInWithGoogle: () => Promise<void>,
  signOut: () => Promise<void>,
  userStorageloading: boolean
}

interface AuthContextProvider {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProvider) {

  const [user, setUser] = useState<User>({} as User)
  const [userStorageloading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@rentx:user'



  async function sigInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

        const userInfo = await response.json() as User

        const userLogged = {
          id: String(userInfo.id),
          email: userInfo.email,
          given_name: userInfo.given_name,
          picture: userInfo.picture
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }


  useEffect(() => {
    async function loadUser() {
      const data = await AsyncStorage.getItem(userStorageKey)
      const user = await JSON.parse(data!) as User

      if (user) {
        setUser(user)
      }
      setUserStorageLoading(false)
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, sigInWithGoogle, signOut, userStorageloading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)