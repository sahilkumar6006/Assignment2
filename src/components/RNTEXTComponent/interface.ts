import {
  StyleProp,
  TextStyle,
  GestureResponderEvent,
  TextProps,
} from 'react-native';

export interface Props extends TextProps {
  children?: React.ReactNode;
  textKey?: string;
  values?: Record<string, string | number>;
  isDynamic?: boolean;
  isBold?: boolean;
  caps?: boolean;
  isSemiBold?: boolean;
  isMedium?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  handleOnPress?: ((event: GestureResponderEvent) => void) | undefined;
}