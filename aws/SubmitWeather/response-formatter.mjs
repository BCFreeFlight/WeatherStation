// response-formatter.mjs
/**
 * A class dedicated to creating and formatting HTTP response objects.
 */
class ResponseFormatter {
    /**
     * Formats a response object with the provided status code and optional message.
     *
     * @param {number} statusCode - The HTTP status code for the response.
     * @param {string} [message=null] - An optional message to include in the response body.
     * @return {Object} The formatted response object containing the status code, JSON stringified body, and headers.
     */
    format(statusCode, message = null) {
        return {
            statusCode,
            body: JSON.stringify({ message }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
}

export { ResponseFormatter };