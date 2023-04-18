import React, { useState } from "react";
import { Button } from 'primereact/button';
import { FormProvider, useForm } from "react-hook-form";
import '../../App.css';
import { FormInputText } from "../customComponente/formInputText";
import { FormInputTextPassword } from "../customComponente/formInputTextPasword"
import {createRef} from "react";

import {Link} from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from "../context/contextProvider";

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export const Login = () => {
    /*const methods = useForm();

    const [password, setPassword] = useState('');
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };*/



    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [message, setMessage] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message)
                }
            })
    }

    return (
        <div className=" w-screen h-screen flex flex-wrap justify-content-center">
            <div className="col-12 fixed">
                <div className="logo-letras mx-auto" />
            </div>
            <div className="col-7 my-auto ocultar-logos">
                <div className="logo-aifa mx-auto" />
                <div className="letras-aifa mx-auto" />
            </div>
            <div className="borde-division my-auto ocultar-logos"></div>
            <div className="lg:col-4 sm:col-8 col-11 justify-content-center my-auto">
                <div className="">
                    <h1 className="col-12 m-0" style={{ color: "#b43c3c" }}>
                        Modelo de negocio
                    </h1>
                    <h2 className="col-12">
                        Iniciar Sesion
                    </h2>
                    <form onSubmit={onSubmit}>
                        {/*<FormProvider {...methods}>*/}
                            <div className=" p-fluid grid pt-5 flex flex-wrap p-4">
                                <div className="mt-2 col-12">
                                    <InputText ref={emailRef} name="usuario" placeholder="Usuario" className="w-full" />
                                </div>
                                <div className="mt-2 col-12">
                                    <InputText ref={passwordRef} toggleMask /*handleChangePassword={handleChangePassword}*/ />
                                </div>
                                <div className="lg:col-5 col-12 mx-auto mt-2">
                                    <Button label="Iniciar sesion" severity="success" />
                                </div>
                            </div>
                        {/*</FormProvider>*/}
                    </form>
                </div>
            </div>

        </div>
    )
}