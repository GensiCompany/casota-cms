export default (axios) => ({
    getAll: () => axios.get('/a/faqs').then((_) => _.data),
    create: (payload) => axios.post('/a/faqs', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/faqs/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/faqs/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/faqs/${id}`).then((_) => _.data),
});
