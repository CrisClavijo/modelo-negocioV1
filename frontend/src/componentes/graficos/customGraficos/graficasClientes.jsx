import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";

export const GraficasClientes = () => {

    const {
        pasajeros,
        pasajerosValorComercial,
        aviacionMeses,
        aviacionValores,
        cargaMeses,
        cargaValores,
    } = useTablasGeneralStore();

    const [datosPasajerosComer, setDatosPasajerosComer] = useState({});
    const [opcionesPasajerosComer, setOpcionesPasajerosComer] = useState({});
    const [generalPasajeros, setGeneralPasajeros] = useState({});
    const [opcionesGeneralesP, setOpcionesGeneralesP] = useState({});
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: pasajeros,
            datasets: [
                {
                    label: 'Aviación Comercial Pasajeros',
                    data: pasajerosValorComercial,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setDatosPasajerosComer(data);
        setOpcionesPasajerosComer(options);
    }, [pasajeros]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: aviacionMeses,
            datasets: [
                {
                    label: 'Aviación General Pasajeros',
                    data: aviacionValores,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setGeneralPasajeros(data);
        setOpcionesGeneralesP(options);
    }, [aviacionMeses, aviacionValores]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: cargaMeses,
            datasets: [
                {
                    label: 'Aviación de Carga (Kg)',
                    data: cargaValores,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [cargaMeses, cargaValores]);

    return (
        <>
            <h3 className="text-center">CLIENTES</h3>
            <div>
                <Chart className="tamanio-graficas" type="line" data={datosPasajerosComer} options={opcionesPasajerosComer} />
            </div>
            <div className="m-3">
                <Chart className="tamanio-graficas" type="line" data={generalPasajeros} options={opcionesGeneralesP} />
            </div>
            <div>
                <Chart className="tamanio-graficas" type="line" data={chartData} options={chartOptions} />
            </div>
        </>
    )
}