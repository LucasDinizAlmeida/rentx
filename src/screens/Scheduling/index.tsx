import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg'
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Content
} from './styles';
import { StatusBar, Alert } from 'react-native';
import { Button } from '../../components/Button';

import { Calendar, DateData, MarkedDates } from '../../components/Calendar';
import { createInterval } from '../../components/Calendar/createInterval';
import { format } from 'date-fns';
import { ajustDate } from '../../utils/ajustDate';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalIntervalProps {
  startFormatted: string;
  endFormatted: string;
  dates: string[];
}

export interface Params {
  car: CarDTO
}

export function Scheduling() {

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData)
  const [markedDates, setMarkedDates] = useState<MarkedDates>({} as MarkedDates)
  const [rentalInterval, setRentalInterval] = useState<RentalIntervalProps>({} as RentalIntervalProps)

  const route = useRoute()
  const { car } = route.params as Params

  const theme = useTheme()
  const navigation = useNavigation()

  function handleOpenSchedulingDetails() {

    navigation.navigate('SchedulingDetails', {
      car,
      startFormatted: rentalInterval.startFormatted,
      endFormatted: rentalInterval.endFormatted,
      dates: rentalInterval.dates
    })


  }


  function handleGoback() {
    navigation.goBack()
  }

  function handleChangeData(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      const newStart = end
      const newEnd = start

      start = newStart
      end = newEnd
    }

    setLastSelectedDate(date)
    const interval = createInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.values(interval)[0]
    const lastDate = Object.values(interval)[Object.values(interval).length - 1]

    const startFormatted = format(ajustDate(new Date(firstDate.timestamp)), 'dd/MM/yyyy')
    const endFormatted = format(ajustDate(new Date(lastDate.timestamp)), 'dd/MM/yyyy')

    setRentalInterval({
      startFormatted,
      endFormatted,
      dates: Object.keys(interval)
    })
  }



  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleGoback} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalInterval.startFormatted}>
              {rentalInterval.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalInterval.startFormatted}>
              {rentalInterval.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeData}
        />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          enabled={!!rentalInterval.startFormatted}
          onPress={handleOpenSchedulingDetails}
        />
      </Footer>

    </Container>
  );
}