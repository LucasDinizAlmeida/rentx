import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${getStatusBarHeight() + 325}px;
  padding: 0 25px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.header};

  padding-top: ${getStatusBarHeight() + 30}px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(34)}px;

  color: ${({ theme }) => theme.colors.shape};

  margin-top: 41px;
`

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(34)}px;

  color: ${({ theme }) => theme.colors.shape};

  margin-top: 18px;
`

export const Content = styled.View`
  flex: 1;
  width: 100%;

  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Appointments = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 24px 0;
`

export const AppointmentsTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.text};
`

export const AppointmentsQuantity = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.text};
`

export const CarFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: -14px;
  margin-bottom: 16px;
  padding: 15px 24px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const CarFooterTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  line-height: ${RFValue(11)}px;

  color: ${({ theme }) => theme.colors.text_detail};

  text-transform: uppercase;
`

export const PeriodeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Periode = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
  line-height: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.text};

  text-transform: uppercase;
`

