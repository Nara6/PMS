/* eslint-disable prettier/prettier */
export function splitBase64DataUri(dataUri: string) {
    const parts = dataUri.split(',');
    if (parts.length !== 2) {
        throw new Error('Invalid data URI format');
    }

    const [header, base64Data] = parts;

    // Extract MIME type from header
    const mimeTypeMatch = header.match(/^data:(.*?);base64/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : null;

    return {
        mimeType: mimeType,
        base64Data: base64Data
    };
}