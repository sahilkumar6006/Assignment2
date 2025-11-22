import { View, Pressable, Image } from 'react-native'
import React from 'react'
import styles from './style';
import RNTextComponent from '../RNTEXTComponent';
import { STR } from '../../constants/strings';
import { Product } from '../../store/slices/cartSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ProductCard = ({ product, isAdded }: { product: Product; isAdded: boolean }) => {
  const dispatch = useAppDispatch();
  return (
   <View style={styles.card}>
           {product.image ? (
             <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
           ) : null}
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
  )
}

export default ProductCard