const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // Obtener el device_id de los parámetros de la petición
    const deviceId = event.queryStringParameters?.device_id || event.body?.device_id

    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'device_id is required' })
        };
    }

    const params = {
        TableName: 'demo_duoc_dynamo', // Reemplaza con el nombre de tu tabla de DynamoDB
        KeyConditionExpression: 'device_id = :device_id',
        ExpressionAttributeValues: {
            ':device_id': deviceId
        },
        ScanIndexForward: false, // Orden descendente para obtener los últimos registros
        Limit: 20 // Limitar a los últimos 20 registros
    };

    try {
        const data = await dynamoDb.query(params).promise();
        const items = data.Items;

        if (!items || items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Device not found' })
            };
        }

        // Procesar los datos obtenidos de DynamoDB
        const response = {
            deviceId: items[0].device_id,
            alertThreshold: items[0].high_threshold,
            timeInterval: items[0].interval,
            alertActive: items[0].type === 'alert', // Suponiendo que 'type' puede ser 'alert' o 'normal'
            date: new Date(items[0].timestamp).toISOString(), // Convertir timestamp a fecha
            liveValue: items[0].ppm,
            history: items.map(item => ({
                timestamp: new Date(item.timestamp).toISOString(),
                value: item.ppm
            }))
        };

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        console.error('Error al obtener datos de DynamoDB:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};