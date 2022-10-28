import React from 'react';
import { SvgProps } from 'react-native-svg';
import {
  Container,
  IconContainer,
  Title,
} from './styles';

interface Props {
  icon: React.FC<SvgProps>,
  title: string
}

export function Acessory({ icon: Icon, title }: Props) {
  return (
    <Container>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Title>{title}</Title>
    </Container>
  );
}