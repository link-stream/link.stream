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
    subscribers: [],
    tags: [],
    importSubscribers: [],
    importData: {},
    currentSubscriber: {},
    splitTestData: {
        title: '',
    },
    variationData: {},
    variations: [],
    medias: [],
    promotes: [],
    googleUserInfo: {
        userName: '',
        token: '',
    },
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
        state.sendtos = []
        for (const [key, value] of Object.entries(sendtos)) {
            state.sendtos.push({
                value: key,
                text: value,
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

    [marketingTypes.SET_PROMOTES](state, { promotes }) {
        state.promotes = promotes
    },

    [marketingTypes.SET_SUBSCRIBERS](state, { subscribers }) {
        state.subscribers = subscribers
    },

    [marketingTypes.ADD_SUBSCRIBER](state, { subscriber }) {
        state.subscribers.push(subscriber)
    },

    [marketingTypes.UPDATE_SUBSCRIBER](state, { subscriber }) {
        const index = state.subscribers.findIndex(
            ({ id }) => id == subscriber.id
        )
        index > -1 && state.subscribers.splice(index, 1, subscriber)
    },

    [marketingTypes.SET_TAGS](state, { tags }) {
        state.tags = []
        for (const [key, value] of Object.entries(tags)) {
            state.tags.push({
                value: key,
                text: value,
            })
        }
    },

    [marketingTypes.UPDATE_SUBSCRIBERS_STATUS](state, { params }) {
        const selIdList = JSON.parse(params.list)
        const aryTemp = params.action.split('_')
        const curStatus =
            aryTemp[0] === 'unsubscribe' ? 'unsubscribed' : 'subscribed'
        let flag = 2
        if (aryTemp.length === 2) {
            flag = aryTemp[1] === 'email' ? 1 : 3
        }
        selIdList.forEach(({ id }) => {
            let findIndex = state.subscribers.findIndex(item => item.id === id)
            const newItem = {
                ...state.subscribers[findIndex],
                sms_status:
                    flag >= 2
                        ? curStatus
                        : state.subscribers[findIndex].sms_status,
                email_status:
                    flag <= 2
                        ? curStatus
                        : state.subscribers[findIndex].email_status,
            }
            state.subscribers.splice(findIndex, 1, newItem)
        })
    },

    [marketingTypes.SET_IMPORT_SUBSCRIBERS](state, { subscribers }) {
        state.importSubscribers = subscribers
    },

    [marketingTypes.SET_IMPORT_DATA](state, { importData }) {
        state.importData = importData
    },

    [marketingTypes.SET_CURRENT_SUBSCRIBER](state, { subscriber }) {
        state.currentSubscriber = subscriber
    },

    [marketingTypes.SET_MEDIAS](state, { medias }) {
        state.medias = medias
    },

    [marketingTypes.ADD_MEDIA](state, { media }) {
        state.medias.push(media)
    },

    [marketingTypes.DELETE_MEDIA](state, { media_id }) {
        const findIndex = state.medias.findIndex(({ id }) => id === media_id)
        state.medias.splice(findIndex, 1)
    },

    [marketingTypes.SET_SPLIT_TEST_DATA](state, { splitTestData }) {
        state.splitTestData = splitTestData
    },

    [marketingTypes.SET_VARIATION_DATA](state, { variationData }) {
        state.variationData = variationData
    },

    [marketingTypes.ADD_VARIATION](state, { variation }) {
        state.variations.push(variation)
    },

    [marketingTypes.SET_VARIATIONS](state, { variations }) {
        state.variations = variations
    },

    [marketingTypes.SET_GOOGLE_USER_INFO](state, params) {
        state.googleUserInfo = params
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
    async getMarketingPromotes({ commit, rootGetters }) {
        if (state.promotes.length > 0) return
        const user = rootGetters['auth/user']
        const response = await api.marketing.getMarketingPromotes(user.id)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.SET_PROMOTES, { promotes: data })
    },
    async getSubscribers({ commit, rootGetters }, searchString = '') {
        // if (state.subscribers.length > 0) return
        const user = rootGetters['auth/user']
        const response = await api.marketing.getSubscribers(
            user.id,
            searchString
        )
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.SET_SUBSCRIBERS, { subscribers: data })
    },
    async insertSubscriber({ commit }, params) {
        const response = await api.marketing.insertSubscriber(params)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.ADD_SUBSCRIBER, { subscriber: data })
        return response
    },
    async updateSubscriber({ commit }, { id, params }) {
        const response = await api.marketing.updateSubscriber(id, params)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.UPDATE_SUBSCRIBER, { subscriber: data })
        return response
    },
    async getTags({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const response = await api.marketing.getSubscriberTags(user.id)
        const { status, data } = response
        status === 'success' && commit(marketingTypes.SET_TAGS, { tags: data })
    },
    async updateSubscribersStatus({ commit }, params) {
        const response = await api.marketing.updateSubscribersStatus(params)
        const { status } = response
        status === 'success' &&
            commit(marketingTypes.UPDATE_SUBSCRIBERS_STATUS, { params: params })
        return response
    },
    async setImportSubscribers({ commit }, params) {
        commit(marketingTypes.SET_IMPORT_SUBSCRIBERS, { subscribers: params })
    },
    // eslint-disable-next-line
    async importSubscribers({ commit }, params) {
        const response = await api.marketing.importSubscribers(params)
        return response
    },
    async setImportData({ commit }, params) {
        commit(marketingTypes.SET_IMPORT_DATA, { importData: params })
    },
    async setCurrentSubscriber({ commit }, params) {
        commit(marketingTypes.SET_CURRENT_SUBSCRIBER, { subscriber: params })
    },
    async getMedias({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const response = await api.marketing.getMedias(user.id)
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.SET_MEDIAS, { medias: data })
        return response
    },
    async addMedia({ commit, rootGetters }, params) {
        const user = rootGetters['auth/user']
        const response = await api.marketing.insertMedia({
            user_id: user.id,
            ...params,
        })
        const { status, data } = response
        status === 'success' &&
            commit(marketingTypes.ADD_MEDIA, { media: data })
        return response
    },
    async deleteMedia({ commit }, id) {
        const response = await api.marketing.deleteMedia(id)
        const { status } = response
        status === 'success' &&
            commit(marketingTypes.DELETE_MEDIA, { media_id: id })
        return response
    },

    async setSplitTestData({ commit }, params) {
        commit(marketingTypes.SET_SPLIT_TEST_DATA, { splitTestData: params })
    },
    async setVariationData({ commit }, params) {
        commit(marketingTypes.SET_VARIATION_DATA, { variationData: params })
    },
    async getVariations({ commit }) {
        commit(marketingTypes.SET_VARIATIONS, { variations: [] })
    },
    async addVariation({ commit }, params) {
        commit(marketingTypes.ADD_VARIATION, { variation: params })
    },

    async setGoogleUserInfo({ commit }, params) {
        commit(marketingTypes.SET_GOOGLE_USER_INFO, params)
    },
}

const getters = {
    sendtos: ({ sendtos }) => sendtos,
    smsData: ({ smsData }) => smsData,
    messages: ({ messages }) => messages,
    subscribers: ({ subscribers }) => subscribers,
    tags: ({ tags }) => tags,
    splitTestData: ({ splitTestData }) => splitTestData,
    variationData: ({ variationData }) => variationData,
    variations: ({ variations }) => variations,
    importSubscribers: ({ importSubscribers }) => importSubscribers,
    importData: ({ importData }) => importData,
    currentSubscriber: ({ currentSubscriber }) => currentSubscriber,
    medias: ({ medias }) => medias,
    promotes: ({ promotes }) => promotes,
    googleUserInfo: ({ googleUserInfo }) => googleUserInfo,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
