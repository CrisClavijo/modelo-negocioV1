import React from "react";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const FormInputTextPassword = ({ handleChangePassword }) => {
    const [type, setType] = useState(false);
    const handleClickShowPassword = () => {
        setType(!type);
    };

    return (
        <span className="p-input-icon-left p-input-icon-right w-full">
            <i className="pi pi-unlock" />
            <InputText
                type="password"
                className="w-full"
                placeholder="Contraseña"
                onChange={handleChangePassword}
            />
            {type ? (
                <i
                    className="pi pi-eye cursor-pointer"
                    onClick={handleClickShowPassword}
                />
            ) : (
                <i
                    className="pi pi-eye-slash cursor-pointer"
                    onClick={handleClickShowPassword}
                />
            )}
        </span>
    );
};