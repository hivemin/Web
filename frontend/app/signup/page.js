"use client"

import {useRef, useState} from "react"
import Volver from "@/components/volver";
import {useRouter} from "next/navigation";

export default function HomeSignup() {
    const
        [email, set_email] = useState(""),
        [ciudad, set_ciudad] = useState(""),
        [publicidad, set_publicidad] = useState(true),
        [password, set_password] = useState(""),
        [tipo_cuenta, set_tipo_cuenta] = useState("user"),
        alerta = useRef(),
        alerta2 = useRef(),
        router = useRouter()

    const signup = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            ciudad: ciudad,
            publicidad: publicidad,
            password: password,
            tipo: tipo_cuenta
        }

        fetch("/api/signup", {
            method: "POST",
            headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    alerta.current.classList.remove("d-none")
                    setTimeout(() => {
                        alerta.current.classList.add("d-none")
                        router.push("/login/usuario")
                    }, 3000)
                } else {
                    alerta2.current.classList.remove("d-none")
                    setTimeout(() => {
                        router.refresh()
                    }, 3000)
                }
            })
    }

    return (
        <main className="container">
            <Volver/>

            <div className="d-none position-fixed top-0 end-0 mt-3 me-3 z-3 bg-success border border-black border-1 rounded p-3" ref={alerta}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <span className="ms-2">Usuario creado correctamente. Redirigiendote en 3 secs.</span>
            </div>

            <div className="d-none position-fixed top-0 end-0 mt-3 me-3 z-3 bg-danger border border-black border-1 rounded p-3" ref={alerta2}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <span className="ms-2">Error al crear usuario</span>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="display-5 border-bottom border-primary mb-4 px-3">Crear una cuenta!</h1>

                <form onSubmit={signup} className='text-end'>
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <input required type="text" className="form-control" id="email" placeholder="12345678F" onChange={
                                (e) => {
                                    set_email(e.target.value)
                                }
                            }/>
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
                                <option defaultValue="user" hidden>Usuario</option>
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
                        }/>
                        <label htmlFor="ciudad">Ciudad</label>
                    </div>

                    <div className="form-check form-switch text-start">
                        <input className="form-check-input" type="checkbox" role="switch" id="permisos" defaultChecked
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
                        }/>
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-primary w-25" type="submit">Signup
                    </button>
                </form>
            </div>
        </main>
    );
}
