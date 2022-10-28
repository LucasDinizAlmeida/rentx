import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ContainerProps {
  color?: string
}

export const Container = styled(RectButton) <ContainerProps>`
  width: 100%;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) => color ? color : theme.colors.main};
  
  padding: 19px 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.line};;
  font-size: ${RFValue(15)}px;
`