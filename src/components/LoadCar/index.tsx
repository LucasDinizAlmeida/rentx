import React from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';

import car from '../../assets/car.json'

export function LoadCar() {
  return (
    <Container>
      <LottieView
        source={car}
        autoPlay
        style={{
          width: 200,
          height: 200
        }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}