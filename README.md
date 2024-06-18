### README.md

# API Lambda para Dispositivo IoT

Este proyecto contiene una función Lambda de AWS que interactúa con una tabla de DynamoDB para obtener y actualizar datos de un dispositivo IoT. La función se utiliza para procesar y devolver datos en un formato específico para una aplicación web.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Despliegue de la Lambda](#despliegue-de-la-lambda)
4. [Configuración de Permisos](#configuración-de-permisos)
5. [Parámetros](#parámetros)
6. [Pruebas](#pruebas)

## Requisitos

- Node.js 20.x
- Cuenta de AWS con permisos para crear y gestionar funciones Lambda y tablas de DynamoDB

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Wisely-ingenieria/duoc-demo-sw-lbd-api.git
    cd duoc-demo-sw-lbd-api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Despliegue de la Lambda

### Usando la Consola de AWS

1. Ve a la consola de AWS Lambda.
2. Haz clic en "Crear función".
3. Selecciona "Crear desde cero" y proporciona un nombre para tu función.
4. Selecciona el runtime de Node.js (por ejemplo, Node.js 20.x).
5. En "Permisos", selecciona un rol existente con permisos adecuados o crea uno nuevo.
6. Sube el archivo ZIP del contenido del proyecto:
    - Crea un archivo ZIP del contenido del proyecto:
        ```bash
        zip -r function.zip .
        ```
    - En la consola de Lambda, sube este archivo ZIP en la sección "Código fuente".


## Configuración de Permisos

Para permitir que la función Lambda interactúe con DynamoDB, debes agregar la siguiente política a tu rol de Lambda:

1. Ve a la consola de IAM en AWS.
2. Selecciona el rol asociado a tu función Lambda.
3. Agrega la siguiente política JSON:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "dynamodb:Query",
                    "dynamodb:GetItem",
                    "dynamodb:Scan"
                ],
                "Resource": [
                    "arn:aws:dynamodb:YOUR_REGION:YOUR_ACCOUNT_ID:table/YOUR_TABLE_NAME"
                ]
            }
        ]
    }
    ```

## Parámetros

La función Lambda acepta los siguientes parámetros a través de `queryStringParameters`:

- `device_id`: El ID del dispositivo del cual se obtendrán los datos.

## Pruebas

Para probar la función Lambda, puedes exponer la URL de la Lambda en el navegador con los parámetros correspondientes.

Ejemplo de URL:

```
https://tu-lambda-url.us-west-2.on.aws/?device_id=rak5860_test_1
```
