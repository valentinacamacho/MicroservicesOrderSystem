require("dotenv").config();

const express = require("express");
const amqp = require("ampqlib");

const app = express();
const PORT = process.env.PORT || 3000;

let connection;
let channelRabbit;

async function connectRabbitMQ(){
    try{
      
        channelRabbit = await connection.createcChannel();

        console.log("Order Service: Conectado a RabbitMQ con éxito");
    } catch (error){
        console.log("Order Service: Error al conectar a RabbitMQ", error.message);
    }
}

async function iniciarServices(){
   console.log("Order Service: Iniciando Servidor");
   
   await connectRabbitMQ();
   app.use(express.json());

   app.get("/",(req, res) => {
    let rabbitmqStatus = "Desconocido";
    if(connection && connection.isConnected()){
        rabbitmqStatus = "Conectado";
    }else {
        rabbitmqStatus =" No iniciada"
    }
    res.status(200).send("El servidor ORDER SERVICE esta escucahando peticiones ");
   });

   app.listen(PORT, () =>{
    console.log(`Order Service: Escuchando  http://localhost:${PORT}`);
   });

   console.log("Esta listo para recibir conexiones de HTTP");
}

iniciarServices();

process.on("uncaughtException", (err) =>{
    console.error("Error de excepción"),error;
})
