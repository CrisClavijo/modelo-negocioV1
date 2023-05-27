import { useDispatch, useSelector } from "react-redux";
import {
    lstInfraestructuraReducer,
    lstInfoVuelosReducer,
    lstAtencionPersonalizadaReducer,
    lstLocalesComercialesReducer,
    lstAerolineasReducer,
    lstIngresosReducer,
    lstEgresosReducer,
    lstEncuestaCalidadReducer,
} from "../../redux/listasSlice";
import axiosClient from "../../componentes/axios-client";

export const useListasStore = () => {
    const dispatch = useDispatch();

    const {
        lstInfraestructura,
        lstInfoVuelos,
        lstAtencionPersonalizada,
        lstlocalesComerciales,
        lstAerolinea,
        lstIngresos,
        lstEgresos,
        lstEncuestaCalidad,
    } = useSelector((state) => state.listas);

    const startLstInfraestructura = async () => {
        const url = `lst-infraestructura`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstInfraestructuraReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstInfoVuelos = async () => {
        const url = `lst-informacion-vuelos`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstInfoVuelosReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstAtencionPersonalizada = async () => {
        const url = `lst-atencion-personalizada`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstAtencionPersonalizadaReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstLocalesComerciales = async () => {
        const url = `lst-locales-comerciales`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstLocalesComercialesReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstAerolineas = async () => {
        const url = `lst-aerolineas`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstAerolineasReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstIngresos = async () => {
        const url = `lst-ingresos`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstIngresosReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstEgresos = async () => {
        const url = `lst-egresos`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstEgresosReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    const startLstEncuestaCalidad = async () => {
        const url = `lst-encuesta-calidad`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                dispatch(lstEncuestaCalidadReducer(data?.data))
            }).catch((error) => {
                console.log(error)
            });
    }

    return {
        /**Propiedades **/
        lstInfraestructura,
        lstInfoVuelos,
        lstAtencionPersonalizada,
        lstlocalesComerciales,
        lstAerolinea,
        lstIngresos,
        lstEgresos,
        lstEncuestaCalidad,
        /** Métodos **/
        startLstInfraestructura,
        startLstInfoVuelos,
        startLstAtencionPersonalizada,
        startLstLocalesComerciales,
        startLstAerolineas,
        startLstIngresos,
        startLstEgresos,
        startLstEncuestaCalidad,
    };

};
