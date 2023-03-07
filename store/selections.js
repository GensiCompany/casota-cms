import Districts from '@/static/jsons/districts.json';
import Provinces from '@/static/jsons/provinces.json';
import Wards from '@/static/jsons/wards.json';

export const state = () => ({
    provinces: [],
    districts: [],
    wards: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchProvinces({ commit }) {
        const provinces = Provinces;
        commit('SET_STATE', { prop: 'provinces', data: provinces });
    },

    async fetchDistricts({ commit }, payload) {
        const districts = Districts.filter((district) => district.provinceId === payload.provinceId);
        commit('SET_STATE', { prop: 'districts', data: districts });
    },

    async fetchWards({ commit }, payload) {
        const wards = Wards.filter((ward) => ward.districtId === payload.districtId);
        commit('SET_STATE', { prop: 'wards', data: wards });
    },
};
