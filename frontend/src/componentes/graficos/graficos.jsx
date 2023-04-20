import React, { useEffect } from "react";
import '../../App.css';
import { TasaUtilizacionInstalada } from "./customGraficos/tasaUtilizazacionInst";
import { TasasDesenpenio } from "./customGraficos/tasasDesempenio";
import { GraficasClientes } from "./customGraficos/graficasClientes";
import { TablasAerolineas } from "./customGraficos/tablasAerolineas";
import { IngresosEgresos } from "./customGraficos/graficaBarrasIngresosEgresos";
import { TablaLocalesComerciales } from "./customGraficos/localesComerciales";
import { GraficaIngresos } from "./customGraficos/ingresosGrafica";
import { GraficaEgresos } from "./customGraficos/egresosGrafica";
import { GraficaTrends } from "./graficosTrends/graficaTrends";

export const GraficasCanvas = () => {

    return (
        <div className=" w-screen h-screen flex flex-wrap justify-content-center overflow-x-hidden">
            <div className="col-12 flex flex-wrap p-0">
                <div className="col-3 border-800 border-1 p-0">
                    <div className="">
                        <iframe href="https://ssl.gstatic.com/trends_nrtr/3316_RC01/embed_loader.js"></iframe>
                    </div>
                    <TablasAerolineas />
                    <TablaLocalesComerciales />
                </div>
                <div className="col-2 border-800 border-1 p-0">
                    <div className="">
                        <h3>Actividades clave</h3>
                        d
                    </div>
                    <TasaUtilizacionInstalada />
                </div>
                <div className="col-2 border-800 border-1 p-0 text-center">
                    <TasasDesenpenio />
                </div>
                <div className="col-2 border-800 border-1 p-0">
                    <h3>Relaciones con clientes</h3>
                    <div className="">
                        d
                    </div>
                    <div className="border-800 border-1">
                        <GraficaTrends />
                    </div>
                </div>
                <div className="col-3 border-800 border-1 p-0">
                    <GraficasClientes />
                </div>
            </div>
            <div className="col-12 flex flex-wrap p-0 h-22rem">
                <div className="col-4 border-800 border-1 p-0">
                    <GraficaIngresos />
                </div>
                <div className="col-4 border-800 border-1 p-0">
                    <IngresosEgresos />
                </div>
                <div className="col-4 border-800 border-1 p-0">
                    <GraficaEgresos />
                </div>
            </div>

        </div>
    )
}