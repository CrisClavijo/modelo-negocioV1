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
    getTablaLocalesReducer,
    getTablaAerolineasReducer
} from "../../redux/tableSlice";
import axiosClient from "../../componentes/axios-client";
import { useLoadingStore } from "../../redux/hooks/useLoadingStore";
import { alertNotification } from "../../componentes/customComponente/helpers/helpers";

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
        tablaLocales,
        aerolineas,
        egresos,
        ingresos
    } = useSelector((state) => state.table);
    const { startLoading } = useLoadingStore();

    //Obtener valores

    const getValoresDefecto = async () => {
        startLoading(true)
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
                getLocalesComerciales(response[1].fechaInicial);
                getAerolineasExistentes()
                setTimeout(() => {
                    startLoading(false)
                }, 15000);


            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error al obtener los datos`,
                    text: error?.response?.data?.error_msg,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#6e7881",
                    html: `<h5>${error?.response?.data?.error_msg || "Hubo un problema"
                        }</h5>
                        <div id="lista-errores"></div>
                    `,
                });
                startLoading(false)
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

    const getAerolineasExistentes = async () => {
        const url = `aerolineas`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(getTablaAerolineasReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    //Guardar nuevos valores
    const saveInfraestructura = async (body) => {
        startLoading(true)
        const url = `infraestructura`;
        await axiosClient
            .post(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Guardado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo guardar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const saveInfoVuelos = async (body) => {
        startLoading(true)
        const url = `informacion-vuelos`;
        await axiosClient
            .post(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Guardado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo guardar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const saveAtencionPerso = async (body) => {
        startLoading(true)
        const url = `calidad-servicio`;
        await axiosClient
            .post(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Guardado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo guardar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const saveIngresos = async (body) => {
        startLoading(true)
        const url = `ingresos`;
        await axiosClient
            .post(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Guardado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo guardar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const saveEgresos = async (body) => {
        startLoading(true)
        const url = `egresos`;
        await axiosClient
            .post(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Guardado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo guardar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const saveEncuestaCalidad = async (body) => {
        startLoading(true)
        const url = `encuesta-satisfaccion`;
        await axiosClient
            .post(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Guardado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo guardar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    //Actualizar valores

    const updateValoresDefecto = async (body, id) => {
        startLoading(true)
        const url = `valores-defecto/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Filtro Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateInfraestructura = async (body, id) => {
        startLoading(true)
        const url = `infraestructura/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateInfoVuelos = async (body, id) => {
        startLoading(true)
        const url = `informacion-vuelos/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateAtencionPerso = async (body, id) => {
        startLoading(true)
        const url = `calidad-servicio/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateLocalesComerciales = async (body, id) => {
        startLoading(true)
        const url = `locales-comerciales/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateAerolinea = async (body, id) => {
        startLoading(true)
        const url = `aerolineas/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateIngresos = async (body, id) => {
        startLoading(true)
        const url = `ingresos/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateEgresos = async (body, id) => {
        startLoading(true)
        const url = `egresos/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
            });
    }

    const updateEncuestaCalidad = async (body, id) => {
        startLoading(true)
        const url = `encuesta-satisfaccion/${id}`;
        await axiosClient
            .put(url, body)
            .then(({ data }) => {
                alertNotification({
                    title: "¡Correcto!",
                    text: "Actualizado Correctamente",
                    icon: "success",
                    confirmButtonColor: "#9b0000",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                startLoading(false)
                console.log(data)
            }).catch((error) => {
                alertNotification({
                    title: `Ha ocurrido un error`,
                    text: 'No se pudo actualizar correctamente',
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    target: '.p-dialog'
                });
                console.log(error)
                startLoading(false)
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
        aerolineas,
        egresos,
        ingresos,
        /** Métodos **/
        getValoresDefecto,
        updateValoresDefecto,

        saveInfoVuelos,
        saveInfraestructura,
        saveAtencionPerso,
        saveIngresos,
        saveEgresos,
        saveEncuestaCalidad,

        updateInfraestructura,
        updateInfoVuelos,
        updateAtencionPerso,
        updateLocalesComerciales,
        updateAerolinea,
        updateIngresos,
        updateEgresos,
        updateEncuestaCalidad
    };

};
