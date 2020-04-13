import { types } from '../mutationTypes'
import { lsApi } from '~/services/lsApi'

const initialState = () => ({
    timezones: null,
    times: null,
    genres: null,
})

const state = initialState()

const mutations = {
    [types.SET_TIMEZONES](state, payload) {
        state.timezones = payload
    },

    [types.SET_TIMES](state, payload) {
        state.times = payload
    },

    [types.SET_GENRES](state, payload) {
        state.genres = payload
    },
}

const actions = {
    async loadTimezones({ commit }) {
        const { status, data } = await lsApi.common.getTimezones()
        commit(types.SET_TIMEZONES, status === 'success' ? data : [])
    },

    async loadGenres({ commit }) {
        const { status, data } = await lsApi.audios.getGenres()
        commit(types.SET_GENRES, status === 'success' ? data : [])
    },

    loadTimes({ commit }) {
        const times = lsApi.common.getTimes()
        commit(types.SET_TIMES, times)
    },
}

const getters = {
    timezones: state => state.timezones,
    times: state => state.times,
    genres: state => state.genres,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
