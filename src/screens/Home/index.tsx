import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';

import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContainer,
  CardList
} from './styles';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

const carList = [
  {
    id: '1',
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnails: 'https://img1.gratispng.com/20180926/iqw/kisspng-2-18-audi-rs-5-car-audi-s5-audi-a5-audi-leasen-total-car-lease-5bac3bbe1e3f94.5714384315380141421239.jpg'
  },
  {
    id: '2',
    brand: 'porsche',
    name: 'panamera',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnails: 'https://w7.pngwing.com/pngs/898/377/png-transparent-2016-porsche-panamera-2015-porsche-panamera-2017-porsche-panamera-car-porsche-car-compact-car-sedan-car-thumbnail.png'
  }
]


export function Home() {

  const [cars, setCars] = useState<CarDTO[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const navigation = useNavigation()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    async function loadCars() {
      try {
        setIsLoaded(true)
        const response = await api.get('/cars')

        setCars(response.data as CarDTO[])

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoaded(false)
      }
    }

    loadCars()
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <HeaderContainer>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total 12 caros
          </TotalCars>
        </HeaderContainer>

      </Header>

      {
        isLoaded ?
          <Load />
          :
          <CardList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }
    </Container>
  );
}