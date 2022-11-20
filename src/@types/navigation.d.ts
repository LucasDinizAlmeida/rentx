import { CarDTO } from "../dtos/CarDTO";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined,
      Splash: undefined,
      CarDetails: {
        car: CarDTO
      },
      Scheduling: {
        car: CarDTO
      },
      SchedulingDetails: {
        car: CarDTO;
        startFormatted: string;
        endFormatted: string;
        dates: string[];
      },
      SchedulingComplete: undefined,
      MyCars: undefined,
    }
  }
}