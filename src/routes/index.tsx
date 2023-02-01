import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StackRoutes } from './stack.routes';
import { useAuthContext } from '../hooks/AuthContext';
import { AuthRoutes } from './auth.routes';

export function Routes() {

  // const { user } = useAuthContext()

  // if (!user.id) {

  //   return (
  //     <NavigationContainer>
  //       <AuthRoutes />
  //     </NavigationContainer>
  //   )
  // }

  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}