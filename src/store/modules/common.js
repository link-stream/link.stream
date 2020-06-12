import { types } from '../mutationTypes'
import { api } from '~/services'

const initialState = () => ({
    timezones: [],
    genres: [],
    audioKeys: [],
})

const state = initialState()

const mutations = {
    [types.SET_TIMEZONES](state, { timezones }) {
        state.timezones = timezones
    },

    [types.SET_GENRES](state, { genres }) {
        state.genres = genres
    },

    [types.SET_AUDIO_KEYS](state, { audioKeys }) {
        state.audioKeys = audioKeys
    },
}

const actions = {
    async loadTimezones({ state, commit }) {
        if (state.timezones.length) {
            return
        }
        const { status, data } = await api.common.getTimezones()
        commit({
            type: types.SET_TIMEZONES,
            timezones: status === 'success' ? data : [],
        })
    },

    async loadGenres({ state, commit }) {
        if (state.genres.length) {
            return
        }
        const { status, data } = await api.common.getGenres()
        commit({
            type: types.SET_GENRES,
            genres: status === 'success' ? data : [],
        })
    },

    async loadAudioKeys({ state, commit }) {
        if (state.audioKeys.length) {
            return
        }
        const { status, data } = await api.audios.getKeys()
        commit({
            type: types.SET_AUDIO_KEYS,
            audioKeys: status === 'success' ? data : [],
        })
    },
}

const getters = {
    genres: ({ genres }) => genres,
    audioKeys: ({ audioKeys }) => audioKeys,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
