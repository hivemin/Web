const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo')
require('dotenv').config();
const app = express();
//Le decimos a la app de express() que use cors y para evitar el error Cross_Domain
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes")) //Lee routes/
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
dbConnect()