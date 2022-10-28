import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlide } from '../../components/ImageSlide';
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  RentalPeridod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceDetails,
  PriceLabel,
  PriceInstallments,
  TotalPrice,
  Footer
} from './styles';

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import exchange from '../../assets/exchange.svg'
import speed from '../../assets/speed.svg'
import gasoline from '../../assets/gasoline.svg'
import force from '../../assets/force.svg'
import acceleration from '../../assets/acceleration.svg'
import people from '../../assets/people.svg'
import { Button } from '../../components/Button';




export function SchedulingDetails() {

  const theme = useTheme()

  const navigation = useNavigation()

  function handleOpenSchedulingComplete() {
    navigation.navigate('SchedulingComplete')
  }

  function handleGoback() {
    navigation.goBack()
  }

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleGoback} />
      </Header>

      <CarImages>
        <ImageSlide
          imageUrl={['https://img1.gratispng.com/20180926/iqw/kisspng-2-18-audi-rs-5-car-audi-s5-audi-a5-audi-leasen-total-car-lease-5bac3bbe1e3f94.5714384315380141421239.jpg']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Acessory title='380km' icon={speed} />
          <Acessory title='380km' icon={acceleration} />
          <Acessory title='380km' icon={force} />
          <Acessory title='380km' icon={gasoline} />
          <Acessory title='380km' icon={exchange} />
          <Acessory title='380km' icon={people} />
        </Acessories>

        <RentalPeridod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>23/10/2022</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>28/10/2022</DateValue>
          </DateInfo>
        </RentalPeridod>

        <RentalPrice>
          <RentalPriceDetails>
            <PriceLabel>TOTAL</PriceLabel>
            <PriceInstallments>R$ 580 x 3 diárias</PriceInstallments>
          </RentalPriceDetails>

          <TotalPrice>R$ 1740,00</TotalPrice>
        </RentalPrice>

      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleOpenSchedulingComplete}
        />
      </Footer>
    </Container>
  );
}