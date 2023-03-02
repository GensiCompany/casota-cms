export default (axios) => ({
    getAll: () => axios.get('/a/blogs').then((_) => _.data),
    create: (payload) => axios.post('/a/blogs', payload).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/blogs/${id}`).then((_) => _.data),
    update: (id, payload) => axios.patch(`/a/blogs/${id}`, payload).then((_) => _.data),
    delete: (id) => axios.delete(`/a/blogs/${id}`).then((_) => _.data),
});
