import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// Helpers
import { formatearCantidad } from '../helpers';

// Colores
import colores from '../styles/colores';

export const Resultado = ({ datosPrestamo, setDatosPrestamo }) => {
    const { cantidad, interes, plazos } = datosPrestamo;
    const [total, setTotal] = useState({});

    useEffect(() => {
        const calculo = () => {
            const i = interes / 100;
            const fee = cantidad / ((1 - Math.pow(i + 1, -plazos)) / i);

            setTotal({
                mensualidad: fee.toFixed(2),
                totalPagar: (fee * plazos).toFixed(2),
            });
        };
        calculo();
    }, []);

    const handleNuevoCalculo = () => {
        setTotal({});
        setDatosPrestamo({});
    };

    return (
        <View style={styles.resumen}>
            <Text style={styles.titulo}>Resumen</Text>

            <View style={styles.resultado}>
                <View style={styles.campo}>
                    <Text style={styles.label}>Cantidad solicitada</Text>
                    <Text style={styles.valor}>${formatearCantidad(cantidad)}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Interes %</Text>
                    <Text style={styles.valor}>{interes}%</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Plazos</Text>
                    <Text style={styles.valor}>{plazos} meses</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Pago mensual</Text>
                    <Text style={styles.valor}>${total.mensualidad}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Total a pagar</Text>
                    <Text style={styles.valor}>${total.totalPagar}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.buttonCalc} onPress={handleNuevoCalculo}>
                <Text style={styles.buttonCalcText}>Nuevo calculo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    resumen: {
        marginTop: 70,
    },
    titulo: {
        fontSize: 24,
        fontFamily: 'medium',
        color: colores.primary,
        textAlign: 'center',
    },
    resultado: {
        backgroundColor: colores.white,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginRight: 10,
        marginTop: 20,
        padding: 20,
    },
    campo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 30,
        marginBottom: 30,
    },
    label: {
        color: colores.primary,
        fontSize: 16,
        fontFamily: 'regular',
    },
    valor: {
        color: colores.primary,
        fontFamily: 'medium',
        fontSize: 16,
    },
    buttonCalc: {
        alignSelf: 'center',
        backgroundColor: colores.primary,
        borderRadius: 4,
        marginTop: 50,
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    buttonCalcText: {
        color: colores.white,
        fontFamily: 'medium',
        fontSize: 16,
    },
});
