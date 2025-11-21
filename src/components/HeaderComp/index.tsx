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
};

const HeaderComp: React.FC<HeaderCompProps> = ({
  titleKey,
  leftContent,
  rightContent,
  containerStyle,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View style={[styles.header, containerStyle]}>
      <Pressable style={styles.side} onPress={onPressLeft} disabled={!onPressLeft}>
        {leftContent}
      </Pressable>
      <RNTextComponent isSemiBold style={styles.title} textKey={titleKey} />
      <Pressable style={[styles.side, { justifyContent: 'flex-end' }]} onPress={onPressRight} disabled={!onPressRight}>
        {rightContent}
      </Pressable>
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
