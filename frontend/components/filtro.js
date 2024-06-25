import {useRef} from "react";

export default function FiltroComercios({comercios, set_comercios_filtrados}) {
    const filtro = useRef()

    return (
        <div className="mb-3">
            <div className="form-floating mb-3">
                <input className="form-control" id="filtro" type="text" ref={filtro} onChange={
                    () => {
                        set_comercios_filtrados(comercios.filter(
                            comercio => (
                                comercio.cif.toLowerCase().includes(filtro.current.value) ||
                                comercio.ciudad.toLowerCase().includes(filtro.current.value) ||
                                comercio.actividad.toLowerCase().includes(filtro.current.value) ||
                                comercio.titulo.toLowerCase().includes(filtro.current.value) ||
                                comercio.resumen.toLowerCase().includes(filtro.current.value) ||
                                filtro.current.value === ""
                            )
                        ))
                    }
                }/>

                <label htmlFor="filtro">Filtrar</label>
            </div>
        </div>
    )
}
