import {NextResponse} from 'next/server'
import {readFileSync, writeFileSync} from 'fs';

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const cif = searchParams.get("cif")

    try {
        const comercios = JSON.parse(readFileSync("data/comercios.json"))
        // console.log(comercios)

        if (cif) {
            const comercios_filtrados = comercios.filter((c) => c.cif === cif)
            if (comercios_filtrados.length > 0) return NextResponse.json({comercios: comercios_filtrados, status: 200})
            else return NextResponse.json({message: "Comercio no existe...", status: 400})
        }

        return NextResponse.json({comercios: comercios, status: 200})
    } catch (e) {
        return NextResponse.json({message: "Comercios no existen...", status: 400})
    }
}

export async function POST(request) {
    const data = await request.json()
    try {
        const comercios = JSON.parse(readFileSync("data/comercios.json"))

        let comercio_mejorar = comercios.find((comercio) => comercio.cif === data.cif)
        if (comercio_mejorar) {
            for (let key in data) comercio_mejorar[key] = data[key]
            writeFileSync("data/comercios.json", JSON.stringify([...comercios]))
        } else {
            writeFileSync("data/comercios.json", JSON.stringify([...comercios, data]))
        }
    } catch (e) {
        writeFileSync("data/comercios.json", JSON.stringify([data]))
    }

    return NextResponse.json({message: "Guardando datos...", status: 200})
}

export async function DELETE(request) {
    const data = await request.json()
    try {
        const comercios = JSON.parse(readFileSync("data/comercios.json"))
        const comercios_filtrados = comercios.filter((c) => c.cif !== data.cif)
        writeFileSync("data/comercios.json", JSON.stringify([...comercios_filtrados]))

        return NextResponse.json({message: "Comercio eliminado...", status: 200})
    } catch (e) {
        return NextResponse.json({message: "Comercio no existe...", status: 400})
    }
}
