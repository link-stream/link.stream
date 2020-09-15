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
    },
    messages: [],
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
        for (const [key, value] of Object.entries(sendtos)) {
            state.sendtos.push({
                value: key,
                title: value,
            })
        }
    },

    [marketingTypes.SET_SMS_DATA](state, { smsData }) {
        state.smsData = smsData
    },

    [marketingTypes.SET_MESSAGES](state, { messages }) {
        state.messages = messages
    },

    [marketingTypes.ADD_MESSAGE](state, { message }) {
        state.messages.push(message)
    },

    [marketingTypes.UPDATE_MESSAGE](state, { message }) {
        const index = state.messages.findIndex(({ id }) => id == message.id)
        index > -1 && state.messages.splice(index, 1, message)
    },

    [marketingTypes.DELETE_MESSAGE](state, { message_id }) {
        const index = state.messages.findIndex(({ id }) => id == message_id)
        index > -1 && state.messages.splice(index, 1)
    },
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    async getMessageSendto({ commit, state, rootGetters }) {
        if (state.sendtos.length > 0) return
        const user = rootGetters['auth/user']
        const response = await api.marketing.getMessageSendto(user.id)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.SET_SEND_TO, { sendtos: data })
    },

    async setSMSData({ commit }, params) {
        commit(marketingTypes.SET_SMS_DATA, { smsData: params })
    },
    async getMessages({ commit, rootGetters }) {
        // if (state.messages.length > 0) return
        const user = rootGetters['auth/user']
        const response = await api.marketing.getMessages(user.id)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.SET_MESSAGES, { messages: data })
    },
    async insertMessage({ commit }, params) {
        const response = await api.marketing.insertMessage(params)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.ADD_MESSAGE, { message: data })
        return response
    },
    async updateMessage({ commit }, { id, params }) {
        const response = await api.marketing.updateMessage(id, params)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.UPDATE_MESSAGE, { message: data })
        return response
    },
    async deleteMessage({ commit }, { id }) {
        const response = await api.marketing.deleteMessage(id)
        const { status } = response
        status === 'success' &&
            commit(marketingTypes.DELETE_MESSAGE, { message_id: id })
        return response
    },
}

const getters = {
    sendtos: ({ sendtos }) => sendtos,
    smsData: ({ smsData }) => smsData,
    messages: ({ messages }) => messages,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
