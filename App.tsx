import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import CartScreen from './src/screens/CartScreen'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store'

type RootStackParamList = {
  Home: undefined
  Cart: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

enableScreens()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
       <HomeScreen navigateToCart={() => {}}/>
      </PersistGate>
    </Provider>
  )
}

export default App