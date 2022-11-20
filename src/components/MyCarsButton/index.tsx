import React from 'react';
import { RectButtonProps, RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const ButtonAnimation = Animated.createAnimatedComponent(RectButton)

import { Container } from './styles';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export function MyCarsButton({ ...rest }: RectButtonProps) {

  const theme = useTheme()

  return (
    <ButtonAnimation
      style={styles.button}
      {...rest}
    >
      <Ionicons
        size={32}
        name='ios-car-sport'
        color={theme.colors.shape}
      />
    </ButtonAnimation>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.main
  }
})