import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useWindowDimensions } from 'react-native'
import { ConfirmeButton } from '../../components/ConfirmeButton'

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export function SchedulingComplete() {

  const { width } = useWindowDimensions()

  const navigation = useNavigation()

  function handleOpenHome() {
    navigation.navigate('Home')
  }

  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmeButton title='OK' onPress={handleOpenHome} />
      </Footer>
    </Container>
  );
}