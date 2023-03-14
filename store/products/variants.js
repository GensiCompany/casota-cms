export const state = () => ({
    variants: [],
    variant: {},
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
    async fetchAll({ commit }, payload) {
        const { data: { variants } } = await this.$api.productVariants.getAll(payload);
        commit('SET_STATE', { prop: 'variants', data: variants || [] });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { variant } } = await this.$api.productVariants.getDetail(payload);
        commit('SET_STATE', { prop: 'variant', data: variant });
    },
};
