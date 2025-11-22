/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Props} from './interface';
import {scale, verticalScale} from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import '../../lang/i18n';

const RNTextComponent: React.FC<Props> = ({
  children,
  style,
  isBold,
  isMedium,
  isSemiBold,
  numberOfLines,
  handleOnPress,
  caps,
  textKey,
  values,
  isDynamic,
  ...rest
}) => {
  const { t } = useTranslation();
  const content = !isDynamic && textKey ? t(textKey, values) : children;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        isMedium && {
          fontSize: verticalScale(14),
          fontFamily: 'Poppins-Medium',
        },
        isSemiBold && {
          fontSize: verticalScale(14),
          fontFamily: 'Poppins-SemiBold',
        },
        isBold && {fontSize: verticalScale(14), fontFamily: 'Poppins-Bold'},
        style && style,
        caps && {
          textTransform: 'capitalize',
        },
      ]}
      onPress={handleOnPress}
      accessibilityRole="text"
      {...rest}
    >
      {content}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: scale(14),
    flexShrink: 1,
  },
});

export default RNTextComponent;