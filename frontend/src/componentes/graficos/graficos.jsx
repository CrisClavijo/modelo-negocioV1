import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { FormProvider, useForm } from "react-hook-form";
import '../../App.css';
import { FormInputText } from "../customComponente/formInputText";
import { FormInputTextPassword } from "../customComponente/formInputTextPasword"
import { Chart } from 'primereact/chart';
import { Knob } from 'primereact/knob';

export const GraficasCanvas = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [value, setValue] = useState(60);

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
        <div className=" w-screen h-screen flex flex-wrap justify-content-center overflow-x-hidden">
            <div className="col-12 flex flex-wrap p-0">
                <div className="col-3 border-800 border-1 p-0"></div>
                <div className="col-2 border-800 border-1 p-0">
                    <div className="">
                        <h3>Actividades clave</h3>
                        d
                    </div>
                    <div className="border-800 border-1 flex flex-wrap">
                        <h4>Tasa de utilizacion de la capacidad instalada</h4>
                        <div className="col-6 p-0">
                            <Chart type="pie" data={chartData} options={chartOptions} />
                        </div>
                        <div className="col-6 p-0">
                            <Chart type="pie" data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
                <div className="col-2 border-800 border-1 p-0">
                    <h3>Tasa de desempeño de Propuesta de Valor</h3>
                    <div className="card flex flex-wrap justify-content-center">
                        <Knob value={value} onChange={(e) => setValue(e.value)} valueTemplate={'{value}%'} valueColor="#3498DB" />
                        <h5>Infraestructura y tecnologia aeropuertaria</h5>
                    </div>
                    <div className="card flex flex-wrap justify-content-center">
                        <Knob value={value} onChange={(e) => setValue(e.value)} valueTemplate={'{value}%'} valueColor="#FFC300" />
                        <h5>Informacion de vuelos precisa y oportuna</h5>
                    </div>
                    <div className="card flex flex-wrap justify-content-center">
                        <Knob value={value} onChange={(e) => setValue(e.value)} valueTemplate={'{value}%'} valueColor="#CB4335" />
                        <h5>Atencion personalizada en un entorno seguro y con calidad en el servicio</h5>
                    </div>
                </div>
                <div className="col-2 border-800 border-1 p-0">
                    <h3>Relaciones con clientes</h3>
                    <div className="">
                        d
                    </div>
                    <div className="border-800 border-1">
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className="col-3 border-800 border-1 p-0">
                    <h3>Clientes</h3>
                    <div>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                    <div>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                    <div>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
            <div className="col-12 flex flex-wrap p-0 h-22rem">
                <div className="col-4 border-800 border-1 p-0">
                    <Chart type="line" data={chartData} options={chartOptions} />
                </div>
                <div className="col-4 border-800 border-1 p-0">
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
                <div className="col-4 border-800 border-1 p-0">
                    <Chart type="line" data={chartData} options={chartOptions} />
                </div>
            </div>

        </div>
    )
}