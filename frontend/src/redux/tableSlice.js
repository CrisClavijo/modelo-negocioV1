import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    valoresDefecto : null,
    pasajeros: null,
    pasajerosValorComercial: null
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        obtenerValoresDefecto : (state, action) =>{
            state.valoresDefecto = action.payload
        },
        guardarPasajerosComerciales: (state, action) => {
            state.pasajeros = action.payload[1]
            state.pasajerosValorComercial = action.payload[0]
        }
    }
})

export const {
    obtenerValoresDefecto,
    guardarPasajerosComerciales
} = tableSlice.actions;
export default tableSlice.reducer