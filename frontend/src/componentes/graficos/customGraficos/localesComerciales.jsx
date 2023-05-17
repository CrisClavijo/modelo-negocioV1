import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";

export const TablaLocalesComerciales = () => {
    const {
        tablaLocales
    } = useTablasGeneralStore();

    const [nuevaTabla, setNuevaTabla] = useState(tablaLocales)

    useEffect(() => {
        if (tablaLocales) {
            let _tabla = [...tablaLocales]
            let totalExistentes = 0;
            let totalarrendados = 0;
            let totaloperando = 0;
            let totalenAdaptacion = 0;
            let totaldisponibles = 0;
            let totalempresas = 0;
            tablaLocales?.forEach((item) => {
                
                totalExistentes += item.existentes;
                totalarrendados += item.arrendados;
                totaloperando += item.operando;
                totalenAdaptacion += item.enAdaptacion;
                totaldisponibles += item.disponibles;
                totalempresas += item.empresas;
            });
            let total = { giros: 'TOTAL', existentes: totalExistentes, arrendados: totalarrendados, operando: totaloperando, enAdaptacion: totalenAdaptacion, disponibles: totaldisponibles, empresas: totalempresas }
            _tabla.push(total)
            setNuevaTabla(_tabla)
        }
    }, [tablaLocales]);


    return (
        <div className="border-800 border-1 text-center">
            <DataTable value={nuevaTabla || []} className="">
                <Column field="giros" header="GIROS"></Column>
                <Column field="existentes" header="EXISTENTES" ></Column>
                <Column field="arrendados" header="ARRENDADOS" ></Column>
                <Column field="operando" header="OPERANDO" ></Column>
                <Column field="enAdaptacion" header="EN ADAPTACION" ></Column>
                <Column field="disponibles" header="DISPONIBLES" ></Column>
                <Column field="empresas" header="EMPRESAS" ></Column>
            </DataTable>
        </div>
    )
}