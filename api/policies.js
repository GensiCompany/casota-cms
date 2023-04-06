export default (axios) => ({
    getAll: () => axios.get('/a/policies').then((_) => _.data),
    create: (payload) => axios.post('/a/policies', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/policies/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/policies/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/policies/${id}`).then((_) => _.data),
});
