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
import { Calendar, DateData } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';

export function Scheduling() {

  const [lastSelectedDay, setLastSelectedDay] = useState<DateData>({} as DateData)

  const theme = useTheme()

  const navigation = useNavigation()

  function handleOpenSchedulingDetails() {
    navigation.navigate('SchedulingDetails')
  }

  function handleGoback() {
    navigation.goBack()
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDay.timestamp ? date : lastSelectedDay
    let end = date

    if (start.timestamp > end.timestamp) {
      const righStart = end
      const righEnd = start

      start = righStart
      end = righEnd
    }

    setLastSelectedDay(end)
    generateInterval(start, end)
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
          markedDates={{}}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleOpenSchedulingDetails} />
      </Footer>

    </Container>
  );
}