import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 115px;
  height: 92px;
  align-items: center;
  justify-content: center;
  padding: 18px;
  /* padding: 18px 25px; */

  margin-top: 10px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;


export const IconContainer = styled.View``

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text_detail};;
  font-size: ${RFValue(13)}px;

  margin-top: 14px;
`
