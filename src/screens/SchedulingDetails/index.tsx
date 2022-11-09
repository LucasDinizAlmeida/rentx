import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';
import { ajustDate } from '../../utils/ajustDate';

import { MarkedDates } from '../../components/Calendar';
import { Alert, StatusBar } from 'react-native';
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

import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

interface Params {
  car: CarDTO;
  startFormatted: string;
  endFormatted: string;
  dates: string[];
}


interface PricesProps {
  factor: string;
  total: number;
}


export function SchedulingDetails() {

  const [prices, setPrices] = useState<PricesProps>({} as PricesProps)
  const [loading, setLoading] = useState(false)

  const route = useRoute()
  const { car, startFormatted, endFormatted, dates } = route.params as Params

  const theme = useTheme()
  const navigation = useNavigation()

  async function handleOpenSchedulingComplete() {

    try {
      setLoading(true)

      const { data } = await api.get(`/schedules_bycars/${car.id}`)
      const unavailable_dates = [
        ...data.unavailable_dates,
        ...dates
      ]


      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      await api.post('schedules_byuser', {
        user_id: '1',
        car
      })

      navigation.navigate('SchedulingComplete')

    } catch (error) {
      setLoading(false)
      console.log(error)
      Alert.alert('Erro ao realizar o agendamendo')
    }
  }

  function handleGoback() {
    navigation.goBack()
  }

  useEffect(() => {
    const factor = String(dates.length)
    const total = Number(car.rent.price) * dates.length

    setPrices({
      total,
      factor
    })
  }, [])

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
          imageUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {
            car.accessories.map(item => (
              <Acessory key={item.type} title={item.name} icon={getAccessoryIcon(item.type)} />
            ))
          }
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
            <DateValue>{startFormatted}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{endFormatted}</DateValue>
          </DateInfo>
        </RentalPeridod>

        <RentalPrice>
          <RentalPriceDetails>
            <PriceLabel>TOTAL</PriceLabel>
            <PriceInstallments>{`R$ ${car.rent.price}  x${prices.factor}`}</PriceInstallments>
          </RentalPriceDetails>

          <TotalPrice>{`R$ ${prices.total}`}</TotalPrice>
        </RentalPrice>

      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleOpenSchedulingComplete}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}