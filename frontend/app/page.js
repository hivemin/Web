"use client"

import Navbar from "@/components/navbar";
import Comercio from "@/components/comercio";
import FiltroComercios from "@/components/filtro";
import {useEffect, useState} from "react";
import {get_comercio_client} from "@/utils/utils";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
    const
        [comercios, set_comercios] = useState([]),
        [comercios_filtrados, set_comercios_filtrados] = useState([])

    useEffect(() => {
        get_comercio_client(set_comercios, set_comercios_filtrados)
    }, [])

    return (
        <main className="container text-center">
            <Navbar/>

            <FiltroComercios comercios={comercios} set_comercios_filtrados={set_comercios_filtrados}/>

            <h1 className={comercios_filtrados.length > 0 ? "d-none" : "text-center"}>
                No existen comercios...
            </h1>

            <ul className={comercios_filtrados.length > 0 ? "list-group" : "d-none"}>
                {
                    comercios_filtrados.map((comercio) => (
                        <Comercio comercio={comercio}/>
                    ))
                }
            </ul>

        </main>
    )
}
