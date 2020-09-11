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
    smsData: {
        scheduled: false,
    }
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

    [marketingTypes.SET_SMS_DATA](state, { smsData }) {
        state.smsData = smsData
    }
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
        status === 'success' &&
            commit(marketingTypes.SET_SEND_TO, { sendtos: data })
        return response
    },

    async setSMSData({ commit }, param) {
        commit(marketingTypes.SET_SMS_DATA, { smsData: param })
    }
}

const getters = {
    sendtos: ({ sendtos }) => sendtos,
    smsData: ({ smsData }) => smsData,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
