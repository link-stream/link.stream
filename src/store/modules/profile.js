/**
 * Profile Module
 */

import { commonTypes, profileTypes } from '../mutationTypes'
import { api } from '~/services'
// import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @type {null|object}
     */
    profile: null,
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
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    async getProfile({ commit }, { url }) {
        console.log(url)
        const response = await api.profiles.getProfile(url)
        console.log(response)
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_PROFILE, { profile: data })
        return response
    },
}

const getters = {
    profile: ({ profile }) => profile,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
