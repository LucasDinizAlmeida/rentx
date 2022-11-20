import React from 'react';

import { ThemeProvider } from 'styled-components'
import theme from './src/styles/theme'
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'

import { Routes } from './src/routes';
import { AuthContextProvider } from './src/hooks/AuthContext';

// SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })

  if (!fontsLoaded) {
    return
  }


  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

