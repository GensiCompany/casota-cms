export default (axios) => ({
    getAll: (params) => axios.get('/a/users', { params }).then((_) => _.data),
    getDetail: (userId) => axios.get(`/a/users/${userId}`).then((_) => _.data),
    create: (data) => axios.post('/a/users', data).then((_) => _.data),
    update: (userId, data) => axios.patch(`/a/users/${userId}`, data).then((_) => _.data),
    delete: (userId) => axios.delete(`/a/users/${userId}`).then((_) => _.data),
});
