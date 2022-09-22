import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Fonts & SplashScreen
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Components
import { Formulario } from './src/components/Formulario';

// Colors
import colores from './src/styles/colores';
import { Resultado } from './src/components/Resultado';

export default function App() {
    const [datosPrestamo, setDatosPrestamo] = useState({});

    const [fontsLoaded] = useFonts({
        bellota: require('./assets/fonts/Bellota-Regular.ttf'),
        regular: require('./assets/fonts/Quicksand-Regular.ttf'),
        medium: require('./assets/fonts/Quicksand-Medium.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container} onLayout={onLayout}>
            <View style={styles.headerBack}>
                <View style={styles.header}>
                    <Text style={styles.title}>FS</Text>
                    <Text style={styles.subtitle}>Finanzas</Text>
                </View>
            </View>

            <View style={styles.form}>
                {Object.keys(datosPrestamo).length > 0 ? (
                    <Resultado datosPrestamo={datosPrestamo} setDatosPrestamo={setDatosPrestamo} />
                ) : (
                    <Formulario setDatosPrestamo={setDatosPrestamo} />
                )}
            </View>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colores.primary,
        flex: 1,
    },
    headerBack: {
        backgroundColor: colores.light,
        height: 200,
    },
    header: {
        alignItems: 'center',
        backgroundColor: colores.primary,
        borderBottomLeftRadius: 70,
        height: 200,
        justifyContent: 'center',
    },
    title: {
        color: colores.white,
        fontSize: 64,
        fontFamily: 'bellota',
    },
    subtitle: {
        color: colores.gray,
        fontSize: 24,
        marginTop: -5,
        fontFamily: 'regular',
    },
    form: {
        backgroundColor: colores.light,
        height: 513,
        marginRight: 20,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
    },
});
