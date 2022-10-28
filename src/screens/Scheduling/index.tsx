import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';

import { Calendar, DateData, MarkedDates } from '../../components/Calendar';
import { createInterval } from '../../components/Calendar/createInterval';

export function Scheduling() {

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData)
  const [markedDates, setMarkedDates] = useState<MarkedDates>({} as MarkedDates)

  const theme = useTheme()
  const navigation = useNavigation()

  function handleOpenSchedulingDetails() {
    navigation.navigate('SchedulingDetails')
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
            <DateValue selected={false}>
              19/10/2022
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>
              19/10/2022
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
        <Button title='Confirmar' onPress={handleOpenSchedulingDetails} />
      </Footer>

    </Container>
  );
}