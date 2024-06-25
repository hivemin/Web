import {NextResponse} from 'next/server'
import {readFileSync, writeFileSync} from 'fs';

export async function POST(request) {
    const data = await request.json()
    try {
        const comercios = JSON.parse(readFileSync("data/comercios.json"))
        let comercio = comercios.find((comercio) => comercio.cif === data.cif)
        comercio.comentarios.push(data.comentario)
        comercio.estrellas.push(data.estrellas)
        writeFileSync("data/comercios.json", JSON.stringify([...comercios]))
    } catch (e) {

    }

    return NextResponse.json({message: "Guardando datos...", status: 200})
}
