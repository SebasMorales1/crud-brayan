const express = require("express")
const app = express()
const useApp = require("./routes/routes.js")
const bodyParser = require("body-parser")
const DBconnection= require("./config/db.js")
const PORT = 3000
DBconnection()
app.use(bodyParser.json())
app.use(useApp)

app.listen(PORT,()=>console.log("escuchando en el puerto : " + PORT))