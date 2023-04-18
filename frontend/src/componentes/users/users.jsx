import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Usuarios</span>
            <Link className="btn-add" to="/users/new"><Button label="Agregar usuario" severity="success" /></Link>
        </div>
    );

    const actionBodyTemplate = (data) => {
        return (
            <div>
                <Link className="btn-edit" to={'/users/' + data.id}><Button icon="pi pi-pencil" rounded outlined className="mr-2" /></Link>

                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={ev => onDeleteClick(data)} />
            </div>
        );
    };

    return (
        <div>
            <div className="">
                <DataTable value={users} header={header} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="id" header="No."></Column>
                    <Column header="Nombre" field="name"></Column>
                    <Column field="email" header="Correo" ></Column>
                    <Column field="created_at" header="Fecha de registro"></Column>
                    <Column body={actionBodyTemplate} ></Column>
                </DataTable>
            </div>
        </div>
    )
}
