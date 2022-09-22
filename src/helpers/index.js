/**
 * Devuelve true si el valor es mayor que cero, no es una cadena vacía y si es un número.
 */
export const validarNumero = valor => {
    return valor > 0 && valor !== '' && !isNaN(valor);
};

export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};
