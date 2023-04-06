export const state = () => ({
    policies: [],
    policy: {},
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
        const { data: { policies } } = await this.$api.policies.getAll();
        commit('SET_STATE', { prop: 'policies', data: policies || [] });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { policy } } = await this.$api.policies.getDetail(payload);
        commit('SET_STATE', { prop: 'policy', data: policy });
    },
};
