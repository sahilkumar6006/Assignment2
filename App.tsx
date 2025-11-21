import React from 'react'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store'
import { RootStack } from './src/routes/RootNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'

enableScreens()

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
      <PersistGate persistor={persistor}>
      <RootStack/>
      </PersistGate>
      </SafeAreaView>
    </Provider>
  )
}

export default App