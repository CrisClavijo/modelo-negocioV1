import React, { useState } from "react";
import { Button } from 'primereact/button';
import { FormProvider, useForm } from "react-hook-form";
import '../../App.css';
import { FormInputText } from "../customComponente/formInputText";
import { FormInputTextPassword } from "../customComponente/formInputTextPasword"

export const Login = () => {
    const methods = useForm();

    const [password, setPassword] = useState('');
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };


    const onSubmit = (data) => {
        console.log(data, password)
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
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormProvider {...methods}>
                            <div className=" p-fluid grid pt-5 flex flex-wrap p-4">
                                <div className="mt-2 col-12">
                                    <FormInputText name="usuario" label="Usuario" className="w-full" />
                                </div>
                                <div className="mt-2 col-12">
                                    <FormInputTextPassword handleChangePassword={handleChangePassword} />
                                </div>
                                <div className="lg:col-5 col-12 mx-auto mt-2">
                                    <Button label="Iniciar sesion" severity="success" />
                                </div>
                            </div>
                        </FormProvider>
                    </form>
                </div>
            </div>

        </div>
    )
}