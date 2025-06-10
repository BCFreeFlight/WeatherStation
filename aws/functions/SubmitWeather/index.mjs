// index.mjs
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { ResponseHandler, QueryParser, DynamoDBDeviceRepository, DynamoDBWeatherRepository, WeatherService, DeviceService } from "bcfreeflight";

// Table names
const deviceTable = "BCFF_Devices";
const weatherTable = "BCFF_Weather";

// Create dependencies
const dbClient = new DynamoDBClient({region: process.env.AWS_REGION});
const responseHandler = new ResponseHandler();
const queryParser = new QueryParser();
const deviceRepository = new DynamoDBDeviceRepository(dbClient, deviceTable);
const weatherRepository = new DynamoDBWeatherRepository(dbClient, weatherTable);
const weatherService = new WeatherService(weatherRepository);
const deviceService = new DeviceService(deviceRepository);

// Lambda handler
/**
 * Handles an HTTP request to validate a device and save weather data based on the provided query parameters.
 *
 * @param {Object} event - The event object containing details of the HTTP request, including queryStringParameters.
 * @return {Promise<Object>} Returns a formatted HTTP response object with a status code and message.
 *                           A 200 status code is returned if the operation is successful.
 *                           A 400 status code is returned if the `uploadKey` is missing or invalid.
 *                           Throws an error with a 500 status code for internal server errors.
 */
const handler = async (event) => {
    const uploadKey = queryParser.getParam(event.queryStringParameters, "uploadKey");

    if (!uploadKey) {
        return responseHandler.handle(400, "Missing 'uploadKey' in query string.");
    }

    try {
        const device = await deviceService.getById(uploadKey);
        if (!device) {
            return responseHandler.handle(400, `Device with key '${uploadKey}' not found.`);
        }
        const payload = queryParser.parse(event.queryStringParameters);
        await weatherService.saveWeatherData(device, payload);
        return responseHandler.handle(200, "Success");
    } catch (err) {
        return responseHandler.handle(500, `Internal server error: ${err.message}`);
    }
};

export {handler};