"use client"

import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const
        [logeado, set_logeado] = useState(null),
        [logeado_comercio, set_logeado_comercio] = useState(null),
        [admin, set_admin] = useState(false),
        alerta = useRef(),
        router = useRouter();

    useEffect(() => {
        // Este código solo se ejecutará en el cliente
        const email = localStorage.getItem("email");
        const cif = localStorage.getItem("cif");
        const tipo = localStorage.getItem("tipo");

        set_logeado(email);
        set_logeado_comercio(cif);
        set_admin(tipo === "admin");

        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const logout = () => {
        if (logeado) {
            localStorage.removeItem("email");
            localStorage.removeItem("tipo");
        }
        if (logeado_comercio) localStorage.removeItem("cif");

        if (alerta.current) {
            alerta.current.classList.remove("d-none");
        }

        set_logeado(null);
        set_logeado_comercio(null);
        router.push("/");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary z-3 mb-4">
            <div className="d-none position-fixed top-0 end-0 mt-3 me-3 z-3 bg-success border border-black border-1 rounded p-3" ref={alerta}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <span className="ms-2">Sesión cerrada correctamente</span>
            </div>

            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <Image src="/logo.png" alt="logo" width={50} height={50}/>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className={logeado || logeado_comercio ? "d-none" : "navbar-nav me-auto mb-2 mb-lg-0"}>
                        <li className="nav-item">
                            <Link className="nav-link" href="/login">Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/signup">Signup</Link>
                        </li>
                    </ul>

                    <ul className={logeado && !admin ? "navbar-nav me-auto mb-2 mb-lg-0" : "d-none"}>
                        <li className="nav-item">
                            <Link href="/cuenta" className="nav-link">Cuenta: {logeado}</Link>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" onClick={logout}>Logout</button>
                        </li>
                    </ul>

                    <ul className={logeado && admin ? "navbar-nav me-auto mb-2 mb-lg-0" : "d-none"}>
                        <li className="nav-item">
                            <Link className="nav-link" href="/admin">Administración</Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/cuenta" className="nav-link">Cuenta: {logeado}</Link>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" onClick={logout}>Logout</button>
                        </li>
                    </ul>

                    <ul className={logeado_comercio ? "navbar-nav me-auto mb-2 mb-lg-0" : "d-none"}>
                        <li className="nav-item">
                            <Link className="nav-link" href={`/comercio/${logeado_comercio}`}>Ver comercio</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href={`/comercio/${logeado_comercio}/logged`}>Editar comercio</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href={`/comercio/${logeado_comercio}/clientes`}>Ver clientes</Link>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link">Comercio: {logeado_comercio}</button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
