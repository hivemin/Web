"use client"

import Navbar from "@/components/navbar";
import {get_comercio_client, get_usuarios_client} from "@/utils/utils";
import Link from "next/link";
import {useEffect, useState} from "react";
import Usuario from "@/components/usuario";

export default function HomeComercioLogged({params}) {
    const
        [comercios, set_comercios] = useState([]),
        [usuarios, set_usuarios] = useState([])

    useEffect(() => {
        get_comercio_client(set_comercios, undefined, params.cif)
        get_usuarios_client(set_usuarios)
    }, []);

    if (comercios.length > 0 && usuarios.length > 0) {
        const comercio = comercios[0]

        return (
            <main className="container">
                <Navbar/>

                <h1 className="text-center display-5">Clientes de {comercio.titulo}</h1>
                <ul className="list-group">
                    {
                        usuarios
                            .filter((usuario) => (
                                usuario.ciudad.toLowerCase() === comercio.ciudad.toLowerCase()
                                && usuario.publicidad
                            ))
                            .map((usuario) => (
                                <Usuario usuario={usuario}/>
                            ))
                    }
                </ul>
            </main>
        )
    }

    return (
        <div className="text-center">
            <h1>No hay clientes</h1>
            <Link href="/">Volver</Link>
        </div>
    )
}
