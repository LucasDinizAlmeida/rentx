import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarFooter,
  CarFooterTitle,
  PeriodeWrapper,
  Periode,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

interface fetchCarsProps {
  id: string;
  user_id: string;
  car: CarDTO,
}

export function MyCars() {
  const [fetchCars, setFetchCars] = useState<fetchCarsProps[]>([])
  const [isLoaded, setIsLoaded] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation()

  function handleGoback() {
    navigation.goBack()
  }


  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1')
        console.log(response.data)

        setFetchCars(response.data)

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoaded(false)
      }
    }

    fetchCars()
  }, [])

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
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>

      </Header>
      {
        isLoaded ?
          <Load />
          :
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{fetchCars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={fetchCars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Periodo</CarFooterTitle>
                    <PeriodeWrapper>
                      <Periode>15/08/2022</Periode>
                      <AntDesign
                        name='arrowright'
                        color={theme.colors.text}
                        style={{ marginHorizontal: 10 }}
                      />
                      <Periode>20/08/2022</Periode>
                    </PeriodeWrapper>
                  </CarFooter>
                </>
              )}
            />
          </Content>
      }
    </Container>
  );
}