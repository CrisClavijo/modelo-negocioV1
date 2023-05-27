import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lstInfraestructura: null,
    lstInfoVuelos: null,
    lstAtencionPersonalizada: null,
    lstlocalesComerciales: null,
    lstAerolinea: null,
    lstIngresos: null,
    lstEgresos: null,
    lstEncuestaCalidad: null,
}

export const listaSlice = createSlice({
    name: 'listas',
    initialState,
    reducers: {
        lstInfraestructuraReducer: (state, action) => {
            state.lstInfraestructura = action.payload
        },
        lstInfoVuelosReducer: (state, action) => {
            state.lstInfoVuelos = action.payload
        },
        lstAtencionPersonalizadaReducer: (state, action) => {
            state.lstAtencionPersonalizada = action.payload
        },
        lstLocalesComercialesReducer: (state, action) => {
            state.lstlocalesComerciales = action.payload
        },
        lstAerolineasReducer: (state, action) => {
            state.lstAerolinea = action.payload
        },
        lstIngresosReducer: (state, action) => {
            state.lstIngresos = action.payload
        },
        lstEgresosReducer: (state, action) => {
            state.lstEgresos = action.payload
        },
        lstEncuestaCalidadReducer: (state, action) => {
            state.lstEncuestaCalidad = action.payload
        }
    }
})

export const {
    lstInfraestructuraReducer,
    lstInfoVuelosReducer,
    lstAtencionPersonalizadaReducer,
    lstLocalesComercialesReducer,
    lstAerolineasReducer,
    lstIngresosReducer,
    lstEgresosReducer,
    lstEncuestaCalidadReducer,
} = listaSlice.actions;
export default listaSlice.reducer