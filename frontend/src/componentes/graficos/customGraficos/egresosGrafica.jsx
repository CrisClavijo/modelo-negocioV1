import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';


export const GraficaEgresos = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Servicios generales', 'Servicios personales', 'Materiales y suministros', 'Estimaciones, depreciaciones, deterioros, obsidencia y amortiguaciones', 'Otros gastos'],
            datasets: [
                {
                    label: 'Carga',
                    data: [800500000.00, 400000000.00, 100500000.00, 100000.00, 50000],
                    fill: false,
                    borderColor: 'rgb(142, 68, 173)',
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
        <div>
            <h3 className="text-center">Ingresos 2022</h3>
            <Chart className="tamanio-graficas"  type="line" data={chartData} options={chartOptions} />
        </div>
    )
}