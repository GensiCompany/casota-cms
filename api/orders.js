export default (axios) => ({
    getAll: () => axios.get('/a/orders').then((_) => _.data),
    create: (payload) => axios.post('/a/orders', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/orders/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/orders/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/orders/${id}`).then((_) => _.data),
});
