export default (axios) => ({
    getAll: () => axios.get('/a/category').then((_) => _.data),
    create: (payload) => axios.post('/a/category', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/category/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/category/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/category/${id}`).then((_) => _.data),
});
