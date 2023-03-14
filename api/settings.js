export default (axios) => ({
    getAll: () => axios.get('/a/settings').then((_) => _.data),
    update: (payload) => axios.patch('/a/settings', payload).then((_) => _.data),
});
