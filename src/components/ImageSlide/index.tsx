import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles';

interface Props {
  imageUrl: string[]
}

interface indexChangeProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlide({ imageUrl }: Props) {

  const [imageIndex, setImageIndex] = useState(0)

  const indexChange = useRef((info: indexChangeProps) => {
    setImageIndex(info.viewableItems[0].index)
  })

  return (
    <Container>
      <ImageIndexes>
        {
          imageUrl.map((_, index) => (
            <ImageIndex
              key={String(index)}
              active={index === imageIndex}
            />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imageUrl}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
      />


    </Container>
  );
}