import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';

export const TasaUtilizacionInstalada = () => {
    const [dataPasajeros, setDataPasajeros] = useState({});
    const [optionsPasajeros, setOptionsPasajeros] = useState({});

    const [dataCarga, setDataCarga] = useState({});
    const [optionsCarga, setOptionsCarga] = useState({});

    useEffect(() => {
        const data = {
            labels: [7.55, 92.5],
            datasets: [
                {
                    data: [7.55, 92.5],
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
    }, []);

    useEffect(() => {
        const data = {
            labels: [12.23, 87.77],
            datasets: [
                {
                    data: [12.23, 87.77],
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
    }, []);

    return (
        <div className="border-800 border-1 flex flex-wrap text-center">
            <h4 className="m-0 p-1">Tasa de utilizacion de la capacidad instalada</h4>
            <div className="col-6 p-0">
                <h5 className="m-0 p-1">Terminal de pasajeros</h5>
                <Chart type="pie" data={dataPasajeros} options={optionsPasajeros} />
            </div>
            <div className="col-6 p-0">
                <h5 className="m-0 p-1">Terminal de carga</h5>
                <Chart type="pie" data={dataCarga} options={optionsCarga} />
            </div>
        </div>
    )
}