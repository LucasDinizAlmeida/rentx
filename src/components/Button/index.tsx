import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({ title, color, loading = false, enabled = true, ...rest }: Props) {
  return (
    <Container
      color={color}
      enabled={enabled}
      style={{ opacity: (enabled && !loading) ? 1 : .5 }}
      {...rest}
    >
      {
        loading ?
          <ActivityIndicator />
          :
          <Title>{title}</Title>
      }
    </Container>
  );
}