/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { FileService } from "src/file.service";
import { splitBase64DataUri } from "./Converter";

export async function fileHandler(base64: string): Promise<any> {
    const rawBase64 = splitBase64DataUri(base64);
    if (rawBase64) {
        const avatarBuffer = Buffer.from(rawBase64.base64Data, 'base64');
        const blob = new Blob([avatarBuffer], { type: rawBase64.mimeType });
        let formData = new FormData();
        formData.append('file', blob, 'icon.png');
        formData.append('key', 'PMS');
        formData.append('folder', 'project');
        const callFileService = new FileService();
        const fileUpload = await callFileService.callFileService(formData);
        return fileUpload
    }else{
        return null;
    }
}