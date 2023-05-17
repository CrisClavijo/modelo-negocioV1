import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";


export const IngresosEgresos = () => {
    const {
        ingresos,
        egresos
    } = useTablasGeneralStore();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        let sumaIngresos = ingresos?.participaciones + ingresos?.ventaBienes + ingresos?.ingresosFinancieros + ingresos?.otros;
        let sumaEgresos = egresos?.servGenerales + egresos?.serPersonales + egresos?.materiales + egresos?.estimaciones + egresos?.otros;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: [''],
            datasets: [
                {
                    label: 'Ingresos',
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: [sumaIngresos]
                },
                {
                    label: 'Egresos',
                    backgroundColor:'rgba(153, 102, 255, 0.8)',
                    borderColor: 'rgb(153, 102, 255)',
                    data: [sumaEgresos]
                }
            ]
        };
        const options = {
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

        setChartData(data);
        setChartOptions(options);
    }, [ingresos, egresos]);

    return (
        <div className="card ">
            <Chart type="bar" style={{ 'height' : '250px' }} className='tamanio-grafics' data={chartData} options={chartOptions} />
        </div>
    )
}

