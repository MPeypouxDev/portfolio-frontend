import apiClient from "./apiClient";

export const projectService = {
    getAll() {
        return apiClient.get('/projects');
    },

    getFeatured() {
        return apiClient.get('/projects/featured');
    },

    getById(id) {
        return apiClient.get(`/projects/${id}`);
    },

    create(projectData) {
        return apiClient.post('/projects', projectData);
    },

    update(id, projectData) {
        return apiClient.put(`/projects/${id}`, projectData);
    },

    delete(id) {
        return apiClient.delete(`/projects/${id}`);
    },
};