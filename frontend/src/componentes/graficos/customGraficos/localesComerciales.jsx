import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const TablaLocalesComerciales = () => {
    const [aeromexico, setAeromexico] = useState
        ([
            { giro: 'ALIMENTOS', existente: 62, arrendado: 39, operando: 20, adaptacion: 19, disponibles: 23, empresas: 29},
            { giro: 'ARTICULOS', existente: 86, arrendado: 39, operando: 14, adaptacion: 25, disponibles: 47, empresas: 17},
            { giro: 'SERVICIOS', existente: 43, arrendado: 37, operando: 16, adaptacion: 21, disponibles: 6, empresas: 23},
            { giro: 'MOVILIDAD', existente: 14, arrendado: 14, operando: 13, adaptacion: 1, disponibles: 0, empresas: 24},
            { giro: 'TOTALES', existente: 205, arrendado: 129, operando: 63, adaptacion: 66, disponibles: 76, empresas: 93},
        ]);

    const headerAeromexico = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Aeromexico</span>
        </div>
    );


    return (
        <div className="border-800 border-1 text-center">
            <DataTable value={aeromexico} className="">
                <Column field="giro" header="GIROS"></Column>
                <Column field="existente" header="EXISTENTES" ></Column>
                <Column field="arrendado" header="ARRENDADOS" ></Column>
                <Column field="operando" header="OPERANDO" ></Column>
                <Column field="adaptacion" header="EN ADAPTACION" ></Column>
                <Column field="disponibles" header="DISPONIBLES" ></Column>
                <Column field="empresas" header="EMPRESAS" ></Column>
            </DataTable>
        </div>
    )
}