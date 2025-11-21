import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart, Product } from '../store/slices/cartSlice';
import { setLanguage } from '../store/slices/languageSlice';
import { PRODUCTS } from '../data/products';
import RNTextComponent from '../components/RNTEXTComponent';
import HeaderComp from '../components/HeaderComp';
import { STR } from '../constants/strings';
import { NavigationProps, Routes } from '../routes/types';

export default function HomeScreen({ navigation }: NavigationProps<Routes.HomeScreen>) {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.length);
  const lang = useAppSelector((s) => s.language.code as 'en' | 'ar');
  const items = useAppSelector((s) => s.cart.items);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [loops, setLoops] = useState(1);

  const displayData = useMemo(() => {
    const arr = [] as { productId: string; instanceKey: string }[];
    for (let p = 0; p < loops; p++) {
      for (const pr of PRODUCTS) {
        arr.push({ productId: pr.id, instanceKey: `${pr.id}-${p}` });
      }
    }
    return arr;
  }, [loops]);

  const cartIds = useMemo(() => new Set(items.map((i: Product) => i.id)), [items]);

  const renderItem = ({ item }: { item: { productId: string; instanceKey: string } }) => {
    const product = PRODUCTS.find((p) => p.id === item.productId)!;
    const isAdded = cartIds.has(product.id);
    return (
      <View style={styles.card}>
        <RNTextComponent isSemiBold style={styles.title}>{product.title}</RNTextComponent>
        <RNTextComponent style={styles.price} textKey={STR.PRICE} values={{ price: `$${product.price.toFixed(2)}` }} />
        <Pressable
          testID={`product_add_button_${product.id}`}
          accessibilityLabel="product_add_button"
          disabled={isAdded}
          onPress={() => dispatch(addToCart(product))}
          style={[styles.button, isAdded && styles.buttonDisabled]}
        >
          <RNTextComponent style={styles.buttonText} textKey={isAdded ? STR.ADDED : STR.ADD_TO_CART} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        titleKey={STR.HOME}
        rightContent={
          <View style={styles.headerRight}>
            <Pressable testID="cart_icon" accessibilityLabel="cart_icon" onPress={() => navigation.navigate(Routes.CartScreen)} style={styles.iconWrap}>
              <RNTextComponent style={styles.icon}>🛒</RNTextComponent>
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <RNTextComponent style={styles.badgeText}>{String(cartCount)}</RNTextComponent>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => setSettingsVisible(true)} style={styles.iconWrap}>
              <RNTextComponent style={styles.icon}>⚙️</RNTextComponent>
            </Pressable>
          </View>
        }
      />

      <FlatList
        contentContainerStyle={{ padding: 12 }}
        numColumns={2}
        data={displayData}
        keyExtractor={(it) => it.instanceKey}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        onEndReached={() => setLoops((l) => l + 1)}
        onEndReachedThreshold={0.4}
      />

      <Modal visible={settingsVisible} transparent animationType="fade" onRequestClose={() => setSettingsVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <RNTextComponent isSemiBold style={styles.modalTitle} textKey="LANGUAGE" />
            <Pressable style={styles.modalBtn} onPress={() => { dispatch(setLanguage('en')); setSettingsVisible(false); }}>
              <RNTextComponent style={styles.modalBtnText} textKey={STR.ENGLISH} />
            </Pressable>
            <Pressable style={styles.modalBtn} onPress={() => { dispatch(setLanguage('ar')); setSettingsVisible(false); }}>
              <RNTextComponent style={styles.modalBtnText} textKey={STR.ARABIC} />
            </Pressable>
            <Pressable style={[styles.modalBtn, { backgroundColor: '#eee' }]} onPress={() => setSettingsVisible(false)}>
              <RNTextComponent style={[styles.modalBtnText, { color: '#333' }]} textKey={STR.CLOSE} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconWrap: { padding: 6 },
  icon: { fontSize: 20 },
  badge: { position: 'absolute', right: 0, top: -2, backgroundColor: '#d00', borderRadius: 8, paddingHorizontal: 4, minWidth: 16, alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 12 },

  card: { flex: 1, backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  price: { marginBottom: 8, color: '#333' },
  button: { backgroundColor: '#111', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#888' },
  buttonText: { color: '#fff', fontWeight: '600' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  modalCard: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 16 },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  modalBtn: { backgroundColor: '#111', padding: 10, borderRadius: 6, marginVertical: 6 },
  modalBtnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
