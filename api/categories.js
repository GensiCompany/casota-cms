export default (axios) => ({
    getAll: (params) => axios.get('/a/category', { params }).then((_) => _.data),
    create: (payload) => axios.post('/a/category', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/category/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/category/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/category/${id}`).then((_) => _.data),
});
