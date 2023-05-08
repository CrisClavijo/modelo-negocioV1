import { useDispatch, useSelector } from "react-redux";
import { guardarPasajerosComerciales } from "../../redux/tableSlice";
import axiosClient from "../../componentes/axios-client";

export const useTablasGeneralStore = () => {
    const dispatch = useDispatch();
    const { pasajeros, pasajerosValorComercial } = useSelector((state) => state.table);



    const getPasajerosComerciales = async (body) => {
        const url = `pasajeros-comerciales`;
        await axiosClient
            .get(url, { params: body })
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
        pasajeros,
        pasajerosValorComercial,
        /** Métodos **/
        getPasajerosComerciales
    };

};
