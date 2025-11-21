import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart } from '../store/slices/cartSlice';
import RNTextComponent from '../components/RNTEXTComponent';
import HeaderComp from '../components/HeaderComp';
import { STR } from '../constants/strings';
import { NavigationProps, Routes } from '../routes/types';

export default function CartScreen({ navigation }: NavigationProps<Routes.CartScreen>) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  return (
    <View style={styles.container}>
      <HeaderComp
        titleKey={STR.CART}
        leftContent={<RNTextComponent style={styles.icon}>←</RNTextComponent>}
        onPressLeft={() => navigation.goBack()}
      />

      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <RNTextComponent style={{ color: '#666' }} textKey={STR.EMPTY_CART} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 12 }}
          data={items}
          keyExtractor={(it) => it.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <RNTextComponent isSemiBold style={styles.title}>{item.title}</RNTextComponent>
                <RNTextComponent style={styles.price} textKey={STR.PRICE} values={{ price: `$${item.price.toFixed(2)}` }} />
              </View>
              <Pressable onPress={() => dispatch(removeFromCart(item.id))} style={styles.deleteBtn}>
                <RNTextComponent style={{ fontSize: 18 }}>🗑️</RNTextComponent>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  iconWrap: { padding: 6 },
  icon: { fontSize: 20 },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  row: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { color: '#333' },
  deleteBtn: { padding: 8 },
});
