import { createBrowserRouter, Navigate } from "react-router-dom";
//import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./defaulLayout/defaultLayout";
import GuestLayout from "./guestLayout/guestLayout";
import { Login } from "./Login/login";
import { NotFound } from "./notFound/notfound";
import { Signup } from "./signup/signup";
import { Users } from "./users/users";
import { UserForm } from "./users/userForm";
import { GraficasCanvas } from "./graficos/graficos"
import { Editar } from "./editar/editar";
import { useAuthStore } from "../redux/hooks/useAuthStore";



const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <GraficasCanvas />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/editar',
                element: <Editar />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;
