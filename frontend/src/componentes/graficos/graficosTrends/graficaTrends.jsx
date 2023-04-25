import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';

export const GraficaTrends = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

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
                    data: [99.39, 98.17, 91.26, 93.29, 92.99, 84.15, 86.89, 63.41, 63.41]
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
    }, []);

    return (
        <div>
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}