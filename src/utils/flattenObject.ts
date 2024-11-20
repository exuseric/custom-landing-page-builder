export default function flattenResponse(response: any): { [key: string]: any } {
    const result: { [key: string]: any } = {};

    // Helper function to flatten nested objects up to 2 levels
    function flattenObject(obj: any, parentKey: string = ''): void {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // If the value is an object, flatten it further (limit to 2 levels)
                flattenObject(value, newKey);
            } else {
                // Otherwise, just add the key to the result (1 or 2 levels deep)
                result[newKey] = value;
            }
        });
    }

    // First, flatten the main root object excluding the 'expand' field
    Object.keys(response).forEach(key => {
        if (key !== 'expand') {
            result[key] = response[key];
        }
    });

    // Then flatten the 'expand' field
    if (response.expand) {
        flattenObject(response.expand);
    }

    return result;
}