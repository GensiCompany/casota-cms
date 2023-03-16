// import _uniqBy from 'lodash/uniqBy';

export const state = () => ({
    products: [],
    product: {},
    pagination: {},
    variants: [],
});

export const getters = {
    allVariants(state) {
        const { variants } = state;
        const variantHandel = variants.map((product) => ([...product.variants]));
        return variantHandel.flat(1) || [];
    },
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

    async fetchAllVariant({ commit }) {
        const { data: { pagination } } = await this.$api.products.getAll();
        const { data: { products } } = await this.$api.products.getAll({ limit: pagination.total });
        commit('SET_STATE', { prop: 'variants', data: products });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { product } } = await this.$api.products.getDetail(payload);
        commit('SET_STATE', { prop: 'product', data: product });
    },
};
