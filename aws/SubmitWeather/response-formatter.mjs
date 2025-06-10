// response-formatter.mjs
class ResponseFormatter {
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