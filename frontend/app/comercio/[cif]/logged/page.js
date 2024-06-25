"use client"

import Navbar from "@/components/navbar";
import {get_comercio_client} from "@/utils/utils";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function HomeComercioLogged({params}) {
    const
        [comercios, set_comercios] = useState([]),
        [email, set_email] = useState(""),
        [telf_contacto, set_telf_contacto] = useState(""),
        [ciudad, set_ciudad] = useState(""),
        [actividad, set_actividad] = useState(""),
        [titulo, set_titulo] = useState(""),
        [resumen, set_resumen] = useState(""),
        [textos, set_textos] = useState(""),
        [fotos, set_fotos] = useState(""),
        alerta = useRef(),
        eliminado = useRef(),
        eliminado2 = useRef(),
        router = useRouter()

    useEffect(() => {
        get_comercio_client(set_comercios, undefined, params.cif)
    }, []);

    const actualizar = (e) => {
        e.preventDefault()

        const datos = {
            cif: comercios[0].cif,
            email: email ? email : comercios[0].email,
            telf_contacto: telf_contacto ? telf_contacto : comercios[0].telf_contacto,
            ciudad: ciudad ? ciudad : comercios[0].ciudad,
            actividad: actividad ? actividad : comercios[0].actividad,
            titulo: titulo ? titulo : comercios[0].titulo,
            resumen: resumen ? resumen : comercios[0].resumen,
            textos: textos ? textos.split(',') : comercios[0].textos,
            fotos: fotos ? fotos.split(',') : comercios[0].fotos,
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

    const eliminar = () => {
        const datos = {
            cif: comercios[0].cif
        }

        eliminado.current.classList.add("d-none")
        eliminado2.current.classList.remove("d-none")

        setTimeout(() => {
            fetch("/api/comercios", {
                method: "DELETE",
                body: JSON.stringify(datos)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        localStorage.removeItem('cif')
                        router.push("/")
                    }
                })
        }, 2000)
    }

    if (comercios.length > 0) {
        const comercio = comercios[0]

        if (localStorage.getItem('cif') !== comercio.cif && localStorage.getItem('tipo') !== 'admin') return (
            <div className="text-center">
                <h1>No tienes permisos para editar este comercio</h1>
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
                    <span className="ms-2">Comercio actualizado correctamente</span>
                </div>

                <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar comercio {params.cif}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Si eliminas tu comercio no podrás recuperarlo. ¿Estás seguro?
                            </div>
                            <div className="modal-footer">
                                <button onClick={eliminar} type="button" data-bs-dismiss="modal" className="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-none text-center" ref={eliminado2}>
                    <h1 className="display-1">Eliminando comercio {params.cif}...</h1>
                </div>

                <div className="" ref={eliminado}>
                    <h1 className="text-center">Comercio {params.cif}</h1>

                    <form onSubmit={actualizar} className='text-end'>
                        <div className="form-floating mb-3">
                            <input required readOnly type="text" className="form-control" id="cif" defaultValue={comercio.cif}/>
                            <label htmlFor="cif">CIF</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_email(e.target.value)}
                                   required type="email" className="form-control" id="email" defaultValue={comercio.email}/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_telf_contacto(e.target.value)}
                                   required type="text" className="form-control" id="telf_contacto" defaultValue={comercio.telf_contacto}/>
                            <label htmlFor="telf_contacto">Telefono de contacto</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_ciudad(e.target.value)}
                                   required type="text" className="form-control" id="ciudad" defaultValue={comercio.ciudad}/>
                            <label htmlFor="ciudad">Ciudad</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_actividad(e.target.value)}
                                   required type="text" className="form-control" id="actividad" defaultValue={comercio.actividad}/>
                            <label htmlFor="actividad">Actividad</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_titulo(e.target.value)}
                                   required type="text" className="form-control" id="titulo" defaultValue={comercio.titulo}/>
                            <label htmlFor="titulo">Titulo</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_resumen(e.target.value)}
                                   required type="text" className="form-control" id="resumen" defaultValue={comercio.resumen}/>
                            <label htmlFor="resumen">Resumen</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_textos(e.target.value)}
                                   required type="text" className="form-control" id="textos" defaultValue={comercio.textos}/>
                            <label htmlFor="textos">Textos (separados por comas)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={(e) => set_fotos(e.target.value)}
                                   required type="text" className="form-control" id="fotos" defaultValue={comercio.fotos}/>
                            <label htmlFor="fotos">Fotos (separadas por comas)</label>
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
            <h1>No existe el comercio</h1>
            <Link href="/" onClick={() => localStorage.removeItem('cif')}>Volver</Link>
        </div>
    )
}
