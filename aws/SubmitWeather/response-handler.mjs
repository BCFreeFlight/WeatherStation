// response-formatter.mjs
/**
 * A class dedicated to creating and formatting HTTP response objects.
 */
class ResponseHandler {
    /**
     * Formats a response object with the provided status code and optional message.
     *
     * @param {number} statusCode - The HTTP status code for the response.
     * @param {Object} response - The message to include in the response body.
     * @return {Object} The formatted response object containing the status code, JSON stringified body, and headers.
     */
    handle(statusCode, response) {
        return {
            statusCode: statusCode,
            isBase64Encoded: false,
            body: JSON.stringify({ response }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
}

export { ResponseHandler };