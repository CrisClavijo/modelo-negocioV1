import { useDispatch, useSelector } from "react-redux";
import {
    guardarPasajerosComerciales,
    obtenerValoresDefecto,
    getAviacionGeneral,
    getCarga,
    getSatisfaccion,
    getInfraestructura,
    getInfoVuelos,
    getAtencionPersonalizada,
    getIngresosReducer,
    getEgresosReducer,
    getTablaLocalesReducer
} from "../../redux/tableSlice";
import axiosClient from "../../componentes/axios-client";

export const useTablasGeneralStore = () => {
    const dispatch = useDispatch();
    const {
        valoresDefecto,
        pasajeros,
        pasajerosValorComercial,
        aviacionMeses,
        aviacionValores,
        cargaMeses,
        cargaValores,
        encuestaSatisfaccion,
        infraestructura,
        infoVuelos,
        atencionPersonalizada,
        tablaLocales
    } = useSelector((state) => state.table);

    const getValoresDefecto = async () => {
        const url = `valores-defecto`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                let response = data?.data;
                dispatch(obtenerValoresDefecto(response))
                getPasajerosComerciales(response[7].fechaInicial, response[7].fechaFinal);
                getAviacionPasajeros(response[8].fechaInicial, response[8].fechaFinal);
                getAviacionCarga(response[9].fechaInicial, response[9].fechaFinal);
                getResultadosEncuestaSatisfaccion(response[6].fechaInicial);
                getInfraestructuraValores(response[3].fechaInicial);
                getInformacionVuelos(response[4].fechaInicial);
                getAtencionPersonalizadaValores(response[5].fechaInicial);
                getEgresosValores(response[11].fechaInicial);
                getIngresosValores(response[10].fechaInicial);
                getLocalesComerciales(response[1].fechaInicial)
            }).catch((error) => {
                console.log(error)
            });
    }

    const updateValoresDefecto = async (body, id) => {
        const url = `/valores-defecto/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                console.log(data)
            }).catch((error) => {
                console.log(error)
            });
    }

    const getPasajerosComerciales = async (inicial, final) => {
        const url = `pasajeros-comerciales`;
        await axiosClient
            .get(url, { params: { fechaDesde: inicial, fechaHasta: final } })
            .then(({ data }) => {
                let newValorPasajerosComerciales = data?.data?.map((data, index) => {
                    let valorPasajeros = data.valor
                    return valorPasajeros
                })

                let newMesesPasajerosComerciales = data?.data?.map((data, index) => {
                    let valorPasajeros = data?.fechaFormart
                    return valorPasajeros
                })
                let datos = [newValorPasajerosComerciales, newMesesPasajerosComerciales]

                dispatch(guardarPasajerosComerciales(datos))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getAviacionPasajeros = async (inicial, final) => {
        const url = `aviacion-general`;
        await axiosClient
            .get(url, { params: { fechaDesde: inicial, fechaHasta: final } })
            .then(({ data }) => {
                let newValorPasajerosComerciales = data?.data?.map((data, index) => {
                    let valorPasajeros = data.valor
                    return valorPasajeros
                })

                let newMesesPasajerosComerciales = data?.data?.map((data, index) => {
                    let valorPasajeros = data?.formatoFecha
                    return valorPasajeros
                })
                let datos = [newValorPasajerosComerciales, newMesesPasajerosComerciales]

                dispatch(getAviacionGeneral(datos))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getAviacionCarga = async (inicial, final) => {
        const url = `aviacion-carga`;
        await axiosClient
            .get(url, { params: { fechaDesde: inicial, fechaHasta: final } })
            .then(({ data }) => {
                let newValorPasajerosComerciales = data?.data?.map((data, index) => {
                    let valorPasajeros = data.carga
                    return valorPasajeros
                })

                let newMesesPasajerosComerciales = data?.data?.map((data, index) => {
                    let valorPasajeros = data?.formatoFecha
                    return valorPasajeros
                })
                let datos = [newValorPasajerosComerciales, newMesesPasajerosComerciales]

                dispatch(getCarga(datos))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getResultadosEncuestaSatisfaccion = async (body) => {
        const url = `encuesta-satisfaccion`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getSatisfaccion(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getInfraestructuraValores = async (body) => {
        const url = `infraestructura`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getInfraestructura(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getInformacionVuelos = async (body) => {
        const url = `informacion-vuelos`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getInfoVuelos(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getAtencionPersonalizadaValores = async (body) => {
        const url = `calidad-servicio`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getAtencionPersonalizada(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getEgresosValores = async (body) => {
        const url = `egresos`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getEgresosReducer(data?.data[0]))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getIngresosValores = async (body) => {
        const url = `ingresos`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getIngresosReducer(data?.data[0]))
            }).catch((error) => {
                console.log(error)
            });
    }

    const getLocalesComerciales = async (body) => {
        const url = `locales-comerciales`;
        await axiosClient
            .get(url, { params: { fechaDesde: body } })
            .then(({ data }) => {
                dispatch(getTablaLocalesReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    return {
        /**Propiedades **/
        valoresDefecto,
        pasajeros,
        pasajerosValorComercial,
        aviacionMeses,
        aviacionValores,
        cargaMeses,
        cargaValores,
        encuestaSatisfaccion,
        infraestructura,
        infoVuelos,
        atencionPersonalizada,
        tablaLocales,
        /** Métodos **/
        getValoresDefecto,
        updateValoresDefecto,
    };

};
