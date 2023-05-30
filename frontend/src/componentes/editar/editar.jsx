import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FormCalendar } from "../customComponente/formCalendar"
import { FormProvider, useForm } from "react-hook-form";
import XDate from "xdate";
import { useTablasGeneralStore } from "../../redux/hooks/useTablasGenerales";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FormInputText } from "../customComponente/formInputText"
import { useListasStore } from "../../redux/hooks/useListasStore"
import { FormDropdown } from "../customComponente/formDropdown";
import { useLoadingStore } from "../../redux/hooks/useLoadingStore";

export const Editar = () => {
    XDate.locales['es'] = {
        monthNames: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        monthNamesShort: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
        ],
        dayNames:  [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
        ],
        dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]
    };

    XDate.defaultLocale = 'es';

    const methods = useForm({ shouldUnregister: true });
    const { userInfo } = useSelector(state => state.user)
    const { startLoading } = useLoadingStore();

    const {
        valoresDefecto,
        updateValoresDefecto,

        updateInfraestructura,
        updateInfoVuelos,
        updateAtencionPerso,
        updateLocalesComerciales,
        updateAerolinea,
        updateIngresos,
        updateEgresos,
        updateEncuestaCalidad,
        updateAviacionComercial,
        updateAviacionGeneral,
        updateAviacionCarga,
        updateOcupacionCarga,
        updateOcupacionPasajeros,

        saveInfoVuelos,
        saveInfraestructura,
        saveAtencionPerso,
        saveIngresos,
        saveEgresos,
        saveEncuestaCalidad,
        saveAviacionComercial,
        saveAviacionGeneral,
        saveAviacionCarga,
        saveOcupacionCarga,
        saveOcupacionPasajeros,
        saveUltimaActualizacion
    } = useTablasGeneralStore();

    const {
        lstInfraestructura,
        lstInfoVuelos,
        lstAtencionPersonalizada,
        lstlocalesComerciales,
        lstAerolinea,
        lstIngresos,
        lstEgresos,
        lstEncuestaCalidad,
        lstAviacionComercial,
        lstAviacionGeneral,
        lstAviacionCarga,
        ocupacionCarga,
        ocupacionPasajeros,
        startLstInfraestructura,
        startLstInfoVuelos,
        startLstAtencionPersonalizada,
        startLstLocalesComerciales,
        startLstAerolineas,
        startLstIngresos,
        startLstEgresos,
        startLstEncuestaCalidad,
        startLstAviacionComercial,
        startLstAviacionGeneral,
        startLstAviacionCarga,
        startOcupacionPasajeros,
        startOcupacionCarga
    } = useListasStore();

    useEffect(() => {
        startLoading(true)
        if (userInfo?.rol === 1 || userInfo?.rol === 3) {
            startOcupacionPasajeros()
            startOcupacionCarga()
            startLstInfraestructura()
            startLstInfoVuelos()
            startLstAtencionPersonalizada()
            startLstEncuestaCalidad()
            startLstAviacionComercial()
            startLstAviacionGeneral()
            startLstAviacionCarga()
        }
        if (userInfo?.rol === 1 || userInfo?.rol === 4) {
            startLstIngresos()
            startLstEgresos()
        }
        if (userInfo?.rol === 1 || userInfo?.rol === 5) {
            startLstLocalesComerciales()
            startLstAerolineas()
        }
        setTimeout(() => {
            startLoading(false)
        }, 6000);
    }, [userInfo]);

    const [mostrarAerolineas, setMostrarAerolineas] = useState(false);
    const [mostrarLocales, setMostrarLocales] = useState(false);
    const [mostrarIngresos, setMostrarIngresos] = useState(false);
    const [mostrarEgresos, setMostrarEgresos] = useState(false);
    const [mostrarEncuesta, setMostrarEncuesta] = useState(false);
    const [mostrarTasaUtil, setMostrarTasaUtil] = useState(false);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [mostrarAviacion, setMostrarAviacion] = useState(false);
    const [headerFiltro, setHeaderFiltro] = useState("")
    const [idFiltro, setIdFiltro] = useState(0)
    const [headerEditar, setHeaderEditar] = useState("")
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [banderaBoton, setBanderaBtn] = useState(false);
    const [banderaLista, setBanderaLista] = useState([]);
    const [opcionesId, setOpcionesId] = useState("")
    const [modalId, setModalId] = useState(0)
    const [listaFiltro, setListaFiltro] = useState([]);
    const [opcionesFiltro, setOpcionesFiltro] = useState("")
    const [valueFiltro, setValueFiltro] = useState("")

    const consultaCertificados = (data) => {
        console.log(data)
        console.log(data.fechaFin >= data.fechaInicio)

        if (idFiltro === 8 || idFiltro === 9 || idFiltro === 10 || idFiltro === 3) {
            if (data.fechaFin >= data.fechaInicio) {
                let body = {
                    fechaInicial: XDate(data.fechaInicio).toString("yyyy-MM-01"),
                    fechaFinal: XDate(data.fechaFin).toString("yyyy-MM-01")
                }
                console.log("completo", body, idFiltro)
                updateValoresDefecto(body, idFiltro)
                onClearValores()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'La fecha final no puede ser menor a la fecha de inicio',
                    target: '.p-dialog'
                })
            }
        } else {
            let body = {
                fechaInicial: XDate(data.fechaInicio).toString("yyyy-MM-01"),
                fechaFinal: XDate(data.fechaInicio).toString("yyyy-MM-01")
            }
            console.log("Solo Inicial", body, idFiltro)
            updateValoresDefecto(body, idFiltro)
            onClearValores()
        }

    }

    const verificarFiltro = (modalFiltro, titulo, filtroId) => {
        setMostrarFiltro(modalFiltro);
        setHeaderFiltro(titulo);
        setIdFiltro(filtroId)
        if (filtroId === 3) {
            setListaFiltro(ocupacionPasajeros)
            setOpcionesFiltro("formatoFecha")
            setValueFiltro("fecha")
            return
        }
        if (filtroId === 4) {
            setListaFiltro(lstInfraestructura)
            setOpcionesFiltro("fecha")
            setValueFiltro("date")
            return
        }
        if (filtroId === 5) {
            setListaFiltro(lstInfoVuelos)
            setOpcionesFiltro("fecha")
            setValueFiltro("date")
            return
        }
        if (filtroId === 6) {
            setListaFiltro(lstAtencionPersonalizada)
            setOpcionesFiltro("fecha")
            setValueFiltro("date")
            return
        }
        if (filtroId === 7) {
            setListaFiltro(lstEncuestaCalidad)
            setOpcionesFiltro("formatoFecha")
            setValueFiltro("fecha")
            return
        }
        if (filtroId === 8) {
            setListaFiltro(lstAviacionComercial)
            setOpcionesFiltro("formatoFecha")
            setValueFiltro("fecha")
            return
        }
        if (filtroId === 9) {
            setListaFiltro(lstAviacionGeneral)
            setOpcionesFiltro("formatoFecha")
            setValueFiltro("fecha")
            return
        }
        if (filtroId === 10) {
            setListaFiltro(lstAviacionCarga)
            setOpcionesFiltro("formatoFecha")
            setValueFiltro("fecha")
            return
        }
        if (filtroId === 11) {
            setListaFiltro(lstIngresos)
            setOpcionesFiltro("fecha")
            setValueFiltro("date")
            return
        }
        if (filtroId === 12) {
            setListaFiltro(lstEgresos)
            setOpcionesFiltro("fecha")
            setValueFiltro("date")
            return
        }
    }

    const verificarModal = (accion, titulo, idModal, btn) => {
        setHeaderEditar(`${accion} ${titulo}`)
        setBanderaBtn(btn)
        setModalId(idModal)
        if (idModal === 1) {
            setMostrarTasaUtil(true)
            return
        }
        if (idModal === 2 || idModal === 3 || idModal === 4) {
            setMostrarEditar(true)
            if (idModal === 2) {
                setBanderaLista(lstInfraestructura)
                setOpcionesId("idInfraestructura")
                return
            }
            if (idModal === 3) {
                setBanderaLista(lstInfoVuelos)
                setOpcionesId("idVuelos")
                return
            }
            if (idModal === 4) {
                setBanderaLista(lstAtencionPersonalizada)
                setOpcionesId("idServicio")
                return
            }
        }
        if (idModal === 5) {
            setMostrarEncuesta(true)
            setBanderaLista(lstEncuestaCalidad)
            setOpcionesId("idCalidad")
            return
        }
        if (idModal === 6 || idModal === 7 || idModal === 8) {
            setMostrarAviacion(true)
            if (idModal === 6) {
                setBanderaLista(lstAviacionComercial)
                setOpcionesId("id")
                return
            }
            if (idModal === 7) {
                setBanderaLista(lstAviacionGeneral)
                setOpcionesId("idGeneralPasajeros")
                return
            }
            if (idModal === 8) {
                setBanderaLista(lstAviacionCarga)
                setOpcionesId("idCarga")
                return
            }
        }
        if (idModal === 9) {
            setMostrarIngresos(true)
            setBanderaLista(lstIngresos)
            setOpcionesId("idIngresos")
            return
        }
        if (idModal === 10) {
            setMostrarEgresos(true)
            setBanderaLista(lstEgresos)
            setOpcionesId("idEgresos")
            return
        }

    }

    const onGuardarDatos = (data) => {
        if (data.porcentaje <= 100) {
            console.log(data)
            if (banderaBoton) {
                let body = {
                    valor: +data.porcentaje
                }
                if (modalId === 2) {
                    updateInfraestructura(body, data.idLst)
                    onClearValores()
                    return
                }
                if (modalId === 3) {
                    updateInfoVuelos(body, data.idLst)
                    onClearValores()
                    return
                }
                if (modalId === 4) {
                    updateAtencionPerso(body, data.idLst)
                    onClearValores()
                    return
                }
            } else {
                let body = {
                    fecha: XDate(data.fecha).toString("MMM yy"),
                    date: XDate(data.fecha).toString("yyyy-MM-01"),
                    valor: +data.porcentaje
                }
                if (modalId === 2) {
                    saveInfraestructura(body)
                    onClearValores()
                    return
                }
                if (modalId === 3) {
                    saveInfoVuelos(body)
                    onClearValores()
                    return
                }
                if (modalId === 4) {
                    saveAtencionPerso(body)
                    onClearValores()
                    return
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'El porcentaje no puede ser mayor a 100 %',
                target: '.p-dialog'
            })
        }
    }

    const onEditarlocalesComerciales = (data) => {
        console.log(data)
        let body = {
            arrendados: data.arrendados,
            disponibles: data.disponibles,
            empresas: data.empresas,
            enAdaptacion: data.enAdaptacion,
            existentes: data.existentes,
            operando: data.operando
        }
        updateLocalesComerciales(body, data.tipoGiro)
        setMostrarLocales(false)
        onClearValores()
        console.log("Actualizar Local", body, data.tipoGiro)
    }

    const onEditarlAerolineas = (data) => {
        console.log(data)
        let body = {
            fop: +data.fop,
            oper: +data.oper
        }
        console.log("Actualizar Local", body, data.tipoAerolinea)
        updateAerolinea(body, data.tipoAerolinea)
        setMostrarAerolineas(false)
        onClearValores()
    }

    const onCambiarIngresos = (data) => {
        console.log(data)
        if (banderaBoton) {
            let body = {
                participaciones: data.participaciones,
                ventaBienes: data.ventaBienes,
                ingresosFinancieros: data.ingresosFinancieros,
                otros: data.otros
            }
            console.log("actualziar", body, data.fechaIngresos)
            updateIngresos(body, data.fechaIngresos)
        } else {
            console.log("guardar")
            let body = {
                fecha: XDate(data.fecha).toString("MMM yy"),
                date: XDate(data.fecha).toString("yyyy-MM-01"),
                participaciones: data.participaciones,
                ventaBienes: data.ventaBienes,
                ingresosFinancieros: data.ingresosFinancieros,
                otros: data.otros
            }
            saveIngresos(body)
        }
        onClearValores()
    }

    const onCambiarEgresos = (data) => {
        console.log(data)
        if (banderaBoton) {
            let body = {
                estimaciones: data.estimaciones,
                materiales: data.materiales,
                serPersonales: data.personas,
                servGenerales: data.servGenerales,
                otros: data.otros
            }
            console.log("actualziar", body, data.fechaEgresos)
            updateEgresos(body, data.fechaEgresos)
        } else {
            console.log("guardar")
            let body = {
                fecha: XDate(data.fecha).toString("MMM yy"),
                date: XDate(data.fecha).toString("yyyy-MM-01"),
                estimaciones: data.estimaciones,
                materiales: data.materiales,
                serPersonales: data.personas,
                servGenerales: data.servGenerales,
                otros: data.otros
            }
            console.log("guardar", body)
            saveEgresos(body)
        }
        onClearValores()
    }

    const onCambiarEncuestaCalidad = (data) => {
        console.log(data)
        if (banderaBoton) {
            let body = {
                seguridad: data.seguridad,
                limpieza: data.limpieza,
                tiemDeEsper: data.tiemDeEsper,
                infoVuelos: data.infoVuelos,
                senializacion: data.senializacion,
                atencionCliente: data.atencionCliente,
                infraestructura: data.infraestructura,
                servComerciales: data.servComerciales,
                conectividadVial: data.conectividadVial,
                satisfaGral: data.satisfaGral
            }
            console.log("actualziar", body, data.fechaEgresos)
            updateEncuestaCalidad(body, data.fechaEgresos)
        } else {
            console.log("guardar")
            let body = {
                formatoFecha: XDate(data.fecha).toString("MMM yy"),
                fecha: XDate(data.fecha).toString("yyyy-MM-01"),
                seguridad: data.seguridad,
                limpieza: data.limpieza,
                tiemDeEsper: data.tiemDeEsper,
                infoVuelos: data.infoVuelos,
                senializacion: data.senializacion,
                atencionCliente: data.atencionCliente,
                infraestructura: data.infraestructura,
                servComerciales: data.servComerciales,
                conectividadVial: data.conectividadVial,
                satisfaGral: data.satisfaGral
            }
            console.log("guardar", body)
            saveEncuestaCalidad(body)
        }
        onClearValores()
    }

    const onCambiaAviacion = (data) => {
        console.log(data)
        if (banderaBoton) {
            let body = {
                valor: +data.valor
            }
            if (modalId === 6) {
                updateAviacionComercial(body, data.fechaEgresos)
                onClearValores()
                return
            }
            if (modalId === 7) {
                updateAviacionGeneral(body, data.fechaEgresos)
                onClearValores()
                return
            }
            if (modalId === 8) {
                let bodyCarga = {
                    carga: +data.valor
                }
                updateAviacionCarga(bodyCarga, data.fechaEgresos)
                onClearValores()
                return
            }
        } else {
            let body = {
                formatoFecha: XDate(data.fecha).toString("MMM yy"),
                fecha: XDate(data.fecha).toString("yyyy-MM-01"),
                valor: +data.valor
            }
            if (modalId === 6) {
                const fechaActualizar = new Date();
                let fechaUltima = {
                    formatoFecha: XDate(fechaActualizar).toString("d MMMM yyyy", { locale: 'es' }),
                    corte: XDate(fechaActualizar).toString(`${fechaActualizar.getDate() - 1} MMMM yyyy`, { locale: 'es' })
                }
                saveAviacionComercial(body)
                saveUltimaActualizacion(fechaUltima)
                onClearValores()
                return
            }
            if (modalId === 7) {
                saveAviacionGeneral(body)
                onClearValores()
                return
            }
            if (modalId === 8) {
                let bodyCarga = {
                    formatoFecha: XDate(data.fecha).toString("MMM yy"),
                    fecha: XDate(data.fecha).toString("yyyy-MM-01"),
                    carga: +data.valor
                }
                saveAviacionCarga(bodyCarga)
                onClearValores()
                return
            }
        }
    }

    const onCambiaOcupacion = (data) => {
        console.log(data)
        if (banderaBoton) {
            console.log("Actualiza")
            let bodyCarga = {
                cargaKg: +data.valorCarga
            }
            let bodyPasajeros = {
                numPasajeros: +data.valorUtilPasajero
            }
            updateOcupacionCarga(bodyCarga, data.fechaCarga)
            updateOcupacionPasajeros(bodyPasajeros, data.fechaPasajeros)
            onClearValores()
            return
        } else {
            console.log("guarda")
            let bodyCarga = {
                formatoFecha: XDate(data.fecha).toString("MMM yy"),
                fecha: XDate(data.fecha).toString("yyyy-MM-01"),
                cargaKg: +data.valorCarga,
                estimado: 470000000
            }

            let bodyPasajeros = {
                formatoFecha: XDate(data.fechautilPasajeros).toString("MMM yy"),
                fecha: XDate(data.fechautilPasajeros).toString("yyyy-MM-01"),
                numPasajeros: +data.valorUtilPasajero,
                estimado: 19500000
            }
            saveOcupacionCarga(bodyCarga)
            saveOcupacionPasajeros(bodyPasajeros)
            onClearValores()
            return

        }
    }

    const onClearValores = () => {
        setMostrarTasaUtil(false)
        setMostrarAerolineas(false);
        setMostrarLocales(false);
        setMostrarIngresos(false);
        setMostrarEgresos(false);
        setMostrarAviacion(false);
        setMostrarEncuesta(false);
        setMostrarFiltro(false);
        setHeaderFiltro("")
        setIdFiltro(0)
        setHeaderEditar("")
        setMostrarEditar(false);
        setBanderaBtn(false);
        setBanderaLista([]);
        setOpcionesId("")
        setModalId(0);
        setListaFiltro([]);
        setOpcionesFiltro("");
        setValueFiltro("");
    }

    return (
        <div className="h-full p-5 col-11 mx-auto ">
            {userInfo?.rol === 1 || userInfo?.rol === 3 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                    <h2 className="col-12 m-0">Departamento de Operaciones</h2>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Tasa de Utilización de la Capacidad Instalada</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Tasa de Utilización de la Capacidad Instalada", 1, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Tasa de Utilización de la Capacidad Instalada", 1, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Tasa de Utilización de la Capacidad Instalada", 3)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Infraestructura y Tecnología Aeropuertuaria</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Infraestructura y Tecnología Aeropuertuaria", 2, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Infraestructura y Tecnología Aeropuertuaria", 2, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Infraestructura y Tecnología Aeropuertuaria", 4)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Información de Vuelos Precisa y Oportuna</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Información de Vuelos Precisa y Oportuna", 3, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Información de Vuelos Precisa y Oportuna", 3, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right"
                                onClick={() => verificarFiltro(true, "Información de Vuelos Precisa y Oportuna", 5)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Atención Personalizada en un Entorno Seguro y con Calidad en el Servicio</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Atención Personalizada en un Entorno Seguro y con Calidad en el Servicio", 4, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Atención Personalizada en un Entorno Seguro y con Calidad en el Servicio", 4, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Atención Personalizada en un Entorno Seguro y con Calidad en el Servicio", 6)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Encuesta de Satisfacción</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Encuesta de Satisfacción", 5, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Encuesta de Satisfacción", 5, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Encuesta de Satisfacción", 7)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Aviación Comercial Pasajeros</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Aviación Comercial Pasajeros", 6, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Aviación Comercial Pasajeros", 6, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Aviación Comercial Pasajeros", 8)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Aviación General Pasajeros</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Aviación General Pasajeros", 7, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Aviación General Pasajeros", 7, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Aviación General Pasajeros", 9)} />
                        </div>
                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Aviación de Carga Kg</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Aviación de Carga Kg", 8, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Aviación de Carga Kg", 8, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Aviación de Carga Kg", 10)} />
                        </div>
                    </div>
                </div>
            ) : null}
            {userInfo?.rol === 1 || userInfo?.rol === 4 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                    <h2 className="col-12 m-0">Departamento de Finanzas</h2>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Ingresos</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Ingresos", 9, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Ingresos", 9, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Ingresos", 11)} />
                        </div>
                    </div>

                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Egresos</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Nuevo" severity="danger" icon="pi pi-plus" iconPos="right" onClick={() => verificarModal("Agregar", "Egresos", 10, false)} />
                            <Button label="Actualizar" severity="warning" icon="pi pi-refresh" iconPos="right" onClick={() => verificarModal("Actualizar", "Egresos", 10, true)} />
                            <Button label="Filtro" severity="success" icon="pi pi-filter" iconPos="right" onClick={() => verificarFiltro(true, "Egresos", 12)} />
                        </div>
                    </div>
                </div>
            ) : null}
            {userInfo?.rol === 1 || userInfo?.rol === 5 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                    <h2 className="col-12 m-0">Departamento de Planeación Estrategica</h2>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Aerolíneas</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Actualizar" severity="danger" icon="pi pi-refresh" iconPos="right" onClick={() => setMostrarAerolineas(true)} />

                        </div>

                    </div>
                    <div className="p-card lg:col-2 md:col-3 sm:col-4 col-12 text-center">
                        <h3>Locales Comerciales</h3>
                        <div className="gap-2 flex flex-wrap justify-content-center">
                            <Button label="Actualizar" severity="danger" icon="pi pi-refresh" iconPos="right" onClick={() => setMostrarLocales(true)} />
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
                                <FormDropdown
                                    name="fechaInicio"
                                    label="Fecha Inicio*"
                                    className="w-full"
                                    options={listaFiltro || []}
                                    optionLabel={opcionesFiltro}
                                    optionValue={valueFiltro}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo fecha inicio es requerido",
                                        },
                                    }}
                                />
                            </div>
                            {idFiltro === 8 || idFiltro === 9 || idFiltro === 10 || idFiltro === 3 ? (
                                <div className="col-12 sm:col-4 md:col-4 lg:col-4 xl:col-4">
                                    <FormDropdown
                                        name="fechaFin"
                                        label="Fecha Final*"
                                        className="w-full"
                                        options={listaFiltro || []}
                                        optionLabel={opcionesFiltro}
                                        optionValue={valueFiltro}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha final es requerido",
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

            <Dialog header={headerEditar} visible={mostrarEditar} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => onClearValores()}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="TacometroForm" onSubmit={methods.handleSubmit(onGuardarDatos)} >
                            <div className="">
                                <FormInputText
                                    name="porcentaje"
                                    label="Porcentaje*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo porcentaje es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">

                                {banderaBoton ? (
                                    <FormDropdown
                                        name="idLst"
                                        label="Fecha"
                                        options={banderaLista || []}
                                        className='w-full'
                                        optionLabel="fecha"
                                        optionValue={opcionesId}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fecha"
                                        label="Fecha*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                )}

                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={banderaBoton ? "Actualizar" : "Guardar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header="Actualizar Locales Comerciales" visible={mostrarLocales} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarLocales(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="LocalesForm" onSubmit={methods.handleSubmit(onEditarlocalesComerciales)} >
                            <div className="">
                                <FormDropdown
                                    name="tipoGiro"
                                    label="Giro"
                                    options={lstlocalesComerciales || []}
                                    className='w-full'
                                    optionLabel="giros"
                                    optionValue="idLocales"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo giro es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="existentes"
                                    label="Existentes*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo existentes es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="arrendados"
                                    label="Arrendados*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo arrendados es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="operando"
                                    label="Operando*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo operando es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="enAdaptacion"
                                    label="En Adaptación*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo en adaptación es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="disponibles"
                                    label="Disponibles*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo disponibles es requerido",
                                        },
                                    }}
                                />
                            </div><div className="mb-4">
                                <FormInputText
                                    name="empresas"
                                    label="Empresas*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo empresas es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={"Actualizar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header="Actualizar Aerolíneas" visible={mostrarAerolineas} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarAerolineas(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="AerolineasForm" onSubmit={methods.handleSubmit(onEditarlAerolineas)} >
                            <div className="">
                                <FormDropdown
                                    name="tipoAerolinea"
                                    label="Aerolínea"
                                    options={lstAerolinea || []}
                                    className='w-full'
                                    optionLabel="aerolinea"
                                    optionValue="idAerolineas"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo aerolínea es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="fop"
                                    label="Factor de Ocupación Promedio(FOP)*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo fop es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <FormInputText
                                    name="oper"
                                    label="Operaciones(OPER)*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo oper es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={"Actualizar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header={headerEditar} visible={mostrarIngresos} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarIngresos(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="IngresosForm" onSubmit={methods.handleSubmit(onCambiarIngresos)} >
                            <div className="">
                                {banderaBoton ? (
                                    <FormDropdown
                                        name="fechaIngresos"
                                        label="Fecha"
                                        options={banderaLista || []}
                                        className='w-full'
                                        optionLabel="fecha"
                                        optionValue={opcionesId}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fecha"
                                        label="Fecha*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="participaciones"
                                    label="Participaciones*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo participaciones es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="ventaBienes"
                                    label="Venta de Bienes*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo venta de bienes es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="ingresosFinancieros"
                                    label="Ingresos Financieros*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo ingresos financieros es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <FormInputText
                                    name="otros"
                                    label="Otros*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo otros es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={banderaBoton ? "Actualizar" : "Guardar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header={headerEditar} visible={mostrarEgresos} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarEgresos(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="EgresosForm" onSubmit={methods.handleSubmit(onCambiarEgresos)} >
                            <div className="">
                                {banderaBoton ? (
                                    <FormDropdown
                                        name="fechaEgresos"
                                        label="Fecha"
                                        options={banderaLista || []}
                                        className='w-full'
                                        optionLabel="fecha"
                                        optionValue={opcionesId}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fecha"
                                        label="Fecha*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="servGenerales"
                                    label="Servicios Generales*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo servicios generales es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="personas"
                                    label="Servicios Personales*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo servicios personales es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="materiales"
                                    label="Materiales*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo materiales es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="estimaciones"
                                    label="Estimaciones*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo estimaciones es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="otros"
                                    label="Otros*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo otros es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={banderaBoton ? "Actualizar" : "Guardar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header={headerEditar} visible={mostrarEncuesta} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarEncuesta(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="EncuestaForm" onSubmit={methods.handleSubmit(onCambiarEncuestaCalidad)} >
                            <div className="">
                                {banderaBoton ? (
                                    <FormDropdown
                                        name="fechaEgresos"
                                        label="Fecha"
                                        options={banderaLista || []}
                                        className='w-full'
                                        optionLabel="formatoFecha"
                                        optionValue={opcionesId}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fecha"
                                        label="Fecha*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="seguridad"
                                    label="Seguridad*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo seguridad es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="limpieza"
                                    label="Limpieza*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo limpieza es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="tiemDeEsper"
                                    label="Tiempo de Espera*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo tiempo de espera es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="infoVuelos"
                                    label="Información de Vuelos*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo información de vuelos es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="senializacion"
                                    label="Señalización*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo señalización es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="atencionCliente"
                                    label="Atención al Cliente*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo atención al cliente es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="infraestructura"
                                    label="Infraestructura*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo infraestructura es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <FormInputText
                                    name="servComerciales"
                                    label="Servicios Comerciales*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo servicios comerciales es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="conectividadVial"
                                    label="Conectividad Vial*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo conectividad vial es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <FormInputText
                                    name="satisfaGral"
                                    label="Satisfacción General*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo satisfacción general es requerido",
                                        },
                                    }}
                                />
                            </div>
                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={banderaBoton ? "Actualizar" : "Guardar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header={headerEditar} visible={mostrarAviacion} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarAviacion(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="AviacionForm" onSubmit={methods.handleSubmit(onCambiaAviacion)} >
                            <div className="">
                                {banderaBoton ? (
                                    <FormDropdown
                                        name="fechaEgresos"
                                        label="Fecha"
                                        options={banderaLista || []}
                                        className='w-full'
                                        optionLabel="formatoFecha"
                                        optionValue={opcionesId}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fecha"
                                        label="Fecha*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha es requerido",
                                            },
                                        }}
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="valor"
                                    label="Valor*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo valor es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={banderaBoton ? "Actualizar" : "Guardar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>

            <Dialog header={headerEditar} visible={mostrarTasaUtil} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" onHide={() => setMostrarTasaUtil(false)}>
                <FormProvider {...methods}>
                    <div className=" mt-4">
                        <form id="TasaForm" onSubmit={methods.handleSubmit(onCambiaOcupacion)} >
                            <div className="">
                                {banderaBoton ? (
                                    <FormDropdown
                                        name="fechaCarga"
                                        label="Fecha de Carga"
                                        options={ocupacionCarga || []}
                                        className='w-full'
                                        optionLabel="formatoFecha"
                                        optionValue="idOcupacion"

                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha de carga es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fecha"
                                        label="Fecha de Carga*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha de carga es requerido",
                                            },
                                        }}
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="valorCarga"
                                    label="Valor de Carga*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo valor de carga es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                {banderaBoton ? (
                                    <FormDropdown
                                        name="fechaPasajeros"
                                        label="Fecha de Pasajeros"
                                        options={ocupacionPasajeros || []}
                                        className='w-full'
                                        optionLabel="formatoFecha"
                                        optionValue="idOcupacion"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha de pasajeros es requerido",
                                            },
                                        }}
                                    />
                                ) : (
                                    <FormCalendar
                                        name="fechautilPasajeros"
                                        label="Fecha de Pasajeros*"
                                        yearRange="2022:2030"
                                        className="w-full"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "El campo fecha de pasajeros es requerido",
                                            },
                                        }}
                                    />
                                )}
                            </div>
                            <div className="my-4">
                                <FormInputText
                                    name="valorUtilPasajero"
                                    label="Valor Pasajero*"
                                    keyfilter="int"
                                    className="w-full"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "El campo valor de pasajero es requerido",
                                        },
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    type="submit"
                                    icon="pi pi-save"
                                    iconPos="right"
                                    label={banderaBoton ? "Actualizar" : "Guardar"}
                                    className=""
                                />
                            </div>

                        </form>
                    </div>
                </FormProvider>
            </Dialog>
        </div>
    )
}
