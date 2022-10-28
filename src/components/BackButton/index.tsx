import React from 'react';
import { useTheme } from 'styled-components'
import { Container } from './styles';

import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'

interface Props extends BorderlessButtonProps {
  color?: string
}

export function BackButton({ color, ...rest }: Props) {

  const theme = useTheme()

  return (
    <Container
      {...rest}
    >
      <MaterialIcons
        size={35}
        name="chevron-left"
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}