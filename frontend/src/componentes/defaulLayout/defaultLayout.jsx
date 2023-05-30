import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { Menubar } from 'primereact/menubar';
import "../../App.css"
import { useSelector } from "react-redux";
import { useAuthStore } from "../../redux/hooks/useAuthStore";
import { Loading } from '../loaderUi/loader';
import { useLoadingStore } from "../../redux/hooks/useLoadingStore";
import { useListasStore } from "../../redux/hooks/useListasStore"
const DefaultLayout = () => {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const { userInfo } = useSelector(state => state.user)
    const { startLogin, onStartLogout } = useAuthStore();
    const { loading } = useLoadingStore();
    const {
        ultimaActualizacion,
        startUltimaActualizacion
    } = useListasStore();
    useEffect(() => {
        startLogin();
        startUltimaActualizacion();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = () => {
        //ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                onStartLogout(null)
                localStorage.removeItem('AuthUser');
                window.location.reload()
            })

    }

    /* useEffect(() => {
         axiosClient.get('/user')
             .then(({ data }) => {
                 setUser(data)
             })
     }, [])*/

    const items = [
        {
            label: 'Panel',
            icon: 'pi pi-fw pi-chart-bar',
            url: "/dashboard"
        },
        {
            label: 'Editar',
            icon: 'pi pi-fw pi-pencil',
            url: "/editar",
            visible: userInfo?.rol != 2 || userInfo?.rol === 1 ? true : false
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            url: "/users",
            visible: userInfo?.rol != 1 ? false : true
        },
        {
            label: 'Salir',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                onLogout()
            },
        }
    ];

    const start = <img alt="logo" src="https://aifa.aero/lib/img/logo.svg" height="60" className="mr-2"></img>;
    const end =
        <div className="">
            Bienvenido {userInfo?.name}
            <div>Actualización: {ultimaActualizacion?.formatoFecha}</div>
            <div>Corte: {ultimaActualizacion?.corte}</div>
        </div>
    return (
        <div id="defaultLayout" className="overflow-x-hidden deafult-color">

            {loading ? (
                <Loading />
            ) : null}
            {/*<aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>*/}
            <div className="content">
                <header>
                    <Menubar model={items} start={start} end={end} className="degradado text-200" />
                    {/*<div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                        </div>
                    */}
                </header>
                <main>
                    <Outlet />
                </main>
                {notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div>
        </div>
    )
}

export default DefaultLayout;