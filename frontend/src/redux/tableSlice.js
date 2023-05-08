import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pasajeros: null,
    pasajerosValorComercial: null
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        guardarPasajerosComerciales: (state, action) => {
            state.pasajeros = action.payload[1]
            state.pasajerosValorComercial = action.payload[0]
        }
    }
})

export const {guardarPasajerosComerciales} = tableSlice.actions;
export default tableSlice.reducer