import {NextResponse} from 'next/server'
import {readFileSync, writeFileSync} from 'fs';

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const email = searchParams.get("email")

    try {
        const users = JSON.parse(readFileSync("data/users.json"))
        // console.log(users)

        if (email) {
            const users_filtrados = users.filter((u) => u.email === email)
            if (users_filtrados.length > 0) return NextResponse.json({users: users_filtrados, status: 200})
            else return NextResponse.json({message: "Usuario no existe...", status: 400})
        }

        return NextResponse.json({users: users, status: 200})
    } catch (e) {
        return NextResponse.json({message: "Usuarios no existen...", status: 400})
    }
}

export async function POST(request) {
    const data = await request.json()
    try {
        const users = JSON.parse(readFileSync("data/users.json"))

        let user_mejorar = users.find((user) => user.email === data.email)
        if (user_mejorar) {
            for (let key in data) user_mejorar[key] = data[key]
            writeFileSync("data/users.json", JSON.stringify([...users]))
        } else {
            writeFileSync("data/users.json", JSON.stringify([...users, data]))
        }
    } catch (e) {
        writeFileSync("data/users.json", JSON.stringify([data]))
    }

    return NextResponse.json({message: "Guardando datos...", status: 200})

}

export async function DELETE(request) {
    const data = await request.json()
    try {
        const users = JSON.parse(readFileSync("data/users.json"))
        const users_filtrados = users.filter((u) => u.email !== data.email)
        writeFileSync("data/users.json", JSON.stringify([...users_filtrados]))

        return NextResponse.json({message: "Usuario eliminado...", status: 200})
    } catch (e) {
        return NextResponse.json({message: "Usuario no existe...", status: 400})
    }
}
