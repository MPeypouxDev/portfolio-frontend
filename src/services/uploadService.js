import apiClient from "./apiClient";

export const uploadService = {
    upload(formData) {
        return apiClient.post('/upload', formData);
    },

    deleteImage(path) {
        return apiClient.delete('/upload', {data: { path }});
    }
}