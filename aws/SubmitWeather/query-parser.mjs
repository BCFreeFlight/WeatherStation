// query-parser.mjs
class QueryParser {
    parse(params) {
        if (!params || typeof params !== 'object') return {};
        const parsed = {};
        for (const [key, value] of Object.entries(params)) {
            if (key.toLowerCase() === 'uploadkey') continue;
            const numberVal = parseFloat(value);
            parsed[key] = !isNaN(numberVal) && value.trim() === numberVal.toString()
                ? numberVal
                : value;
        }
        return parsed;
    }
    getParam(params, key) {
        if (!params || typeof params !== 'object') return undefined;
        const foundKey = Object.keys(params).find(k => k.toLowerCase() === key.toLowerCase());
        return foundKey ? params[foundKey] : undefined;
    }
}

export { QueryParser };