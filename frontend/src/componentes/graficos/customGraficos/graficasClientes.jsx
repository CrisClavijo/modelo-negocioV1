import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";
import { useListasStore } from "../../../redux/hooks/useListasStore"

export const GraficasClientes = () => {

    const {
        lstAviacionComercial,
        lstAviacionGeneral,
        startLstAviacionComercial,
        startLstAviacionGeneral
    } = useListasStore();

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

    const [sumaPasajerosComercial, setSumaPasajerosComercial] = useState(0);
    const [sumaPasajerosGeneral, setSumaPasajerosGeneral] = useState(0);
    const [sumaCarga, setSumaCarga] = useState(0);
    const [acumuladoGeneral, setAcumuladoGen] = useState(0);

    useEffect(() => {
        startLstAviacionComercial()
        startLstAviacionGeneral()
        let total = 0;
        pasajerosValorComercial?.forEach((item) => {
            total += item;
        });
        setSumaPasajerosComercial(total)

        let totalComercial = 0;
        lstAviacionComercial?.forEach((item) => {
            totalComercial += item.valor;
        });

        let totalGeneral = 0;
        lstAviacionGeneral?.forEach((item) => {
            totalGeneral += item.valor;
        });

        setAcumuladoGen(totalComercial+totalGeneral)

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
    }, [pasajeros, pasajerosValorComercial]);

    useEffect(() => {
        let total = 0;
        aviacionValores?.forEach((item) => {
            total += item;
        });
        setSumaPasajerosGeneral(total)
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
        let total = 0;
        cargaValores?.forEach((item) => {
            total += item;
        });
        setSumaCarga(total)
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
            <h4 className="text-center p-card mx-3 py-2 contenedor-cantidad">Acumulado pasajeros comercial y general: {acumuladoGeneral?.toLocaleString()}</h4>
            <div>
                <Chart className="tamanio-graficas" type="line" data={datosPasajerosComer} options={opcionesPasajerosComer} />
                <h4 className="text-center p-card mx-3 py-2 contenedor-cantidad">Total pasajeros comerciales: {sumaPasajerosComercial?.toLocaleString()}</h4>
            </div>
            <div className="m-3">
                <Chart className="tamanio-graficas" type="line" data={generalPasajeros} options={opcionesGeneralesP} />
                <h4 className="text-center p-card mx-3 py-2 contenedor-cantidad">Total pasajeros generales: {sumaPasajerosGeneral?.toLocaleString()}</h4>
            </div>
            <div>
                <Chart className="tamanio-graficas" type="line" data={chartData} options={chartOptions} />
                <h4 className="text-center p-card mx-3 py-2 contenedor-cantidad">Carga total: {sumaCarga?.toLocaleString()} kg</h4>
            </div>
        </>
    )
}