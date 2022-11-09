import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container } from './styles';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

export function MyCarsButton({ ...rest }: RectButtonProps) {

  const theme = useTheme()

  return (
    <Container
      {...rest}
    >
      <Ionicons
        size={32}
        name='ios-car-sport'
        color={theme.colors.shape}
      />
    </Container>
  );
}