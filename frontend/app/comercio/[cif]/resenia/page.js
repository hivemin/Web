"use client"

import Navbar from "@/components/navbar";
import {useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function HomeComercioComentario({params}) {
    const
        [comentario, set_comentario] = useState(""),
        [estrellas, set_estrellas] = useState(0),
        alerta = useRef(),
        router = useRouter()

    const resenia = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/comercios/resenia`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cif: params.cif,
                comentario: `${localStorage.getItem('email')}: ${comentario}`,
                estrellas: estrellas
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    alerta.current.classList.remove("d-none")
                    setTimeout(() => {
                        router.push(`/comercio/${params.cif}`)
                    }, 1000)
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
                <span className="ms-2">Reseña creada correctamente</span>
            </div>


            <div>
                <h1 className="display-5 border-bottom border-primary mb-4 px-3">Crear comentario para {params.cif}</h1>

                <form onSubmit={resenia} className='text-end'>
                    <div className="input-group mb-3">
                        <div className="form-floating">
                            <input required type="text" className="form-control" id="comentario" placeholder="12345678F" onChange={
                                (e) => {
                                    set_comentario(e.target.value)
                                }
                            }/>
                            <label htmlFor="comentario">Comentario</label>
                        </div>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={(e) => set_estrellas(parseInt(e.target.value))}
                               type="number" className="form-control" min="0" max="5" id="estrellas" defaultValue={estrellas}></input>
                        <label htmlFor="estrellas">Puntuacion (0 - 5)</label>
                    </div>

                    <button className="btn btn-primary w-25" type="submit">Crear reseña</button>
                </form>
            </div>

        </main>
    )

}
