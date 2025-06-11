## Sobre el Proyecto
Este repositorio contiene el `order-service`, uno de los tres microservicios fundamentales para la solución de recepción de pedidos de un software de compras online. Su objetivo principal es **recibir las órdenes de compra de los clientes y orquestar el flujo asíncrono** con los servicios de inventario y despacho, informando el estado del pedido en cada etapa del proceso.

La solución completa se basa en una arquitectura de microservicios, donde la comunicación entre `order-service`, `inventory-service` y `delivery-service` se realiza de forma asíncrona a través de colas de mensajes, garantizando robustez y escalabilidad.

---

## Objetivo del Proyecto

El objetivo general del proyecto es implementar una **solución de recepción de pedidos robusta y asíncrona** para un software de compras online. Específicamente, este `order-service` busca:

* **Recibir y persistir inicialmente los pedidos** de los clientes.
* **Iniciar el flujo de procesamiento asíncrono** de los pedidos, enviando mensajes a otros servicios.
* **Actualizar el estado del pedido** en tiempo real a medida que avanzan por las diferentes etapas (validación de inventario, despacho).
* **Manejar tanto los flujos exitosos** de creación de pedidos como los **mensajes de error** provenientes de otros servicios.

---


## Tecnologias Utlizadas

**Node.js**<br>
propósito: Entorno de ejecución de javascript del lado del servidor.Permite la ejecuçión del Order-service 

**Express.js:**<br>
Propósito: Framework web ligero para usar con Node.js. Simplica la creación de APIS REST y el manejo de rutas HTTP

**amqplib:**<br>
Propósito: Libreria cliente de Node.js para interactuar con RabbitMQ. Facilita la conexión de colas y el envío/recepción de mensajes.

**Docker:**<br>
Propósito: Plataforma para contenerizar aplicaciones. Permite empaquetar el order-service y RabbitMQ en contenedores aislados, asegurando que funciones de manera consistente en cualquier entorno.
 
**Docker Compose:**<br>
Propósito: Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor. simplifica la orquetación de order-service y RabbitMQ, permitiendo que inicien,detengan y se comuniquen facilmente como una aplicación.

**Nodemon:**<br>
Propósito: Herramienta de desarrollo para Node.js. Monitorea cambios en los archivos de la aplicación y reinicia automaticamente el servidor, agilizando el ciclo de desarrollo.

---

## Dependencias 

Las principales dependencias de los servidores se encuentran en el archivo package.json

- **mqplib:** Libreria para la conexión y operación con RabbitMQ.
- **express:** Framework web para el servidor HTTP.
- **dotenv:** Para cargar variables de netorno desde el archivo .env
- **nodemon:** Reinicio automático del servidor durante el desarrollo

---

## Funcionalidades Implementadas en Order-Service
**Orden Service** se encarga de lo siguiente:

- **API REST:** POST/ orders Provee un endpoint para recibir nuevas solicitudes via HTTP

- **Validación de datos:** Se definierón los dos tipos de datos.

- **Generación de Id:** Asigne un ordeId identificador único a cada order o producto creado.

- **Conexión a RabbitMQ:** Establece una conexión persistente con el broker de mensajes.

- **Declaración de colas:** Se definieron dos colas para Order-Service order_created_queue y order_status_update_queue y se verifico que existan en RabbitMQ.

- **Publicación de mensajes:** Envía los datos de las ordernes validadas a la order_created_queue de forma persistente

- **Manejo de errores:** Incluye la lógica de reintento para la conexión a RabbitMQ y manejo de capturas para mantener la estabilidad del servicio

---



