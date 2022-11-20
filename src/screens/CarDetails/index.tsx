import React from 'react';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated,
{
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
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
  Abount,
  Acessories,
  Footer
} from './styles';

import { Button } from '../../components/Button';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
  car: CarDTO
}

export function CarDetails() {

  const theme = useTheme()

  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params

  const scrollY = useSharedValue(0)

  const handleScrollY = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.y)
    scrollY.value = event.contentOffset.y
  })

  const animatedStyle = useAnimatedStyle(() => {

    return {
      height: interpolate(scrollY.value,
        [0, 200],
        [200, 95],
        Extrapolate.CLAMP
      )
    }
  })

  const slideCarsStyleAnimation = useAnimatedStyle(() => {

    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })


  function handleOpenScheduling() {
    navigation.navigate('Scheduling', { car })
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

      <Animated.View
        style={[
          animatedStyle,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton onPress={handleGoback} />
        </Header>

        <Animated.View style={[slideCarsStyleAnimation]}>
          <CarImages>
            <ImageSlide
              imageUrl={car.photos}
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
          marginTop: 50,
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScrollY}
        scrollEventThrottle={16}
      >
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
              <Acessory
                key={item.type}
                title={item.name}
                icon={getAccessoryIcon(item.type)} />
            ))
          }

        </Acessories>

        <Abount>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </Abount>
      </Animated.ScrollView>

      <Footer>
        <Button title='Escolha o período do aluguel' onPress={handleOpenScheduling} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  back: {
    position: 'absolute',
    top: 10,
    zIndex: 0
  }
})