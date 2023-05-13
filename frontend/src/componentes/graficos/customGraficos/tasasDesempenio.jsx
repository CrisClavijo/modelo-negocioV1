import React, { useState, useEffect } from "react";
import { Knob } from 'primereact/knob';
import { useTablasGeneralStore } from "../../../redux/hooks/useTablasGenerales";
export const TasasDesenpenio = () => {

    const {
        infraestructura,
        infoVuelos,
        atencionPersonalizada
    } = useTablasGeneralStore();

    const [infraestrutura, setInfraestrutura] = useState(0);
    const [informacionVuelos, setinformacionVuelos] = useState(0);
    const [atencion, setAtencion] = useState(0);

    useEffect(() => {
        if(atencionPersonalizada){
        setInfraestrutura(infraestructura[0]?.valor)
        setinformacionVuelos(infoVuelos[0]?.valor)
        setAtencion(atencionPersonalizada[0]?.valor)
    }
    }, [infraestructura, infoVuelos, atencionPersonalizada]);

    return (
        <>
            <h3>Tasa de desempeño de Propuesta de Valor</h3>
            <div className="card flex flex-wrap justify-content-center">
                <Knob
                    value={infraestrutura}
                    //onChange={(e) => console.log(e)}
                    valueTemplate={'{value}%'}
                    valueColor="#9B59B6"
                    step={infraestrutura}
                />
                <h5 className="m-1">Infraestructura y tecnologia aeropuertaria</h5>
            </div>
            <div className="card flex flex-wrap justify-content-center my-3">
                <Knob
                    value={informacionVuelos}
                    //onChange={(e) => setInfoVuelos(e.infoVuelos)}
                    valueTemplate={'{value}%'}
                    valueColor="#F4D03F"
                    step={informacionVuelos}
                />
                <h5 className="m-1">Informacion de vuelos precisa y oportuna</h5>
            </div>
            <div className="card flex flex-wrap justify-content-center">
                <Knob
                    value={atencion}
                    //onChange={(e) => setAtencion(e.atencion)}
                    valueTemplate={'{value}%'}
                    valueColor="#58D68D"
                    step={atencion}
                />
                <h5 className="m-1">Atencion personalizada en un entorno seguro y con calidad en el servicio</h5>
            </div>
        </>
    )
}