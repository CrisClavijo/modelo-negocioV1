import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import { useListasStore } from "../../../redux/hooks/useListasStore"

export const TasaUtilizacionInstalada = () => {

    const {
        ocupacionCarga,
        ocupacionPasajeros
    } = useListasStore();

    const [dataPasajeros, setDataPasajeros] = useState({});
    const [optionsPasajeros, setOptionsPasajeros] = useState({});

    const [dataCarga, setDataCarga] = useState({});
    const [optionsCarga, setOptionsCarga] = useState({});

    useEffect(() => {
        let total = 0;
        ocupacionPasajeros?.forEach((item) => {
            total += item.numPasajeros;
        });
        let ocupacionSuma = (total * 100)/ 19500000;
        let restante = 100 - ocupacionSuma
        const data = {
            labels: [`Ocupacion ${ocupacionSuma.toFixed(2)}`, `Restante ${restante.toFixed(2)}`],
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
    }, [ocupacionPasajeros]);

    useEffect(() => {
        let total = 0;
        ocupacionCarga?.forEach((item) => {
            total += item.cargaKg;
        });
        let ocupacionSuma = (((total * 100)/ 470000000)*10);
        let restante = 100 - ocupacionSuma
        const data = {
            labels: [`Ocupacion ${ocupacionSuma.toFixed(2)}`, `Restante ${restante.toFixed(2)}`],
            datasets: [
                {
                    data: [ocupacionSuma.toFixed(2), restante.toFixed(2)],
                    backgroundColor: [
                        'rgb(17, 104, 255)',
                        'rgb(0, 190, 32)',

                    ],
                    hoverBackgroundColor: [
                        'rgba(17, 104, 255, .8)',
                        'rgba(0, 190, 32, .8)',

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
    }, [ocupacionCarga]);

    return (
        <div className="flex flex-wrap text-center">
            <h4 className="m-0 p-1">Tasa de utilización de la capacidad instalada</h4>
            <div className="col-12 ">
                <h5 className="m-0 p-1">Terminal de pasajeros</h5>
                <Chart type="pie" data={dataPasajeros} options={optionsPasajeros} />
            </div>
            <div className="col-12 ">
                <h5 className="m-0 p-1">Terminal de carga</h5>
                <Chart type="pie" data={dataCarga} options={optionsCarga} />
            </div>
        </div>
    )
}