const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo')
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")
require('dotenv').config();

const app = express();

const morganBody = require("morgan-body")
const {IncomingWebhook} = require("@slack/webhook")

const { sequelize, dbConnectMySql } = require("./config/mysql")
if (process.env.ENGINE_DB === 'nosql'){
    dbConnect()
    // Crea las colecciones por defecto si no existieran
}else{
    dbConnectMySql()
    sequelize.sync() // Crea las tablas en la base de datos si no existieran
}


const loggerStream = require("./utils/handleLogger")
morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})


//Le decimos a la app de express() que use cors y para evitar el error Cross_Domain
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
dbConnect()

const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("/api", require("./routes")) //Lee routes/
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;