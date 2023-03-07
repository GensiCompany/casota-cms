export const state = () => ({
    faqs: [],
    faq: {},
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
        const { data: { faqs, pagination } } = await this.$api.faqs.getAll();
        commit('SET_STATE', { prop: 'faqs', data: faqs || [] });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { faq } } = await this.$api.faqs.getDetail(payload);
        commit('SET_STATE', { prop: 'faq', data: faq });
    },
};
