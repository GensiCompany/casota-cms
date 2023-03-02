export const state = () => ({
    banners: [],
    banner: {},
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
        const { data: { banners, pagination } } = await this.$api.banners.getAll();
        commit('SET_STATE', { prop: 'banners', data: banners });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { banner } } = await this.$api.banners.getDetail(payload);
        commit('SET_STATE', { prop: 'banner', data: banner });
    },
};
