export const STR = {
  HOME: 'HOME',
  SETTINGS: 'SETTINGS',
  LANGUAGE: 'LANGUAGE',
  ENGLISH: 'ENGLISH',
  ARABIC: 'ARABIC',
  ADD_TO_CART: 'ADD_TO_CART',
  ADDED: 'ADDED',
  CLOSE: 'CLOSE',
  PRICE: 'PRICE',
  CART: 'CART',
  EMPTY_CART: 'EMPTY_CART',
} as const;

export type StrKey = typeof STR[keyof typeof STR];
