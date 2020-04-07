import { commonTypes } from '../mutationTypes'
import { lsApi } from '~/services/lsApi'

const initialState = () => ({
    timezones: [],
    times: [],
    genres: [],
})

export const namespaced = true
export const state = initialState()

export const mutations = {
    [commonTypes.LOAD_TIMEZONES](state, timezones) {
        state.timezones = timezones
    },

    [commonTypes.LOAD_TIMES](state, times) {
        state.times = times
    },

    [commonTypes.LOAD_GENRES](state, genres) {
        state.genres = genres
    },
}

export const actions = {
    async loadTimezones({ commit }) {
        const { status, data } = await lsApi.common.getTimezones()
        status === 'success' && commit(commonTypes.LOAD_TIMEZONES, data)
    },

    async loadGenres({ commit }) {
        const { status, data } = await lsApi.audios.getGenres()
        status === 'success' && commit(commonTypes.LOAD_GENRES, data)
    },

    loadTimes({ commit }) {
        const times = lsApi.common.getTimes()
        commit(commonTypes.LOAD_TIMES, times)
    },
}

export const getters = {
    timezones: state => [...state.timezones],
    times: state => [...state.times],
    genres: state => [...state.genres],
}
