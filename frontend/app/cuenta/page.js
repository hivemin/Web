"use client"

import Navbar from "@/components/navbar";
import {get_usuarios_client} from "@/utils/utils";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function HomeCuenta({params}) {
    const
        [usuarios, set_usuarios] = useState([]),
        [email, set_email] = useState(localStorage.getItem('email')),
        [ciudad, set_ciudad] = useState(""),
        [publicidad, set_publicidad] = useState(true),
        [password, set_password] = useState(""),
        [tipo_cuenta, set_tipo_cuenta] = useState(""),
        alerta = useRef(),
        eliminado = useRef(),
        eliminado2 = useRef(),
        router = useRouter()

    useEffect(() => {
        if (email) get_usuarios_client(set_usuarios, undefined, email)
    }, []);

    const actualizar = (e) => {
        e.preventDefault()

        const datos = {
            email: email ? email : usuarios[0].email,
            ciudad: ciudad ? ciudad : usuarios[0].ciudad,
            publicidad: publicidad,
            password: password ? password : usuarios[0].password,
            tipo: tipo_cuenta ? tipo_cuenta : usuarios[0].tipo
        }

        fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(datos)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    alerta.current.classList.remove("d-none")
                    setTimeout(() => {
                        alerta.current.classList.add("d-none")
                    }, 3000)
                }
            })
    }

    const eliminar = () => {
        const datos = {
            email: usuarios[0].email
        }

        eliminado.current.classList.add("d-none")
        eliminado2.current.classList.remove("d-none")

        setTimeout(() => {
            fetch("/api/users", {
                method: "DELETE",
                body: JSON.stringify(datos)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        localStorage.removeItem('email')
                        localStorage.removeItem('tipo')
                        router.push("/")
                    }
                })
        }, 2000)
    }

    if (usuarios.length > 0) {
        const usuario = usuarios[0]

        if (email !== usuario.email) return (
            <div className="text-center">
                <h1>No tienes permisos para editar este usuario</h1>
                <Link href="/">Volver</Link>
            </div>
        )

        return (
            <main className="container">
                <Navbar/>

                <div className="d-none position-fixed top-0 end-0 mt-3 me-3 z-3 bg-success border border-black border-1 rounded p-3" ref={alerta}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <span className="ms-2">Usuario actualizado correctamente</span>
                </div>

                <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar usuario {params.cif}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Si eliminas tu cuenta no podrás recuperarla. ¿Estás seguro?
                            </div>
                            <div className="modal-footer">
                                <button onClick={eliminar} type="button" data-bs-dismiss="modal" className="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-none text-center" ref={eliminado2}>
                    <h1 className="display-1">Eliminando usuario {email}...</h1>
                </div>

                <div className="" ref={eliminado}>
                    <h1 className="text-center">Usuario {email}</h1>

                    <form onSubmit={actualizar} className='text-end'>
                        <div className="input-group mb-3">
                            <div className="form-floating">
                                <input readOnly required type="text" className="form-control" id="email" placeholder="12345678F" onChange={
                                    (e) => {
                                        set_email(e.target.value)
                                    }
                                } defaultValue={usuario.email}/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-floating">
                                <select
                                    onChange={(e) => {
                                        set_tipo_cuenta(e.target.value)
                                    }}
                                    className="form-select"
                                    id="tipo"
                                >
                                    <option defaultValue={usuario.tipo} hidden>{usuario.tipo === 'admin' ? 'Administrador' : 'Usuario'}</option>
                                    <option value="user">Usuario</option>
                                    <option value="admin">Administrador</option>
                                </select>
                                <label htmlFor="tipo">Selecciona tipo de usuario</label>
                            </div>
                        </div>

                        <div className="form-floating">
                            <input required type="text" className="form-control" id="ciudad" placeholder="Madrid" onChange={
                                (e) => {
                                    set_ciudad(e.target.value)
                                }
                            } defaultValue={usuario.ciudad}/>
                            <label htmlFor="ciudad">Ciudad</label>
                        </div>

                        <div className="form-check form-switch text-start">
                            <input className="form-check-input" type="checkbox" role="switch" id="permisos" defaultChecked={usuario.publicidad}
                                   onChange={() => {
                                       set_publicidad(!publicidad)
                                   }}></input>
                            <label className="form-check-label" htmlFor="permisos">Permitir que los comercios te manden ofertas</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input required type="password" className="form-control" id="password" placeholder="12345" onChange={
                                (e) => {
                                    set_password(e.target.value)
                                }
                            } defaultValue={usuario.password}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary me-1">Guardar</button>
                        <button data-bs-toggle="modal" data-bs-target="#modal" type="button" className="btn btn-danger ms-1">Eliminar</button>
                    </form>
                </div>
            </main>
        )
    }

    return (
        <div className="text-center">
            <h1>No existe el usuario</h1>
            <Link href="/">Volver</Link>
        </div>
    )
}
