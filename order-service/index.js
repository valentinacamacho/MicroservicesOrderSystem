require("dotenv").config();

const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = process.env.PORT || 3000;

let connection;
let channelRabbit;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channelRabbit = await connection.createChannel();

        console.log("Order Service: Conectado a RabbitMQ con éxito");
        await channelRabbit.assertQueue(process.env.ORDER_CREATED_QUEUE, { durable: true });
        console.log(`Order Service: Cola '${process.env.ORDER_CREATED_QUEUE}' cola declarada y lista para enviar.`)

        await channelRabbit.assertQueue(process.env.ORDER_STATUS_UPDATE_QUEUE, { durable: true });
        console.log(`Order Service: Cola' ${process.env.ORDER_STATUS_UPDATE_QUEUE}' Cola declarada y lista para recibir `);

         connection.on("error", (err) => {
            console.error("Order Service: Error en la conexión a RabbitMQ:", err.message);
        });

    } catch (error) {
        console.log("Order Service: Error al conectar a RabbitMQ", error.message);
        console.log('Order Service: Reintentando conexión a RabbitMQ en 5 segundos...');
        setTimeout(connectRabbitMQ, 10000); 
    }
}

async function iniciarServices() {
    console.log("Order Service: Iniciando Servidor");

    await connectRabbitMQ();
    app.use(express.json());

    app.get("/", (req, res) => {
        let rabbitmqStatus = "Desconocido";
        if (connection && connection.isConnected()) {
            rabbitmqStatus = "Conectado";
        } else {
            rabbitmqStatus = " No iniciada"
        }
        res.status(200).send("El servidor ORDER SERVICE esta escucahando peticiones ");
    });

    app.listen(PORT, () => {
        console.log(`Order Service: Escuchando  http://localhost:${PORT}`);
    });

    console.log("Esta listo para recibir conexiones de HTTP");
}

iniciarServices();

process.on("uncaughtException", (err) => {
    console.error("Error de excepción"), error;
})
