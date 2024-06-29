// Importa la biblioteca mongoose
const mongoose = require('mongoose')
const dbConnect = () =>{
    // Definimos la URI de la base de datos desde las variables de entorno
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)

    // Intenta conectarse a la base de datos
    try{
        mongoose.connect(db_uri)
    }
    catch(error){
        console.error("Error conectándose a la base de datos:", error)
    }

    // Imprime un mensaje cuando se conecta correctamente a la base de datos
    mongoose.connection.on("connected", () => console.log("Conectado a la base de datos"))
}

// Exporta la función dbConnect para hacerla accesible a otros módulos
module.exports = dbConnect
