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
    lstAviacionComercial: null,
    lstAviacionGeneral: null,
    lstAviacionCarga: null,
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
        },
        lstAviacionComercialReducer: (state, action) => {
            state.lstAviacionComercial = action.payload
        },
        lstAviacionGeneralReducer: (state, action) => {
            state.lstAviacionGeneral = action.payload
        },
        lstAviacionCargaReducer: (state, action) => {
            state.lstAviacionCarga = action.payload
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
    lstAviacionComercialReducer,
    lstAviacionGeneralReducer,
    lstAviacionCargaReducer
} = listaSlice.actions;
export default listaSlice.reducer