# Nombre del microservicio
**Dominio de negocio** : Dominio de negocio al cual pertenece

**Sub dominio de negocio** : SubDominio de negocio al cual pertenece

**Capacidad de negocio** : Capacidad de negocio

## Descripcion
En esta seccion se debe dar una pequeña descripcion de la funcionalidad de negocio que cumple el microservicio

## Endpoints

- [VERB] /basepath/path1
    * descripcion del endponit, la descripcion del objeto de entrada y de salida debe estar en el swagger.yaml

Ejemplo
- [GET] /vehiculos
    * Lista todos los vehiculos

## Eventos
Descripcion de eventos que se generan

Evento1

```plaintext
{
    "someParam":"someValue",
    "someParam1":"someValue",
    "someParam2":"someValue"
}
```

## Execution

Descripcion de como ejecutar el microservicio Para ejectuar el proyecto en modo desarrollo
```
npm run start-dev
```
Para ejecutar el proyecto en modo produccion
```
npm startp
```

## Compilacion - Contenerización

Descripcion del contenedor el cual usa el microservicio

Para este tipo de proyecto no existe compilacion, pero esta seccion debe exisitr para proyectos que si lo requieran.

El archivo Dockerfile describe la imagen inicial en la cual se ejecuta el microservicio, la copia de archivos ( instalacion ) y luego la ejecucion del servicio

```
docker build . -t node-microservice
 
docker run -dp 3000:3000 node-microservice 
```

## Tests

Para ejecutar los test del proyecto ejecutar el siguiente comando

Para ejecutar todos los tests
```
npm test
```
Para ejecutar todos los tests unitarios
```
npm run test:unit
```
Para ejecutar todos los tests de integracion
```
npm run test:integration
```

## Environment

```plaintext
MONGO_URI_CLIENTS= #Url mongo db
PORT= #puerto por donde se expone el api
SERVICE_BUS_CONNECTION= #Url conexcion a cola service bus
TOPIC= #Nombre del topipo de la cola service bus
SUBSCRIPTION= #Subscripcion del topico
MAX_RETRIES= #Numero maximo de reintentos
RETRY_DELAY_IN_MS= #Tiempo de reintento post ejecucion
```




