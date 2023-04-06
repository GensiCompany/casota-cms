export default (axios) => ({
    getAll: () => axios.get('/a/medias').then((_) => _.data),
    create: (payload) => axios.post('/a/medias', payload).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/medias/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/medias/${id}`).then((_) => _.data),
});
