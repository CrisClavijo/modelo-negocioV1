import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';

export const GraficaTrends = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Q1', 'Q2'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325],
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div>
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}