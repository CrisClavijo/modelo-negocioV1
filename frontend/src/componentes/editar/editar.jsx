import React, { createRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

export const Editar = () => {
    const [mostrarAerolineas, setMostrarAerolineas] = useState(false);

    const [selectedCity, setSelectedCity] = useState(null);
    const [value4, setValue4] = useState(50);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="h-full p-5 col-11 mx-auto">
            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Factor de ocupacion</h2>
                <div className="p-card col-2 text-center mr-5">
                    <h3>Socios clave aerolineas</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" onClick={() => setMostrarAerolineas(true)} />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                            let i = 1
                            console.log(i++)
                            console.log(i)
                        }} />
                    </div>
                    <Dialog header="Socios clave aerolineas" visible={mostrarAerolineas} style={{ width: '50vw' }} onHide={() => setMostrarAerolineas(false)}>
                        <div className="p-fluid">
                            <Dropdown
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.value)}
                                options={cities}
                                optionLabel="name"
                                placeholder="Select a City"
                                className=""
                            />
                            <InputNumber
                                useGrouping={false}
                                inputId="minmax"
                                value={value4}
                                onValueChange={(e) => setValue4(e.value)}
                                min={0}
                                max={100}
                                suffix="%"
                            />
                            <InputNumber
                                useGrouping={false}
                                inputId="minmax"
                                value={value4}
                                onValueChange={(e) => setValue4(e.value)}
                                min={0}
                                max={100}
                                suffix="%"
                            />

                        </div>
                    </Dialog>
                </div>
                <div className="p-card col-2 text-center">
                    <h3>Socios clave locales comerciales</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Actividades Clave</h2>
                <div className="p-card col-2 text-center">
                    <h3>Tasa de utlización de la capacidad instalada</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Tasa de desempeño de Propuesta de Valor</h2>
                <div className="p-card col-2 text-center">
                    <h3>Infraestructura y tecnologias aeropuertuaria</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
                <div className="p-card col-2 text-center">
                    <h3>Información de vuelos precisa y oportuna</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
                <div className="p-card col-2 text-center">
                    <h3>Atencion personalizada en un entorno seguro y con calidad en el servicio</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Relaciones con clientes</h2>
                <div className="p-card col-2 text-center">
                    <h3>Encuesta de satisfacción</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Clientes</h2>
                <div className="p-card col-2 text-center">
                    <h3>Pasajeros comerciales</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
                <div className="p-card col-2 text-center">
                    <h3>Aviacion general pasajeros</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
                <div className="p-card col-2 text-center">
                    <h3>Carga</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Ingresos</h2>
                <div className="p-card col-2 text-center">
                    <h3>Ingresos</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Ingresos y Egresos</h2>
                <div className="p-card col-2 text-center">
                    <h3>Ingresos y egresos</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <h2 className="col-12 m-0">Egresos</h2>
                <div className="p-card col-2 text-center">
                    <h3>Egresos</h3>
                    <div className="gap-2 flex flex-wrap justify-content-center">
                        <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" />
                    </div>
                </div>
            </div>
        </div>
    )
}
