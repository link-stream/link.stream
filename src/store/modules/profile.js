/**
 * Profile Module
 */

import { commonTypes, profileTypes } from '../mutationTypes'
import { api } from '~/services'
import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @type {null|object}
     */
    profile: null,
    beats: [],
})

const state = initialState()

const mutations = {
    [commonTypes.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [profileTypes.SET_PROFILE](state, { profile }) {
        state.profile = profile
    },
    [profileTypes.SET_BEATS](state, { beats }) {
        state.beats = beats
    }
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    async getProfileMain({ commit }, { url }) {
        const response = await api.profiles.getProfileMain(url)
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_PROFILE, { profile: data })
        return response
    },
    async getProfileBeats({ state, commit }) {
        const response = await api.profiles.getProfileBeats(state.profile.id)
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_BEATS, { beats: data })
        return response
    },
}

const getters = {
    profile: ({ profile }) => profile,
    beats: ({ beats }) => {
        return beats.map(beat => {
            return {
                ...beat,
                coverart: beat.data_image || appConstants.defaultCoverArt,
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
