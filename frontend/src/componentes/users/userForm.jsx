import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/contextProvider";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


export const UserForm = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        rol: null
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()
    const roles = [
        { tipo: 'Administrador', code: 1 },
        { tipo: 'Editor', code: 2 },
        { tipo: 'Solo vista', code: 3 }
    ];

    useEffect(() => {
        if (id) {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }, [])


    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            let userPrepare = {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                password_confirmation: user.password_confirmation,
                rol: user?.rol?.code
            }
            console.log(userPrepare)
            axiosClient.post('/users', userPrepare)
                .then(() => {
                    setNotification('User was successfully created')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {user.id && <h1>Editar usuario: {user.name}</h1>}
            {!user.id && <h1>Nuevo usuario</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert col-5 mx-auto">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <div className="col-10 flex flex-wrap p-fluid mx-auto justify-content-center">
                        <form onSubmit={onSubmit} className="card">
                            <InputText value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Nombre" />
                            <InputText value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Correo" className="my-4" />
                            <InputText type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Contraseña" />
                            <InputText type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Confirmar contraseña" className="my-4" />
                            <Dropdown value={user.rol} onChange={ev => setUser({ ...user, rol: ev.target.value })} options={roles} optionLabel="tipo"
                                placeholder="Selecciona un rol"/>
                            <div className="col-4 mx-auto">
                                <Button label="Guardar" severity="success" rounded />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
