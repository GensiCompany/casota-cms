export const state = () => ({
    feedbacks: [],
    feedback: {},
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
        const { data: { feedbacks, pagination } } = await this.$api.feedbacks.getAll(payload);
        commit('SET_STATE', { prop: 'feedbacks', data: feedbacks });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { feedback } } = await this.$api.feedbacks.getDetail(payload);
        commit('SET_STATE', { prop: 'feedback', data: feedback });
    },
};
