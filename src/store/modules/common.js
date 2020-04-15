import { types } from '../mutationTypes'
import { api } from '~/services/api'

const initialState = () => ({
    timezones: null,
    times: null,
    genres: null,
})

const state = initialState()

const mutations = {
    [types.SET_TIMEZONES](state, { timezones }) {
        state.timezones = timezones
    },

    [types.SET_TIMES](state, { times }) {
        state.times = times
    },

    [types.SET_GENRES](state, { genres }) {
        state.genres = genres
    },
}

const actions = {
    async loadTimezones({ commit }) {
        const { status, data } = await api.common.getTimezones()
        commit({
            type: types.SET_TIMEZONES,
            timezones: status === 'success' ? data : [],
        })
    },

    async loadGenres({ commit }) {
        const { status, data } = await api.common.getGenres()
        commit({
            type: types.SET_GENRES,
            genres: status === 'success' ? data : [],
        })
    },

    loadTimes({ commit }) {
        const times = api.common.getTimes()
        commit(types.SET_TIMES, { times })
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
