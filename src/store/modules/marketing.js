/**
 * Marketing Module
 */

import { commonTypes, marketingTypes } from '../mutationTypes'
import { api } from '~/services'
// import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @type {null|object}
     */
    sendtos: [],
})

const state = initialState()

const mutations = {
    [commonTypes.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [marketingTypes.SET_SEND_TO](state, { sendtos }) {
        state.sendtos = sendtos
    },
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    async getMessageSendto({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const response = await api.marketing.getMessageSendto(user.id)
        console.log(response)
        const { status, data } = response
        status === 'success' && commit(marketingTypes.SET_SEND_TO, { sendtos: data })
        return response
    },
}

const getters = {
    sendtos: ({ sendtos }) => sendtos,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
