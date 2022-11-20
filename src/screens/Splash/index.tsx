import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import {
  Container
} from './styles';
import Logo from '../../assets/logo.svg'
import Brand from '../../assets/brand.svg'
import { useNavigation } from '@react-navigation/native';


export function Splash() {

  const navigation = useNavigation()

  const splashAnimation = useSharedValue(0)

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 50],
        [1, 0]
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }

  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 50],
        [0, 1]
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  function handleOpenHome() {
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      { duration: 3000 },
      () => {
        'worklet'
        runOnJS(handleOpenHome)()
      }
    )
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <Brand width={90} height={60} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <Logo width={180} height={20} />
      </Animated.View>
    </Container>
  )

}
