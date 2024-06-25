import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Comercio({comercio, resumido = true}) {
    return (
        <li className="list-group-item">
            <Link className="display-6" href={`/comercio/${comercio.cif}`}>{comercio.titulo}</Link>
            <p>
                {
                    Array(parseInt(comercio.estrellas.reduce((x, y) => (x + y) / 2)))
                        .fill(undefined, undefined, undefined)
                        .map(() => (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            )
                        )
                }
            </p>
            <p className="lead">{comercio.resumen}</p>

            <div className={resumido ? "d-none" : ""}>
                <p className="display-6">Email:</p>
                <p className="lead">{comercio.email}</p>

                <p className="display-6">Telefono de contacto:</p>
                <p className="lead">{comercio.telf_contacto}</p>

                <p className="display-6">Textos</p>
                <ul className="list-group">
                    {
                        comercio.textos.map((texto) => (
                            <li className="list-group-item">{texto}</li>
                        ))
                    }
                </ul>
                <p className="display-6">Fotos</p>
                <div className="d-flex flex-row flex-wrap">
                    {
                        comercio.fotos.map((texto) => (
                            <img className="mx-1 rounded-5" src={texto} alt="foto" width="25%"/>
                        ))
                    }
                </div>

                <p className="display-6">Comentarios</p>
                <ul className="list-group">
                    {
                        comercio.comentarios.map((texto) => (
                            <li className="list-group-item">{texto}</li>
                        ))
                    }
                </ul>
            </div>
        </li>
    )
}
