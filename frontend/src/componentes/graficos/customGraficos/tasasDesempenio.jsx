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
            <h3>TASA DE DESEMPEÑO DE PROPUESTA DE VALOR</h3>
            <div className="card flex flex-wrap justify-content-center">
                <Knob
                    value={infraestrutura||0}
                    valueTemplate={'{value}%'}
                    valueColor="#58D68D"
                    step={infraestrutura}
                />
                <h5 className="m-1">Infraestructura y tecnología aeropuertaria</h5>
            </div>
            <div className="card flex flex-wrap justify-content-center my-3">
                <Knob
                    value={informacionVuelos||0}
                    //onChange={(e) => setInfoVuelos(e.infoVuelos)}
                    valueTemplate={'{value}%'}
                    valueColor="#58D68D"
                    step={informacionVuelos}
                />
                <h5 className="m-1">Información de vuelos precisa y oportuna</h5>
            </div>
            <div className="card flex flex-wrap justify-content-center">
                <Knob
                    value={atencion||0}
                    //onChange={(e) => setAtencion(e.atencion)}
                    valueTemplate={'{value}%'}
                    valueColor="#58D68D"
                    step={atencion}
                />
                <h5 className="m-1">Atención personalizada en un entorno seguro y con calidad en el servicio</h5>
            </div>
        </>
    )
}