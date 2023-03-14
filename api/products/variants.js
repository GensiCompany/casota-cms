export default (axios) => ({
    getAll: (productId) => axios.get(`/a/products/${productId}/variants`).then((_) => _.data),
    create: (productId, payload) => axios.post(`/a/products/${productId}/variants`, payload).then((_) => _.data),
    getDetail: (productId, variantId) => axios.get(`/a/products/${productId}/variants/${variantId}`).then((_) => _.data),
    update: (productId, variantId, payload) => axios.patch(`/a/products/${productId}/variants/${variantId}`, payload).then((_) => _.data),
    delete: (productId, variantId) => axios.delete(`/a/products/${productId}/variants/${variantId}`).then((_) => _.data),
});
