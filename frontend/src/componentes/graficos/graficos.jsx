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
import MapaGoogleTrends from './graficosTrends/mapaTrendsAifa'
import ActividadesClaveGoogleTrends from "./graficosTrends/actividadesClave";
import TimeSeriesGoogleTrends from "./graficosTrends/timeSeries";
import { ScrollPanel } from 'primereact/scrollpanel';
import { useTablasGeneralStore } from "../../redux/hooks/useTablasGenerales";

export const GraficasCanvas = () => {
    const {
        getValoresDefecto,
    } = useTablasGeneralStore();


    useEffect(() => {
        getValoresDefecto()
    }, [])

    return (
        <div className=" w-screen h-screen flex flex-wrap justify-content-center overflow-x-hidden color-fondo">

            <div className="col-12 flex flex-wrap p-0 tamanio-columnas">
                <div className="col-3 p-0 tamanio-columnas color-seccion">
                    <ScrollPanel style={{ width: '100%', height: '100%' }} className="custombar1" key='uparrow'>
                    <b><h3 className="text-center">SOCIOS CLAVE</h3></b>
                        <MapaGoogleTrends />

                        <TablasAerolineas />
                        <TablaLocalesComerciales />
                    </ScrollPanel>
                </div>
                <div className="col-2 p-0 tamanio-columnas color-seccion">
                    <ScrollPanel style={{ width: '100%', height: '100%' }} className="custombar1" key='uparrow'>
                        <div className="">
                            <h3 className="text-center">ACTIVIDADES CLAVE</h3>
                            <ActividadesClaveGoogleTrends />
                        </div>
                        <TasaUtilizacionInstalada />
                    </ScrollPanel>
                </div>
                <div className="col-2 p-0 text-center tamanio-columnas color-seccion">
                    <ScrollPanel style={{ width: '100%', height: '100%' }} className="custombar1" key='uparrow'>
                        <TasasDesenpenio />
                    </ScrollPanel>
                </div>
                <div className="col-2 p-0 tamanio-columnas color-seccion">
                    <ScrollPanel style={{ width: '100%', height: '100%' }} className="custombar1" key='uparrow'>
                        <h3 className="text-center">RELACIONES CON CLIENTES</h3>
                        <div className="">
                            <GraficaTrends />
                        </div>
                        <div className="">
                            <TimeSeriesGoogleTrends />
                        </div>
                    </ScrollPanel>
                </div>
                <div className="col-3 p-0 tamanio-columnas color-seccion">
                    <ScrollPanel style={{ width: '100%', height: '100%' }} className="custombar1" key='uparrow'>
                        <GraficasClientes />
                    </ScrollPanel>
                </div>
            </div>
            <div className="col-12 flex flex-wrap p-0 tamanio-columnas-abajo ">
                <div className="col-4 p-0 color-seccion">
                    <GraficaIngresos />
                </div>
                <div className="col-4 p-0 color-seccion">
                    <IngresosEgresos />
                </div>
                <div className="col-4 p-0 color-seccion">
                    <GraficaEgresos />
                </div>
            </div>

        </div>
    )
}