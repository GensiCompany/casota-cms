export default (axios) => ({
    getAll: (params) => axios.get('/a/products', { params }).then((_) => _.data),
    create: (payload) => axios.post('/a/products', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/products/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/products/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/products/${id}`).then((_) => _.data),
});
