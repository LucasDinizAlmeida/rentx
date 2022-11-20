import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.header};
  align-items: center;
  justify-content: flex-end;
`

export const TitleWrapper = styled.View`
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: 45px;
`

export const SignInTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: 80px;
  margin-bottom: 67px;
`

export const Footer = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.colors.main};
`

export const FooterWrapper = styled.View`

  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;

`
