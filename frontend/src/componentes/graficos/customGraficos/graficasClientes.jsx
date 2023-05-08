import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";

export const GraficasClientes = () => {

    const {
        pasajeros,
        pasajerosValorComercial
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
                    label: 'Pasajeros comerciales',
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
            labels: ['Mar 22', 'Abril 22', 'May 22', 'Jun 22', 'Jul 22', 'Ago 22', 'Sep 22', 'Oct 22', 'Nov 22', 'Dic 22', 'Ene 23', 'Feb 23', 'Mar 23', 'Abril 23'],
            datasets: [
                {
                    label: 'Aviacion general pasajeros',
                    data: [31, 43, 165, 67, 70, 32, 82, 263, 575, 150, 460, 379, 166],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
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
    }, []);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Ene 23', 'Feb 23', 'Mar 23', 'Abril 23'],
            datasets: [
                {
                    label: 'Carga',
                    data: [0, 5, 83, 32],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
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
    }, []);

    return (
        <>
            <h3 className="text-center">Clientes</h3>
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