
import AccelerationSvg from './../assets/acceleration.svg'
import ExchangeSvg from './../assets/exchange.svg'
import SpeedSvg from './../assets/speed.svg'
import GasolineSvg from './../assets/gasoline.svg'
import EnergySvg from './../assets/energy.svg'
import HybridSvg from './../assets/hybrid.svg'
import ForceSvg from './../assets/force.svg'
import PeopleSvg from './../assets/people.svg'
import CarSvg from './../assets/car.svg'

export function getAccessoryIcon(name: string) {
  switch (name) {
    case 'speed':
      return SpeedSvg
    case 'acceleration':
      return AccelerationSvg
    case 'turning_diameter':
      return ForceSvg
    case 'gasoline_motor':
      return GasolineSvg
    case 'electric_motor':
      return EnergySvg
    case 'electric':
      return EnergySvg
    case 'hybrid_motor':
      return HybridSvg
    case 'exchange':
      return ExchangeSvg
    case 'seats':
      return PeopleSvg
    default:
      return CarSvg
  }
}