// device-repository.mjs
import { QueryCommand } from "@aws-sdk/client-dynamodb";

/**
 * A repository class for interacting with a DynamoDB table containing device data.
 * This class provides a method to query devices by their upload keys using the AWS SDK.
 */
class DynamoDBDeviceRepository {
    constructor(dbClient) {
        this.client = dbClient;
    }

    /**
     * Finds and retrieves the record associated with the provided upload key from the "BCFF_Devices" table.
     *
     * @param {string} uploadKey - The unique key used to identify the upload entry. This key is required for the query.
     * @return {Promise<Object>} A promise that resolves to the queried result from the database.
     * @throws {Error} Throws an error if the uploadKey is not provided.
     */
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