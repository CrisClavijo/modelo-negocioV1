import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";
import logoAeromexico from '../../../assets/aeromexico-logo.png'
import '../../../App.css'

export const TablasAerolineas = () => {
    const {
        aerolineas
    } = useTablasGeneralStore();

    const headerAerolinea = (
        <h4>Factor de ocupacion</h4>
    );

    const imgAerolineas = (data) =>{
        return (
            <div>
                <img alt={data?.aerolinea} className="logo-aeromexico" src={data?.img} />
            </div>
        )
    }

    return (
        <div className="text-center ">
            <div className="flex flex-wrap ">
                <DataTable value={aerolineas} header={headerAerolinea} className="w-full">
                    <Column field="aerolinea" header="AEROLINEAS" body={imgAerolineas}></Column>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
            </div>
        </div>
    )
}