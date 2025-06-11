require("dotenv").config();

const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = process.env.PORT || 3000;

let connection;
let channelRabbit;
let isRabbitConnected = false;

async function connectRabbitMQ() {
    return new Promise(async (resolve, reject) => {
       const attemptConnection = async () => {
            try {
                connection = await amqp.connect(process.env.RABBITMQ_URL);
                channelRabbit = await connection.createChannel();

                console.log("Order Service: Conectado a RabbitMQ con éxito.");
                await channelRabbit.assertQueue(process.env.ORDER_CREATED_QUEUE, { durable: true });
                console.log(`Order Service: Cola '${process.env.ORDER_CREATED_QUEUE}' declarada y lista para enviar.`);

                await channelRabbit.assertQueue(process.env.ORDER_STATUS_UPDATE_QUEUE, { durable: true });
                console.log(`Order Service: Cola '${process.env.ORDER_STATUS_UPDATE_QUEUE}' declarada y lista para recibir.`);

                isRabbitConnected = true; 
                resolve(); 
                connection.on("error", (err) => {
                    console.error("Order Service: Error en la conexión a RabbitMQ:", err.message);
                    isRabbitConnected = false; 
                });
                connection.on("close", () => {
                    console.warn("Order Service: Conexión a RabbitMQ cerrada inesperadamente. Reintentando...");
                    isRabbitConnected = false; 
                    setTimeout(attemptConnection, 5000);
                });

            } catch (error) {
                console.error("Order Service: Error al conectar a RabbitMQ", error.message);
                console.log('Order Service: Reintentando conexión a RabbitMQ en 5 segundos...');
                isRabbitConnected = false; 
                setTimeout(attemptConnection, 5000); 
            }
        };
        attemptConnection(); 
    });
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

    app.post("/orders", async (req, res) => {

        const { nameProduct, quantity } = req.body;

        if (!nameProduct || typeof nameProduct !== 'string' || nameProduct.trim() === '') {
            return res.status(400).json({ message: 'El campo "nameProduct"  requerido y debe ser un tipo de dato de cadena ' })
        }
        if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'El campo "quantity" es requerido y debe ser un número mayor que 0.' });
        }

        const orderId = `order _${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

        const orderData = {
            orderId: orderId,
            nameProduct: nameProduct,
            quantity: quantity,
            status: 'pending',
            timestamp: new Date().toISOString()
        }

        try {
            if (!channelRabbit || !isRabbitConnected) {
                console.error("Order Service: el canal de RabbitMQ no esta listo para enviar el mensaje")
                return res.status(503).json({ message: "Servicio de mensajeria no disponible" })
            }

            channelRabbit.sendToQueue(
                process.env.ORDER_CREATED_QUEUE,
                Buffer.from(JSON.stringify(orderData)),
                { persistent: true }
            );

            console.log(`Order Service: Pedido ID ${orderId} recibido y enviado a la cola'${process.env.ORDER_CREATED_QUEUE}'.`);

            res.status(202).json({
                message: 'Pedido recibido y en proceso asincrono',
                orderId: orderData.orderId,
                initialStatus: orderData.status,
                details: orderData
            });

        } catch (error) {
            console.error('Order Service: Error al publicar mensaje en RabbitMQ:', error.message);
            res.status(500).json({ message: 'Error interno del servidor al procesar el pedido.' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Order Service: Escuchando  http://localhost:${PORT}`);
    });

    console.log("Esta listo para recibir conexiones de HTTP");
}

iniciarServices();

process.on("uncaughtRejection", (reason, promise) => {
    console.error('Order Service: Promesa rechazada no manejada', reason, promise);
})
process.on("uncaughtException", (err) => {
    console.error('Error de excepción', err.message, err.stack);

    if (connection) {
        try {
            connection.close();
            console.log("Order Service: Conexión a RabbitMQ cerrada por excepción no capturada");
        } catch (e) {
            console.error("Order Service:Error al cerra la conexióon  a RabbitMQ en excepción:", e);
        }
    }
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('\nOrder Service: Señal SIGINT recibida. Cerrando conexión a RabbitMQ y saliendo...');
    if (connection) {
        try {
            await connection.close();
            console.log('Order Service: Conexión a RabbitMQ cerrada.');
        } catch (e) {
            console.error('Order Service: Error al cerrar la conexión a RabbitMQ en SIGINT:', e);
        }
    }
    process.exit(0);
});