export default (axios) => ({
    getAll: (params) => axios.get('/a/feedbacks', { params }).then((_) => _.data),
    create: (payload) => axios.post('/a/feedbacks', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/feedbacks/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/feedbacks/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/feedbacks/${id}`).then((_) => _.data),
});
