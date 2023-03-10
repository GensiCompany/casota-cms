export const state = () => ({
    products: [],
    product: {},
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchAll({ commit }) {
        const { data: { products, pagination } } = await this.$api.products.getAll();
        commit('SET_STATE', { prop: 'products', data: products || [] });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { product } } = await this.$api.products.getDetail(payload);
        commit('SET_STATE', { prop: 'product', data: product });
    },
};
