import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import { useListasStore } from "../../../redux/hooks/useListasStore"
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";

export const TasaUtilizacionInstalada = () => {

    const {
        fechasCargaOcupacion,
        fechasPasajerosOcupacion,
    } = useTablasGeneralStore();

    const [dataPasajeros, setDataPasajeros] = useState({});
    const [optionsPasajeros, setOptionsPasajeros] = useState({});

    const [dataCarga, setDataCarga] = useState({});
    const [optionsCarga, setOptionsCarga] = useState({});

    useEffect(() => {
        let total = 0;
        fechasPasajerosOcupacion?.forEach((item) => {
            total += item.numPasajeros;
        });
        let ocupacionSuma = (total * 100)/ 19500000;
        let restante = 100 - ocupacionSuma
        const data = {
            labels: [`Ocupación:${ocupacionSuma.toFixed(2)}%`, `Sin Ocupar:${restante.toFixed(2)}%`],
            datasets: [
                {
                    data: [ocupacionSuma.toFixed(2), restante.toFixed(2)],
                    backgroundColor: [
                        'rgb(255, 159, 64)',
                        'rgb(17, 104, 255)',

                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, .8)',
                        'rgba(17, 104, 255, .8)',

                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setDataPasajeros(data);
        setOptionsPasajeros(options);
    }, [fechasPasajerosOcupacion]);

    useEffect(() => {
        let total = 0;
        fechasCargaOcupacion?.forEach((item) => {
            total += item.cargaKg;
        });
        let ocupacionSuma = (((total * 100)/ 470000000)*10);
        let restante = 100 - ocupacionSuma
        const data = {
            labels: [`Ocupación:${ocupacionSuma.toFixed(2)}%`, `Sin Ocupar:${restante.toFixed(2)}%`],
            datasets: [
                {
                    data: [ocupacionSuma.toFixed(2), restante.toFixed(2)],
                    backgroundColor: [
                        'rgb(255, 159, 64)',
                        'rgb(17, 104, 255)',

                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, .8)',
                        'rgba(17, 104, 255, .8)',
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setDataCarga(data);
        setOptionsCarga(options);
    }, [fechasCargaOcupacion]);

    return (
        <div className="flex flex-wrap text-center">
            <h4 className="m-0 p-1">TASA DE UTILIZACIÓN DE LA CAPACIDAD INSTALADA</h4>
            <div className="col-12 ">
                <h4 className="m-0 p-1">Terminal de Pasajeros</h4>
                <Chart type="pie" data={dataPasajeros} options={optionsPasajeros} />
            </div>
            <div className="col-12 ">
                <h4 className="m-0 p-1">Terminal de Carga</h4>
                <Chart type="pie" data={dataCarga} options={optionsCarga} />
            </div>
        </div>
    )
}