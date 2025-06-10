// device-repository.mjs
import { QueryCommand } from "@aws-sdk/client-dynamodb";

class DynamoDBDeviceRepository {
    constructor(dbClient) {
        this.client = dbClient;
    }

    async findByUploadKey(uploadKey) {

        if (!uploadKey) throw new Error("uploadKey is required");

        const queryCommand = new QueryCommand({
            TableName: "BCFF_Devices",
            IndexName: "uploadKey-index", // ⚠️ must match exactly
            KeyConditionExpression: "uploadKey = :uploadKey",
            ExpressionAttributeValues: {
                ":uploadKey": { S: uploadKey }
            }
        });
        return await this.client.send(queryCommand);
    }
}

export { DynamoDBDeviceRepository };