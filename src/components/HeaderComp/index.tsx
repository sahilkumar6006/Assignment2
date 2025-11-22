import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import RNTextComponent from '../RNTEXTComponent';
import { StrKey } from '../../constants/strings';

export type HeaderCompProps = {
  titleKey: StrKey;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  containerStyle?: ViewStyle;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  leftTestID?: string;
  rightTestID?: string;
};

const HeaderComp: React.FC<HeaderCompProps> = ({
  titleKey,
  leftContent,
  rightContent,
  containerStyle,
  onPressLeft,
  onPressRight,
  leftTestID,
  rightTestID,
}) => {
  return (
    <View style={[styles.header, containerStyle]}>
      {onPressLeft ? (
        <Pressable style={styles.side} onPress={onPressLeft} testID={leftTestID} accessibilityLabel={leftTestID}>
          {leftContent}
        </Pressable>
      ) : (
        <View style={styles.side}>{leftContent}</View>
      )}
      <RNTextComponent isSemiBold style={styles.title} textKey={titleKey} />
      {onPressRight ? (
        <Pressable style={[styles.side, { justifyContent: 'flex-end' }]} onPress={onPressRight} testID={rightTestID} accessibilityLabel={rightTestID}>
          {rightContent}
        </Pressable>
      ) : (
        <View style={[styles.side, { justifyContent: 'flex-end' }]}>{rightContent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  side: { minWidth: 40, flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 18 },
});

export default HeaderComp;
