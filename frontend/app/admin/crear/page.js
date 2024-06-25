"use client"

import Navbar from "@/components/navbar";
import {useRef, useState} from "react";

export default function HomeAdminCrearComercio() {
    const
        [cif, set_cif] = useState(""),
        [email, set_email] = useState(""),
        [telf_contacto, set_telf_contacto] = useState(""),
        [ciudad, set_ciudad] = useState(""),
        [actividad, set_actividad] = useState(""),
        [titulo, set_titulo] = useState(""),
        [resumen, set_resumen] = useState(""),
        [textos, set_textos] = useState(""),
        [fotos, set_fotos] = useState(""),
        [estrellas, set_estrellas] = useState(0),
        alerta = useRef()

    const crear = (e) => {
        e.preventDefault()

        const datos = {
            cif: cif,
            email: email,
            telf_contacto: telf_contacto,
            ciudad: ciudad,
            actividad: actividad,
            titulo: titulo,
            resumen: resumen,
            textos: textos.split(','),
            fotos: fotos.split(','),
            estrellas: estrellas,
            comentarios: []
        }

        fetch("/api/comercios", {
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

    return (
        <main className="container">
            <Navbar/>

            <div className="d-none position-fixed top-0 end-0 mt-3 me-3 z-3 bg-success border border-black border-1 rounded p-3" ref={alerta}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <span className="ms-2">Comercio creado correctamente</span>
            </div>

            <div className="">
                <h1 className="text-center">Creando comercio</h1>

                <form onSubmit={crear} className='text-end'>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_cif(e.target.value)}
                               required type="text" className="form-control" id="cif"/>
                        <label htmlFor="cif">CIF</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_estrellas(parseInt(e.target.value))}
                               type="number" className="form-control" min="0" max="5" id="estrellas"></input>
                        <label htmlFor="estrellas">Estrellas (0 - 5)</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_email(e.target.value)}
                               required type="email" className="form-control" id="email"/>
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_telf_contacto(e.target.value)}
                               required type="text" className="form-control" id="telf_contacto"/>
                        <label htmlFor="telf_contacto">Telefono de contacto</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_ciudad(e.target.value)}
                               required type="text" className="form-control" id="ciudad"/>
                        <label htmlFor="ciudad">Ciudad</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_actividad(e.target.value)}
                               required type="text" className="form-control" id="actividad"/>
                        <label htmlFor="actividad">Actividad</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_titulo(e.target.value)}
                               required type="text" className="form-control" id="titulo"/>
                        <label htmlFor="titulo">Titulo</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_resumen(e.target.value)}
                               required type="text" className="form-control" id="resumen"/>
                        <label htmlFor="resumen">Resumen</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_textos(e.target.value)}
                               required type="text" className="form-control" id="textos"/>
                        <label htmlFor="textos">Textos (separados por comas)</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_fotos(e.target.value)}
                               required type="text" className="form-control" id="fotos"/>
                        <label htmlFor="fotos">Fotos (separadas por comas)</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </div>
        </main>
    )
}
