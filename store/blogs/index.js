export const state = () => ({
    blogs: [],
    blog: {},
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
        const { data: { blogs, pagination } } = await this.$api.blogs.getAll();
        commit('SET_STATE', { prop: 'blogs', data: blogs || [] });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { blog } } = await this.$api.blogs.getDetail(payload);
        commit('SET_STATE', { prop: 'blog', data: blog });
    },
};
