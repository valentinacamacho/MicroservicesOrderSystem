<a id="readme-top"></a> <details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del Proyecto</a>
      <ul>
        <li><a href="#objetivo-del-proyecto">Objetivo del Proyecto</a></li>
        <li><a href="#tecnologias-utlizadas">Tecnologías Utilizadas</a></li>
        <li><a href="#dependencias">Dependencias</a></li>
        <li><a href="#funcionalidades-implementadas-en-order-service">Funcionalidades Implementadas en Order-Service</a></li>
      </ul>
    </li>
    <li>
      <a href="#guia-inicial">Guía Inicial</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
      </ul>
    </li>
  </ol>
</details>

---

### Acerca del Proyecto

Este repositorio contiene el `order-service`, uno de los tres microservicios fundamentales para la solución de recepción de pedidos de un software de compras online. Su objetivo principal es **recibir las órdenes de compra de los clientes y orquestar el flujo asíncrono** con los servicios de inventario y despacho, informando el estado del pedido en cada etapa del proceso.

La solución completa se basa en una arquitectura de microservicios, donde la comunicación entre `order-service`, `inventory-service` y `delivery-service` se realiza de forma asíncrona a través de colas de mensajes, garantizando robustez y escalabilidad.

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>

---

### Objetivo del Proyecto

El objetivo general del proyecto es implementar una **solución de recepción de pedidos robusta y asíncrona** para un software de compras online. Específicamente, este `order-service` busca:

* **Recibir y persistir inicialmente los pedidos** de los clientes.
* **Iniciar el flujo de procesamiento asíncrono** de los pedidos, enviando mensajes a otros servicios.
* **Actualizar el estado del pedido** en tiempo real a medida que avanzan por las diferentes etapas (validación de inventario, despacho).
* **Manejar tanto los flujos exitosos** de creación de pedidos como los **mensajes de error** provenientes de otros servicios.

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>

---



### Tecnologías Utlizadas

![Node.js][Node.js-logo]<br>

***Propósito:*** Entorno de ejecución de javascript del lado del servidor.Permite la ejecuçión del Order-service. [Node.js][Node.js-url] 

![Express][Express-logo]<br>
***Propósito:*** Framework web ligero para usar con Node.js. Simplica la creación de APIS REST y el manejo de rutas HTTP. [Express.js][Express-js-url]

 ![AMQPLib][AMQPLib-logo]<br>
***Propósito:*** Libreria cliente de Node.js para interactuar con RabbitMQ. Facilita la conexión de colas y el envío/recepción de mensajes. [AMQPLib][AMQPLib-url]

![Docker][Docker-logo]<br>
***Propósito:*** Plataforma para contenerizar aplicaciones. Permite empaquetar el `order-service ` y `RabbitMQ` en contenedores aislados, asegurando que funciones de manera consistente en cualquier entorno. [Docker][Docker-url]
 
![Docker Compose][Docker-Compose-logo]<br>
***Propósito:*** Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor. simplifica la orquetación de `order-service` y `RabbitMQ`, permitiendo que inicien, detengan y se comuniquen facilmente como una aplicación. [Docker Compose][Docker-Compose-url]

![Nodemon][Nodemon-logo]<br>
***Propósito:*** Herramienta de desarrollo para Node.js. Monitorea cambios en los archivos de la aplicación y reinicia automaticamente el servidor, agilizando el ciclo de desarrollo.  [Nodemon][Nodemon-url]

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>

---

### Dependencias 
Las principales dependencias de los servidores se encuentran en el archivo package.json

- **mqplib:** Libreria para la conexión y operación con RabbitMQ.
- **express:** Framework web para el servidor HTTP.
- **dotenv:** Para cargar variables de netorno desde el archivo .env
- **nodemon:** Reinicio automático del servidor durante el desarrollo.

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>

---



### Funcionalidades Implementadas en Order-Service
**Orden Service** se encarga de lo siguiente:

- **API REST:** POST/ orders Provee un endpoint para recibir nuevas solicitudes via HTTP por medio de un formato JSON.

- **Validación de datos:** Se definió los dos tipos de datos nombre del producto y cantidad.

- **Generación de Id:** Se asigno un ordeId identificador único a cada order o producto creado.

- **Conexión a RabbitMQ:** Establece una conexión persistente con el broker de mensajes.

- **Declaración de colas:** Se definieron dos colas para Order-Service order_created_queue y order_status_update_queue y se verifico que existan en RabbitMQ.

- **Publicación de mensajes:** Envía los datos de las ordernes validadas a la order_created_queue de forma persistente

- **Manejo de errores:** Incluye la lógica de reintento para la conexión a RabbitMQ y manejo de capturas para mantener la estabilidad del servicio

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>

---

## Guia inicial
Este es un ejemplo de cómo puede dar instrucciones sobre cómo configurar su proyecto localmente. Para poner en funcionamiento una copia local, siga estos sencillos pasos.


### Prerequisitos
Esta guía te permitirá poner en marcha el microservicio de órdenes junto con su broker de mensajes (RabbitMQ) utilizando Docker Compose.

Antes de empezar, asegúrate de tener instalados los siguientes programas en tu máquina:

---

## Requisitos Previos
Para ejecutar y probar este proyecto, necesitarás las siguientes herramientas instaladas en tu sistema:

* **Git**: Para clonar el repositorio de código y gestionar versiones.
    * [Descargar Git](https://git-scm.com/downloads)

* **Docker Desktop**: Incluye Docker Engine y Docker Compose, esenciales para ejecutar los servicios en contenedores.
    * [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/)
    * **Nota Importante**: Asegúrate de que Docker Desktop esté en estado "**Running**" antes de ejecutar cualquier comando Docker. Puedes verificarlo en la bandeja del sistema de tu ordenador.

* **Postman**: Para probar la API REST del servicio de órdenes.
    * [Descargar Postman](https://www.postman.com/downloads/)

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>

---

### Instalación

1. **Clonar el repositorio**
```sh
git clone https://github.com/usuario/nombre-del-repo.git
```

2. **Configura el archivo .env**<br>
Tu archivo .env está configurado en `.gitignore` por seguridad - contiene credenciales y configuraciones sensibles. **Necesitas crearlo manualmente**
-  En la raíz de tu proyecto dentro del directorio `order-service`, crea un directorio llamado .env
coloca en la terminal lo siguiente:

    ```sh
    touch .env
    ```

> [!IMPORTANT]
> **Copia y pega el siguiente contenido en el archivo `.env`:**
>
> ```
> PORT=3000
> RABBITMQ_URL=amqp://user:password@rabbitmq:5672
> ORDER_CREATED_QUEUE=order_created_queue
> ORDER_STATUS_UPDATE_QUEUE=order_status_update_queue
> 

**Explicación:**
- **PORT:** Puerto en el que el `order-service` escuchará las peticiones HTTP.
- **RabbitMQ_URL:** URL de conexion a RabbitMQ. `rabbitmq` es el nombre del servicio en `docker-compose.yml`, donde Docker Compose resuelve a la IP interna del contenedor de RabbitMQ.
- **ORDER_CREATE_QUEUE:** Nombre de la cola a la que el `order-service` enviara los mensajes de órdenes creadas.
- **ORDER_STATUS_UPSATE_QUEUE:** Nombre de la cola de la que el `òrder-service` podría consumir mensaje de actualización de estado.

### Instalar dependencias - Manejo Docker

cuando se usa Docker Compose, las dependencias de Node.js como:(`èxpress`,`amqplib`,`dotenv`) se instalan automaticamnte dentro del contenedor Docker durante la fase de construcción de la imagen es definida por: `Dockerfile de order-service`
    - nota
    -No necesitar ejecutar `npm install` manualmente en tu máquina local en el directorio `order-service` si solo vas a usar Docker Compose para ejecutarlo

> [!NOTE]
> si, por alguna razón quisieras ejecutar el `order-service` directamenrte en tu máquina local (sin Docker)  para depuración o desarrollo especifico, considero que necesites ir al directorio `order-service` y ejecutar lo siguiente: 

3. Instalar paquetes NPM
   ```sh
   cd order-service
   npm install
   ```
4. **Levantar y usar los servidores con Docker Compose**
Este es el paso principal para poner en marcha el sistema:
 - Asegurate de estar en el directorio raíz de tu proyecto donde se encuentra `docker-compose.yml`

 - Limpia cualquier entorno Docker previo es para evitar algún conflicto y asegurar el inicio limpio, especialmente con volumenes de RabbitMQ.
 
 -Ejecuta uno por uno en la terminal para que haya conflicto. 

```
docker-compose down --rmi all --volumes
docker system prune --force --all
docker volume prune --force
docker volume rm microservicesordersystem_rabbitmq_data --force
```

5. **Construye y levanta los contenedores:**<br>
-Coloca en la terminal el siguiente comando.

```
docker-compose up --build
```

- Este comando construira las imágenes Docker para los servicios
- Observa los logs en la termina. Deberias ver que rabbitmq se inicializa y luego el `order-service` se conecta a RabbitMQ con éxito y donde escucha peticiones de HTTP en `http://localhost:3000`

6. **Probar el servicio**<br>
Una vez que ambos servicios estén corriendo y estables y el `order-service` muestre "Escuchando http://localhost:3000" probemolo:

    1. Abre Postman 
    2. Envía una petición `POST` con los siguientes detalles:
    - **Método:** `POST`
    - **URL:** http://localhost:3000/orders
    - **Headers:**
    - Body (raw JSON)

> [!NOTE]
> Coloca el nombre y la cantidad de producto que desees en el valor de la clave.

```sh
    {
        "nameProduct": "Monitor Gamer 27 pulgadas",
        "quantity": 1
    }
 ```

3. **Verificar respuesta:** Deberias recibir un código de estado **202 Accepted** y un JSON indicando que el pedido ha sido recibido y esta en proceso asíncrono.

4. **Consulta los logs:** En la terminal donde ejecustaste `docker-compose up -- build`, debes ver un mensaje del `order-service` confirmando que el pedido fue enviado a la cola de RabbitMQ

5. **Verifica RabbitMQ (opcional):** Accede a la interfaz web de RabbitMQ en `http://localhost:15672`
        - Ingresa usuario: user
        - Ingresa contraseña: password
        - Dirigete a la petaña de **"QUEUES"** Y comprueba que la cola `order_created_queue` tiene mensajes en la columna "Ready"

<p style="text-align: right;">
  <a href="#readme-top">volver arriba</a>
</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Node.js-logo]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/

[RabbitMQ-logo]: https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white
[RabbitMQ-url]: https://www.rabbitmq.com/

[Docker-logo]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Express-logo]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-js-url]: https://expressjs.com/

[Docker-Compose-logo]: https://img.shields.io/badge/Docker--Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-Compose-url]: https://docs.docker.com/compose/

[Nodemon-logo]: https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white
[Nodemon-url]: https://nodemon.io/

[AMQPLib-logo]: https://img.shields.io/badge/AMQPLib-blue?style=for-the-badge&logoColor=white
[AMQPLib-url]: https://www.npmjs.com/package/amqplib