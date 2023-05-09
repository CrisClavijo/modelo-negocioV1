import { useDispatch, useSelector } from "react-redux";
import {
    guardarPasajerosComerciales,
    obtenerValoresDefecto,
} from "../../redux/tableSlice";
import axiosClient from "../../componentes/axios-client";

export const useTablasGeneralStore = () => {
    const dispatch = useDispatch();
    const {
        valoresDefecto,
        pasajeros,
        pasajerosValorComercial,

    } = useSelector((state) => state.table);

    const getValoresDefecto = async () => {
        const url = `valores-defecto`;
        await axiosClient
            .get(url)
            .then(({ data }) => {
                let response = data?.data;
                dispatch(obtenerValoresDefecto(response))
                getPasajerosComerciales(response[7].fechaInicial, response[7].fechaFinal);
            }).catch((error) => {
                console.log(error)
            });
    }

    const updateValoresDefecto = async (body, id) => {
        const url = `/valores-defecto/${id}`;
        await axiosClient
            .put(url, body )
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

    return {
        /**Propiedades **/
        valoresDefecto,
        pasajeros,
        pasajerosValorComercial,
        /** Métodos **/
        getValoresDefecto,
        updateValoresDefecto,
        getPasajerosComerciales
    };

};
