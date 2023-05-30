import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    valoresDefecto : null,
    pasajeros: null,
    pasajerosValorComercial: null,
    aviacionMeses: null,
    aviacionValores: null,
    cargaMeses: null,
    cargaValores: null,
    encuestaSatisfaccion: null,
    infraestructura: null,
    infoVuelos: null,
    atencionPersonalizada: null,
    ingresos: null,
    egresos: null,
    tablaLocales: null,
    aerolineas: null,
    fechasCargaOcupacion: null,
    fechasPasajerosOcupacion: null,
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
        },
        getAviacionGeneral: (state, action) => {
            state.aviacionMeses = action.payload[1]
            state.aviacionValores = action.payload[0]
        },
        getCarga: (state, action) => {
            state.cargaMeses = action.payload[1]
            state.cargaValores = action.payload[0]
        },
        getSatisfaccion: (state, action) => {
            state.encuestaSatisfaccion = action.payload
        },
        getInfraestructura: (state, action) => {
            state.infraestructura = action.payload
        },
        getInfoVuelos: (state, action) => {
            state.infoVuelos = action.payload
        },
        getAtencionPersonalizada: (state, action) => {
            state.atencionPersonalizada = action.payload
        },
        getIngresosReducer: (state, action) => {
            state.ingresos = action.payload
        },
        getEgresosReducer: (state, action) => {
            state.egresos = action.payload
        },
        getTablaLocalesReducer: (state, action) => {
            state.tablaLocales = action.payload
        },
        getTablaAerolineasReducer: (state, action) => {
            state.aerolineas = action.payload
        },
        getFechasOcupCargaReducer: (state, action) => {
            state.fechasCargaOcupacion = action.payload
        },
        getFechasOcupPasajerosReducer: (state, action) => {
            state.fechasPasajerosOcupacion = action.payload
        },
    }
})

export const {
    obtenerValoresDefecto,
    guardarPasajerosComerciales,
    getAviacionGeneral,
    getCarga,
    getSatisfaccion,
    getInfraestructura,
    getInfoVuelos,
    getAtencionPersonalizada,
    getIngresosReducer,
    getEgresosReducer,
    getTablaLocalesReducer,
    getTablaAerolineasReducer,
    getFechasOcupCargaReducer,
    getFechasOcupPasajerosReducer
} = tableSlice.actions;
export default tableSlice.reducer