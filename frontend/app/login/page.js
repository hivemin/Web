import Link from "next/link";
import Volver from "@/components/volver";

export default function HomeLogin() {
    return (
        <main className="login-main container text-end">
            <Volver/>

            <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="display-5 border-bottom border-primary mb-4 px-3">INICIAR SESIÓN</h1>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <Link href="/login/usuario" className="btn btn-primary" type="button">Usuario</Link>
                    <Link href="/login/comercio" className="btn btn-primary" type="button">Comercio</Link>
                </div>
            </div>
        </main>
    )
}
