import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import StackNavigator from "./navigation/StackNavigator";

import { persistor, store } from "./redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { commonActionTypes } from "./redux/actions/common";

export default function App() {
  useEffect(() => {
    store.dispatch({ type: commonActionTypes.HIEDE_LOADING });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <NativeBaseProvider>
            <StackNavigator />
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
