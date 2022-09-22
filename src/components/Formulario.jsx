import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Picker
import { Picker } from '@react-native-picker/picker';

// Colors
import colores from '../styles/colores';
import { validarNumero } from './../helpers/index';

export const Formulario = ({ setDatosPrestamo }) => {
    const [cantidad, setCantidad] = useState(0);
    const [interes, setInteres] = useState(0);
    const [plazos, setPlazos] = useState(0);

    const handleCalcular = () => {
        if (validarNumero(cantidad) && validarNumero(interes) && validarNumero(plazos)) {
            const prestamo = {
                cantidad,
                interes,
                plazos,
            };

            setDatosPrestamo(prestamo);
        } else {
            Alert.alert('Error', 'Ingrese solo números positivos');
        }
    };

    return (
        <View style={styles.formulario}>
            <View style={styles.field}>
                <Text style={styles.label}>Cantidad del préstamo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese la cantidad"
                    placeholderTextColor={colores.gray}
                    keyboardType="numeric"
                    value={cantidad}
                    onChangeText={setCantidad}
                />
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Intereses</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el interés"
                    placeholderTextColor={colores.gray}
                    keyboardType="numeric"
                    value={interes}
                    onChangeText={setInteres}
                />
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Plazos</Text>
                <Picker
                    style={styles.input}
                    dropdownIconColor={colores.primary}
                    selectedValue={plazos}
                    onValueChange={value => {
                        setPlazos(value);
                    }}
                >
                    <Picker.Item
                        label=" -- Seleccione --"
                        value={0}
                        color={colores.primary}
                        fontFamily="regular"
                    />
                    <Picker.Item label="3 Meses" value={3} color={colores.primary} />
                    <Picker.Item label="6 Meses" value={6} color={colores.primary} />
                    <Picker.Item label="9 Meses" value={9} color={colores.primary} />
                    <Picker.Item label="12 Meses" value={12} color={colores.primary} />
                </Picker>
            </View>

            <TouchableOpacity style={styles.buttonCalc} onPress={handleCalcular}>
                <Text style={styles.buttonCalcText}>Calcular</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formulario: {
        marginTop: 50,
        marginRight: 20,
        marginLeft: 30,
    },
    field: {
        marginBottom: 30,
    },
    label: {
        fontFamily: 'medium',
        color: colores.primary,
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        backgroundColor: colores.white,
        padding: 10,
        fontSize: 16,
        fontFamily: 'regular',
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
