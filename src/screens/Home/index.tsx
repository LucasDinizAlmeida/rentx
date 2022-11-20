import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
const ButtonAnimation = Animated.createAnimatedComponent(RectButton)
import theme from '../../styles/theme'

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO';

import { StatusBar, StyleSheet, BackHandler } from 'react-native'
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
import { MyCarsButton } from '../../components/MyCarsButton';
import { LoadCar } from '../../components/LoadCar';
import { useAuthContext } from '../../hooks/AuthContext';

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

  const { user, signOut } = useAuthContext()
  console.log(user)

  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {

    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    }
  })

  const [cars, setCars] = useState<CarDTO[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const navigation = useNavigation()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
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

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
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
          {
            !isLoaded &&
            <TotalCars>
              Total {cars.length} carros
            </TotalCars>
          }

        </HeaderContainer>

      </Header>

      {
        isLoaded ?
          <LoadCar />
          :
          <CardList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimation
            style={styles.button}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              size={32}
              name='ios-car-sport'
              color={theme.colors.shape}
            />
          </ButtonAnimation>
        </Animated.View>
      </PanGestureHandler>

    </Container>
  );
}


const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.main
  }
})