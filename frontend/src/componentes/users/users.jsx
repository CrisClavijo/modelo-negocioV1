import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLoadingStore } from "../../redux/hooks/useLoadingStore";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()
    const { userInfo } = useSelector(state => state.user)
    const { startLoading } = useLoadingStore();

    useEffect(() => {
        if (userInfo?.rol === 1) {
            startLoading(true)
            getUsers();
        }
        
    }, [userInfo])

    

    
    const onDeleteClick = user => {
        Swal.fire({
            title: '¡Advertencia!',
            text: "¿Esta seguro de eliminar este usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/users/${user.id}`)
                    .then(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Usuario eliminado con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getUsers()
                    })
            }
        })

    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
                startLoading(false)
            })
            .catch(() => {
                setLoading(false)
                startLoading(false)
            })
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Usuarios</span>
            {userInfo?.rol === 1 && (<Link className="btn-add" to="/users/new"><Button label="Agregar Usuario" severity="success" /></Link>)}
        </div>
    );

    const actionBodyTemplate = (data) => {
        return (
            <div>
                {userInfo?.rol === 1 && (<Button icon="pi pi-trash" rounded outlined severity="danger" onClick={ev => onDeleteClick(data)} />)}
            </div>
        );
    };
    const numeroFila = (rowData, props) => {
        return props.rowIndex + 1;
    };

    return (
        <div>
            <div className="px-5">
                <DataTable value={users} header={header} tableStyle={{ minWidth: '60rem' }}>
                    <Column body={numeroFila} header="No."></Column>
                    <Column header="Nombre" field="name"></Column>
                    <Column field="email" header="Correo" ></Column>
                    <Column field="created_at" header="Fecha de Registro"></Column>
                    <Column body={actionBodyTemplate} ></Column>
                </DataTable>
            </div>
        </div>
    )
}
