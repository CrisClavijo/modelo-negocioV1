import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import logoAeromexico from '../../../assets/aeromexico-logo.png'
import '../../../App.css'

export const TablasAerolineas = () => {
    const [aeromexico, setAeromexico] = useState([{ fop: '71.43%', oper: 452 }]);
    const [vivaAerobus, setVivaAerobus] = useState([{ fop: '71.97%', oper: 290 }]);
    const [volaris, setVolaris] = useState([{ fop: '82.97%', oper: 98 }]);
    const [conviasa, setConviasa] = useState([{ fop: '0%', oper: 6 }]);
    const [magni, setMagni] = useState([{ fop: '0%', oper: 20 }]);
    const [arajet, setArajet] = useState([{ fop: '0%', oper: 18 }])
    const [copaAirlines, setCopaAirlines] = useState([{ fop: '0%', oper: 14 }]);

    const headerAeromexico = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <div className="logo-aeromexico"></div>
        </div>
    );
    const headerViva = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Viva aerobus</span>
        </div>
    );
    const headerVolaris = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Volaris</span>
        </div>
    );
    const headerConviasa = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Conviasa</span>
        </div>
    );
    const headerMagni = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Magni</span>
        </div>
    );
    const headerArajet = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Arajet</span>
        </div>
    );
    const headerCopaAir = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <span className="text-xl text-900 font-bold">Copa  AirLines</span>
        </div>
    );


    return (
        <div className="border-800 border-1 text-center">
            <h4>Factor de ocupacion</h4>
            <div className="flex flex-wrap justify-content-center">
                <DataTable value={aeromexico} header={headerAeromexico} className="">
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
                <DataTable value={vivaAerobus} header={headerViva}>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
                <DataTable value={volaris} header={headerVolaris}>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
                <DataTable value={conviasa} header={headerConviasa}>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
                <DataTable value={magni} header={headerMagni}>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
                <DataTable value={arajet} header={headerArajet}>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
                <DataTable value={copaAirlines} header={headerCopaAir}>
                    <Column field="fop" header="FOP"></Column>
                    <Column field="oper" header="OPER" ></Column>
                </DataTable>
            </div>
        </div>
    )
}