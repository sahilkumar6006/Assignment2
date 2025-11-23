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
import ProductCard from '../components/ProductCard';
import { changeLanguage } from '../lang/i18n';
import useIsRTL from '../hooks/useIsRTL';

export default function HomeScreen({ navigation }: NavigationProps<Routes.HomeScreen>) {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.length);
  const lang = useAppSelector((s) => s.language.code as 'en' | 'ar');
  const items = useAppSelector((s) => s.cart.items);
  const isRTL = useIsRTL();

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

  const renderItem = ({ item, index }: { item: { productId: string; instanceKey: string }, index: number }) => {
    console.log('Rendering item:', item.instanceKey);
    const product = PRODUCTS.find((p) => p.id === item.productId)!;
    const isAdded = cartIds.has(product.id);

    let customTestId = 'product_add_button';
    if (index === 3) {
      customTestId = 'product_4_add_button';
    }

    return (
      <ProductCard product={product} isAdded={isAdded} customTestId={customTestId} />
    );
  };

  const rtlStyles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerRight: { 
      flexDirection: isRTL ? 'row-reverse' : 'row', 
      alignItems: 'center', 
      gap: 8 
    },
    iconWrap: { padding: 6 },
    icon: { fontSize: 20 },
    badge: { 
      position: 'absolute', 
      ...(isRTL ? { left: 0 } : { right: 0 }),
      top: -2, 
      backgroundColor: '#d00', 
      borderRadius: 8, 
      paddingHorizontal: 4, 
      minWidth: 16, 
      alignItems: 'center' 
    },
    badgeText: { color: '#fff', fontSize: 12 },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
    modalCard: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 16 },
    modalTitle: { 
      fontSize: 16, 
      fontWeight: '700', 
      marginBottom: 12,
      textAlign: isRTL ? 'right' : 'left',
    },
    modalBtn: { 
      backgroundColor: '#111', 
      padding: 10, 
      borderRadius: 6, 
      marginVertical: 6,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalBtnSelected: {
      backgroundColor: '#007AFF',
    },
    modalBtnText: { 
      color: '#fff', 
      textAlign: 'center', 
      fontWeight: '600', 
      flex: 1 
    },
    modalBtnTextSelected: { color: '#fff' },
    checkmark: { 
      color: '#fff', 
      fontSize: 16, 
      fontWeight: 'bold',
      marginLeft: isRTL ? 0 : 8,
      marginRight: isRTL ? 8 : 0,
    },
  }), [isRTL]);

  return (
    <View style={styles.container}>
      <HeaderComp
        titleKey={STR.HOME}
        rightContent={
          <View style={rtlStyles.headerRight}>
            <Pressable testID="cart_icon" accessibilityLabel="cart_icon" onPress={() => navigation.navigate(Routes.CartScreen)} style={rtlStyles.iconWrap}>
              <RNTextComponent style={rtlStyles.icon}>🛒</RNTextComponent>
              {cartCount > 0 && (
                <View style={rtlStyles.badge}>
                  <RNTextComponent style={rtlStyles.badgeText}>{String(cartCount)}</RNTextComponent>
                </View>
              )}
            </Pressable>
            <Pressable onPress={() => setSettingsVisible(true)} style={rtlStyles.iconWrap}>
              <RNTextComponent style={rtlStyles.icon}>⚙️</RNTextComponent>
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
        <View style={rtlStyles.modalBackdrop}>
          <View style={rtlStyles.modalCard}>
            <RNTextComponent isSemiBold style={rtlStyles.modalTitle} textKey="LANGUAGE" />
            <Pressable 
              style={[
                rtlStyles.modalBtn, 
                lang === 'en' && rtlStyles.modalBtnSelected
              ]} 
              onPress={() => { 
                dispatch(setLanguage('en')); 
                changeLanguage('en'); 
                setSettingsVisible(false); 
              }}
            >
              <RNTextComponent 
                style={[
                  rtlStyles.modalBtnText,
                  lang === 'en' && rtlStyles.modalBtnTextSelected
                ]} 
                textKey={STR.ENGLISH} 
              />
              {lang === 'en' && (
                <RNTextComponent style={rtlStyles.checkmark}>✓</RNTextComponent>
              )}
            </Pressable>
            <Pressable 
              style={[
                rtlStyles.modalBtn, 
                lang === 'ar' && rtlStyles.modalBtnSelected
              ]} 
              onPress={() => { 
                dispatch(setLanguage('ar')); 
                changeLanguage('ar'); 
                setSettingsVisible(false); 
              }}
            >
              <RNTextComponent 
                style={[
                  rtlStyles.modalBtnText,
                  lang === 'ar' && rtlStyles.modalBtnTextSelected
                ]} 
                textKey={STR.ARABIC} 
              />
              {lang === 'ar' && (
                <RNTextComponent style={rtlStyles.checkmark}>✓</RNTextComponent>
              )}
            </Pressable>
            <Pressable style={[rtlStyles.modalBtn, { backgroundColor: '#eee' }]} onPress={() => setSettingsVisible(false)}>
              <RNTextComponent style={[rtlStyles.modalBtnText, { color: '#333' }]} textKey={STR.CLOSE} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
