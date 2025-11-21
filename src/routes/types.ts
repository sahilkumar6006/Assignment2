import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from './constants';

export type IStackParamsList = {
    [Routes.HomeScreen]: undefined;
    [Routes.CartScreen]: undefined;
};

export type NavigationProps<RouteName extends keyof IStackParamsList> =
    NativeStackScreenProps<IStackParamsList, RouteName>;

export { Routes };