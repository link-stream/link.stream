import { types } from '../mutationTypes'
import { lsApi } from '~/services/lsApi'

const initialState = () => ({
    timezones: [],
    times: [],
    genres: [],
})

const state = initialState()

const mutations = {
    [types.LOAD_TIMEZONES](state, data) {
        state.timezones = data
    },

    [types.LOAD_TIMES](state, data) {
        state.times = data
    },

    [types.LOAD_GENRES](state, data) {
        state.genres = data
    },
}

const actions = {
    async loadTimezones({ commit }) {
        const { status, data } = await lsApi.common.getTimezones()
        status === 'success' && commit(types.LOAD_TIMEZONES, data)
    },

    async loadGenres({ commit }) {
        const { status, data } = await lsApi.audios.getGenres()
        status === 'success' && commit(types.LOAD_GENRES, data)
    },

    loadTimes({ commit }) {
        const times = lsApi.common.getTimes()
        commit(types.LOAD_TIMES, times)
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
