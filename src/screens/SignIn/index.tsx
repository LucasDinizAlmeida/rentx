import React, { useState } from 'react';
import LogoSvg from '../../assets/logo.svg'
import GoogleSvg from '../../assets/google.svg'
import AppleSvg from '../../assets/apple.svg'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuthContext } from '../../hooks/AuthContext';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';

export function SignIn() {

  const { sigInWithGoogle } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)

  const theme = useTheme()


  async function handleSigInWithGoogle() {
    try {
      setIsLoading(true)
      return await sigInWithGoogle()

    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta google.')
      setIsLoading(false)
    }
  }


  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Aqui temos {'\n'}
            o carro ideal {'\n'}
            para você alugar {'\n'}
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSigInWithGoogle}
          />
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleSvg}
            // onPress={handleSignInWithApple}
            />
          }


        </FooterWrapper>
        {
          isLoading &&
          <ActivityIndicator
            color={theme.colors.success}
            style={{ marginTop: 18 }}
          />
        }
      </Footer>

    </Container>
  );
}