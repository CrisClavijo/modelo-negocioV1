import React, { createRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FormCalendar } from "../customComponente/formCalendar"
import { FormProvider, useForm } from "react-hook-form";
import XDate from "xdate";
import { useTablasGeneralStore } from "../../redux/hooks/useTablasGenerales";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const Editar = () => {
    const methods = useForm({ shouldUnregister: true });
    const { userInfo } = useSelector(state => state.user)
    const {
        updateValoresDefecto
    } = useTablasGeneralStore();


    const [mostrarAerolineas, setMostrarAerolineas] = useState(false);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [headerFiltro, setHeaderFiltro] = useState("")
    const [idFiltro, setIdFiltro] = useState(0)

    const [selectedCity, setSelectedCity] = useState(null);
    const [value4, setValue4] = useState(50);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const consultaCertificados = (data) => {
        if (idFiltro === 8 || idFiltro === 9 || idFiltro === 10) {
            if (data.fechaFin >= data.fechaInicio) {
                let body = {
                    fechaInicial: XDate(data.fechaInicio).toString("yyyy-MM-01"),
                    fechaFinal: XDate(data.fechaFin).toString("yyyy-MM-01")
                }
                console.log("completo",body, idFiltro)
                updateValoresDefecto(body, idFiltro)
                setHeaderFiltro("")
                setIdFiltro(0)
                setMostrarFiltro(false)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'La fecha final no puede ser menor a la fecha de inicio',
                    target: '.p-dialog'
                })
            }
        }else{
            let body = {
                fechaInicial: XDate(data.fechaInicio).toString("yyyy-MM-01"),
                fechaFinal: XDate(data.fechaInicio).toString("yyyy-MM-01")
            }
            console.log("Solo inicial",body, idFiltro)
            updateValoresDefecto(body, idFiltro)
            setHeaderFiltro("")
            setIdFiltro(0)
            setMostrarFiltro(false)
        }

    }


    return (
        <div className="h-full p-5 col-11 mx-auto ">
            {userInfo?.rol === 1 || userInfo?.rol === 3 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                    <h2 className="col-12 m-0">Departamento de Operaciones</h2>
                    <div className="p-card col-2 text-center">
                        <h3>Tasa de Utilización de la Capacidad Instalada</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Tasa de utlización de la capacidad instalada");
                                setIdFiltro(3)
                            }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Infraestructura y Tecnología Aeropuertuaria</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Infraestructura y tecnologias aeropuertuaria");
                                setIdFiltro(4)
                            }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Información de Vuelos Precisa y Oportuna</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right"
                                onClick={() => {
                                    setMostrarFiltro(true);
                                    setHeaderFiltro("Información de vuelos precisa y oportuna");
                                    setIdFiltro(5)
                                }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Atencion Personalizada en un Entorno Seguro y con Calidad en el Servicio</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Atencion personalizada en un entorno seguro y con calidad en el servicio");
                                setIdFiltro(6)
                            }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Encuesta de Satisfacción</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Encuesta de satisfacción");
                                setIdFiltro(7)
                            }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Aviación Comercial Pasajeros</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Pasajeros comerciales");
                                setIdFiltro(8)
                            }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Aviación General Pasajeros</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Aviacion general pasajeros");
                                setIdFiltro(9)
                            }} />
                        </div>
                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Aviación de Carga Kg</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Carga");
                                setIdFiltro(10)
                            }} />
                        </div>
                    </div>
                </div>
            ) : null}
            {userInfo?.rol === 1 || userInfo?.rol === 4 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                    <h2 className="col-12 m-0">Departamento de finanzas</h2>
                    <div className="p-card col-2 text-center">
                        <h3>Ingresos</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Ingresos");
                                setIdFiltro(11)
                            }} />
                        </div>
                    </div>

                    <div className="p-card col-2 text-center">
                        <h3>Egresos</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => {
                                setMostrarFiltro(true);
                                setHeaderFiltro("Egresos");
                                setIdFiltro(12)
                            }}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            {userInfo?.rol === 1 || userInfo?.rol === 5 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                    <h2 className="col-12 m-0">Departamento de Planeación</h2>
                    <div className="p-card col-2 text-center">
                        <h3>Aerolíneas</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" onClick={() => setMostrarAerolineas(true)} />

                        </div>

                    </div>
                    <div className="p-card col-2 text-center">
                        <h3>Locales Comerciales</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Editar" severity="danger" icon="pi pi-pencil" iconPos="right" />
                        </div>
                    </div>
                </div>
            ) : null}



            <Dialog header={`Filtrar ${headerFiltro}`} visible={mostrarFiltro} style={{ width: '50vw' }} onHide={() => setMostrarFiltro(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form
                            id="FiltroForm"
                            onSubmit={methods.handleSubmit(consultaCertificados)}
                            className="p-fluid grid mt-2"
                        >
                            <div className="col-12 sm:col-4 md:col-4 lg:col-4 xl:col-4">
                                <FormCalendar
                                    name="fechaInicio"
                                    label="Fecha Inicio*"
                                    yearRange="2022:2030"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo Fecha Inicio es requerido",
                                        },
                                    }}
                                />
                            </div>
                            {idFiltro === 8 || idFiltro === 9 || idFiltro === 10 ? (
                                <div className="col-12 sm:col-4 md:col-4 lg:col-4 xl:col-4">
                                    <FormCalendar
                                        name="fechaFin"
                                        label="Fecha Final*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo Fecha Final es requerido",
                                            },
                                        }}
                                    />
                                </div>
                            ) : null}

                            <div className="col-12 sm:col-4 md:col-4 lg:col-4 xl:col-4">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label="Actualizar"
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>


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
    )
}
