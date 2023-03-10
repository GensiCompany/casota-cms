export const state = () => ({
    categories: [],
    category: {},
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
        const { data: { categories } } = await this.$api.blogsCategories.getAll();
        commit('SET_STATE', { prop: 'categories', data: categories });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { category } } = await this.$api.blogsCategories.getDetail(payload);
        commit('SET_STATE', { prop: 'category', data: category });
    },
};
