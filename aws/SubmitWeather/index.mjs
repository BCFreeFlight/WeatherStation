// index.mjs
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {ResponseFormatter} from './response-formatter.mjs';
import {QueryParser} from './query-parser.mjs';
import {DynamoDBDeviceRepository} from './device-repository.mjs';
import {DynamoDBWeatherRepository} from './weather-repository.mjs';
import {WeatherService} from './weather-service.mjs';
import {DeviceService} from './device-service.mjs';

// Create dependencies
const dbClient = new DynamoDBClient({region: process.env.AWS_REGION});
const responseFormatter = new ResponseFormatter();
const queryParser = new QueryParser();
const deviceRepository = new DynamoDBDeviceRepository(dbClient);
const weatherRepository = new DynamoDBWeatherRepository(dbClient);
const weatherService = new WeatherService(weatherRepository);
const deviceService = new DeviceService(deviceRepository);

// Lambda handler
export const handler = async (event) => {
    const uploadKey = queryParser.getParam(event.queryStringParameters, "uploadKey");
    if (!uploadKey) {
        return responseFormatter.format(400, "Missing 'uploadKey' in query string.");
    }
    try {
        const deviceValid = await deviceService.validateDevice(uploadKey);
        if (!deviceValid) {
            return responseFormatter.format(400, `Device with key '${uploadKey}' not found.`);
        }
        const payload = queryParser.parse(event.queryStringParameters);
        await weatherService.saveWeatherData(uploadKey, payload);
        return responseFormatter.format(200, "Success");
    } catch (err) {
        console.error("Error:", err);
        throw Error(`Internal server error: ${err.message}`);
    }
};