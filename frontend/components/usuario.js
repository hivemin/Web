export default function Usuario({usuario}) {
    return (
        <li className="list-group-item">
            <p>Email: {usuario.email}</p>
            <p>Ciudad: {usuario.ciudad}</p>
        </li>
    )
}