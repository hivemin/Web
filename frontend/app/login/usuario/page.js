"use client"

import {useRef, useState} from "react"
import Volver from "@/components/volver";
import {useRouter} from "next/navigation";

export default function HomeLoginUsuario() {
    const
        router = useRouter(),
        [email, set_email] = useState(""),
        [password, set_password] = useState(""),
        alerta = useRef()


    const redirigir = (data) => {
        // console.log("Code", data.status)
        if (data.status === 200) {
            // Aqui se guardara el JWT en vez del email
            localStorage.setItem("email", data.email)
            localStorage.setItem("tipo", data.tipo)
            router.push("/")
        } else {
            alerta.current.classList.remove("d-none")
            setTimeout(() => {
                alerta.current.classList.add("d-none")
            }, 5000)
        }
    }
    const login = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }

        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                //Authorization: `Bearer ${tokenJWT}`
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => redirigir(data))
    }

    return (
        <main className="container text-end">
            <Volver/>

            <div className="d-none position-fixed top-0 end-0 mt-3 me-3 z-3 bg-danger border border-black border-1 rounded p-3" ref={alerta}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <span className="ms-2">Contraseña o email incorrectos</span>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="display-5 border-bottom border-primary mb-4 px-3">Bienvenido a tu cuenta!</h1>

                <form onSubmit={login}>
                    <div className="form-floating mb-3">
                        <input required type="text" className="form-control" id="email" placeholder="12345678F" onChange={
                            (e) => {
                                set_email(e.target.value)
                            }
                        }/>
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input required type="password" className="form-control" id="password" placeholder="12345" onChange={
                            (e) => {
                                set_password(e.target.value)
                            }
                        }/>
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-primary w-25" type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}
