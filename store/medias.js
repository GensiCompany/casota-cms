export const state = () => ({
    medias: [],
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
        // const { data: { medias, pagination } } = await this.$api.medias.getAll();
        commit('SET_STATE', { prop: 'medias', data: [] });
    },
};
