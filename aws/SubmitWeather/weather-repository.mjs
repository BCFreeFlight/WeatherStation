// weather-repository.mjs
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

class DynamoDBWeatherRepository {
    constructor(dbClient) {
        this.client = dbClient;
    }

    async saveWeatherData({ id, uploadKey, timestamp, data }) {
        const putCommand = new PutItemCommand({
            TableName: "BCFF_Weather",
            Item: marshall({ id, uploadKey, timestamp, data })
        });
        return await this.client.send(putCommand);
    }
}

export { DynamoDBWeatherRepository };