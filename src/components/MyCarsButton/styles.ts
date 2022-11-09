import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px; 

  align-items: center; 
  justify-content: center;

  position: absolute;
  bottom: 22px; 
  right: 13px;

  background-color: ${({ theme }) => theme.colors.main};
`;