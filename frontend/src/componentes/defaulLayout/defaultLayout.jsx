import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { Menubar } from 'primereact/menubar';
import "../../App.css"

const DefaultLayout = () => {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = () => {
        //ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
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
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            url: "/users"
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
    const end = <div className="text-center">Bienvenido {user.name}</div>
    return (
        <div id="defaultLayout" className="overflow-x-hidden">
            {/*<aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>*/}
            <div className="content">
                <header>
                    <Menubar model={items} start={start} end={end} className="degradado text-200"/>
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