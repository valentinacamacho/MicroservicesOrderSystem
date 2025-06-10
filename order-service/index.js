require("dotenv").config();

const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;

async function iniciarServices(){
   console.log("Iniciando servicio - Order service");
   
   app.get("/",(req, res) =>{
    res.status(200).send("El servidor ORDER SERVICE esta escucahando peticiones ");
   });

   app.listen(PORT, () =>{
    console.log(`Escuchando en en http://localhost:${PORT}`);
   });

   console.log("Esta listo para recibir conexiones de HTTP");
}

iniciarServices();

process.on("uncaughtException", (err) =>{
    console.error("Error de excepción"),error;
})
