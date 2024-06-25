'use client'

import Link from "next/link";
import Navbar from "@/components/navbar";

export default function HomeAdmin() {
    if (localStorage.getItem("tipo") === "admin")
        return (
            <div className="container">
                <Navbar/>

                <div className='text-center'>
                    <h1>Administración</h1>
                    <Link href="/admin/crear" className="btn btn-primary me-1">Crear comercio</Link>
                    <Link href="/" className="btn btn-primary ms-1">Editar comercios</Link>
                </div>
            </div>
        )

    return (
        <div className="text-center">
            <h1>No eres administrador</h1>
            <Link href="/">Volver</Link>
        </div>
    )
}
