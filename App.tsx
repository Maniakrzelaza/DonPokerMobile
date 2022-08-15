import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import {  useEffect } from "react";
import { init } from "./redux/firebase";
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    useEffect(() => {
        init();
    }, [])

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar style="light"/>
                    </PersistGate>
                </Provider>
            </SafeAreaProvider>
        );
    }
}
