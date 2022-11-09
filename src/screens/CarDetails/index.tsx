import React from 'react';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { useNavigation, useRoute } from '@react-navigation/native';
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
  Abount,
  Acessories,
  Footer
} from './styles';

import { Button } from '../../components/Button';

interface Params {
  car: CarDTO
}

export function CarDetails() {

  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params


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
              <Acessory
                key={item.type}
                title={item.name}
                icon={getAccessoryIcon(item.type)} />
            ))
          }

        </Acessories>

        <Abount>{car.about}</Abount>
      </Content>

      <Footer>
        <Button title='Escolha o período do aluguel' onPress={handleOpenScheduling} />
      </Footer>
    </Container>
  );
}