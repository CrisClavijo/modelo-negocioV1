import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";

export const GraficaTrends = () => {

    const {
        encuestaSatisfaccion
    } = useTablasGeneralStore();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [arrayCompleto, setArray] = useState(null);
    useEffect(() => {
        if(encuestaSatisfaccion){
            let array= [
                encuestaSatisfaccion[0].seguridad,
                encuestaSatisfaccion[0].limpieza,
                encuestaSatisfaccion[0].tiemDeEsper,
                encuestaSatisfaccion[0].infoVuelos,
                encuestaSatisfaccion[0].senializacion,
                encuestaSatisfaccion[0].atencionCliente,
                encuestaSatisfaccion[0].infraestructura,
                encuestaSatisfaccion[0].servComerciales,
                encuestaSatisfaccion[0].conectividadVial
            ]
            setArray(array)
        }
    }, [encuestaSatisfaccion]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Seguridad', 'Limpieza', 'Tiempos de espera', 'Info. de vuelos', 'Señalización', 'Atencion al cliente', 'infraestructura', 'Servicios comerciales', 'Conectividad vial'],
            datasets: [
                {
                    label: 'Satisfacción',
                    backgroundColor: '#3498DB',
                    borderColor: '#3498DB',
                    data: arrayCompleto
                },
            ]
        };
        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data)
        setChartOptions(options);
    }, [encuestaSatisfaccion]);

    return (
        <div>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}