/**
 * Logged In User Module
 */

import { RESET, meTypes } from '../mutationTypes'
import { lsApi } from '~/services/lsApi'

const initialState = () => ({
    visibilities: [],
    tracks: [],
})

export const namespaced = true
export const state = initialState()

export const mutations = {
    [RESET](state) {
        const s = initialState()
        for (let key in s) {
            state[key] = s[key]
        }
    },

    [meTypes.LOAD_VISIBILITIES](state, visibilities) {
        state.visibilities = visibilities
    },

    [meTypes.LOAD_TRACKS](state, tracks) {
        state.tracks = tracks
    },
}

export const actions = {
    async loadAccountSettings({ dispatch }) {
        dispatch('loadVisibilities')
        dispatch('loadTracks')
        dispatch('common/loadTimezones', null, { root: true })
        dispatch('common/loadTimes', null, { root: true })
        dispatch('common/loadGenres', null, { root: true })
    },

    async loadVisibilities({ commit, rootGetters }) {
        const { user } = rootGetters
        const { status, data } = await lsApi.common.getVisibilitiesByUser(
            user.id
        )
        if (status !== 'success') {
            return
        }
        const visibilities = Object.keys(data).map(key => {
            return {
                id: parseInt(key),
                title: data[key],
            }
        })
        commit(meTypes.LOAD_VISIBILITIES, visibilities)
    },

    async loadTracks({ commit, rootGetters }) {
        const { user } = rootGetters
        const { status, data } = await lsApi.audios.getTracksByUser(user.id)
        status === 'success' && commit(meTypes.LOAD_TRACKS, data)
    },
}

export const getters = {
    user: (state, getters) => getters['auth/user'],
    visibilities: state => [...state.visibilities],
    tracks: state => [...state.tracks],
}
