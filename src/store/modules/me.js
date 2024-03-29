/**
 * Account Module
 */

import { commonTypes, meTypes } from '../mutationTypes'
import { api } from '~/services'
import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @type {null|object}
     */
    user: null,
    licenses: [],
    videos: [],
    links: [],
    beats: [],
    soundKits: [],
    beatPacks: [],
    relatedTracks: [],
    relatedBeatPacks: [],
    purchases: [],
    paymentMethods: [],
    bankInfo: {},
    notification: {},
})

const state = initialState()

const mutations = {
    [commonTypes.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    // User

    [meTypes.SET_USER](state, { user }) {
        state.user = user
    },

    // Licenses

    [meTypes.SET_LICENSES](state, { licenses }) {
        state.licenses = licenses
    },

    [meTypes.UPDATE_LICENSE]({ licenses }, { license }) {
        const index = licenses.findIndex(({ id }) => id == license.id)
        index > -1 && licenses.splice(index, 1, license)
    },

    // Beats

    [meTypes.SET_BEATS](state, { beats }) {
        state.beats = beats
    },

    [meTypes.ADD_BEAT](state, { beat }) {
        state.beats.push(beat)
    },

    [meTypes.UPDATE_BEAT]({ beats }, { beat }) {
        const index = beats.findIndex(({ id }) => id == beat.id)
        index > -1 && beats.splice(index, 1, beat)
    },

    [meTypes.DELETE_BEAT]({ beats }, { beat }) {
        const index = beats.findIndex(({ id }) => id == beat.id)
        beats.splice(index, 1)
    },

    [meTypes.REORDER_BEAT]({ beats }, { oldIndex, newIndex }) {
        const beat = beats[oldIndex]
        beats.splice(oldIndex, 1)
        beats.splice(newIndex, 0, beat)
    },

    // Sound Kits

    [meTypes.SET_SOUND_KITS](state, { soundKits }) {
        state.soundKits = soundKits
    },

    [meTypes.ADD_SOUND_KIT](state, { soundKit }) {
        state.soundKits.push(soundKit)
    },

    [meTypes.UPDATE_SOUND_KIT]({ soundKits }, { soundKit }) {
        const index = soundKits.findIndex(({ id }) => id == soundKit.id)
        index > -1 && soundKits.splice(index, 1, soundKit)
    },

    [meTypes.DELETE_SOUND_KIT]({ soundKits }, { soundKit }) {
        const index = soundKits.findIndex(({ id }) => id == soundKit.id)
        soundKits.splice(index, 1)
    },

    [meTypes.REORDER_SOUND_KIT]({ soundKits }, { oldIndex, newIndex }) {
        const soundKit = soundKits[oldIndex]
        soundKits.splice(oldIndex, 1)
        soundKits.splice(newIndex, 0, soundKit)
    },

    // Beat Packs

    [meTypes.SET_BEAT_PACKS](state, { beatPacks }) {
        state.beatPacks = beatPacks
    },

    [meTypes.ADD_BEAT_PACK](state, { beatPack }) {
        state.beatPacks.push(beatPack)
    },

    [meTypes.UPDATE_BEAT_PACK]({ beatPacks }, { beatPack }) {
        const index = beatPacks.findIndex(({ id }) => id == beatPack.id)
        index > -1 && beatPacks.splice(index, 1, beatPack)
    },

    [meTypes.DELETE_BEAT_PACK]({ beatPacks }, { beatPack }) {
        const index = beatPacks.findIndex(({ id }) => id == beatPack.id)
        beatPacks.splice(index, 1)
    },

    [meTypes.REORDER_BEAT_PACK]({ beatPacks }, { oldIndex, newIndex }) {
        const beatPack = beatPacks[oldIndex]
        beatPacks.splice(oldIndex, 1)
        beatPacks.splice(newIndex, 0, beatPack)
    },

    [meTypes.SET_RELATED_BEAT_PACK](state, { relatedBeatPacks }) {
        state.relatedBeatPacks = relatedBeatPacks
    },

    // Videos

    [meTypes.SET_VIDEOS](state, { videos }) {
        state.videos = videos
    },

    [meTypes.ADD_VIDEO](state, { video }) {
        state.videos.push(video)
    },

    [meTypes.UPDATE_VIDEO]({ videos }, { video }) {
        const index = videos.findIndex(({ id }) => id == video.id)
        index > -1 && videos.splice(index, 1, video)
    },

    [meTypes.DELETE_VIDEO]({ videos }, { video }) {
        const index = videos.findIndex(({ id }) => id == video.id)
        videos.splice(index, 1)
    },

    [meTypes.REORDER_VIDEO]({ videos }, { oldIndex, newIndex }) {
        const video = videos[oldIndex]
        videos.splice(oldIndex, 1)
        videos.splice(newIndex, 0, video)
    },

    [meTypes.SET_RELATED_TRACKS](state, { relatedTracks }) {
        state.relatedTracks = relatedTracks
    },

    // Links

    [meTypes.SET_LINKS](state, { links }) {
        state.links = links
    },

    [meTypes.ADD_LINK](state, { link }) {
        state.links.push(link)
    },

    [meTypes.UPDATE_LINK]({ links }, { link }) {
        const index = links.findIndex(({ id }) => id == link.id)
        index > -1 && links.splice(index, 1, link)
    },

    [meTypes.DELETE_LINK]({ links }, { link }) {
        const index = links.findIndex(({ id }) => id == link.id)
        links.splice(index, 1)
    },

    [meTypes.REORDER_LINK]({ links }, { oldIndex, newIndex }) {
        const link = links[oldIndex]
        links.splice(oldIndex, 1)
        links.splice(newIndex, 0, link)
    },

    //Account

    [meTypes.SET_PURCHASES](state, { purchases }) {
        state.purchases = purchases
    },

    [meTypes.SET_PAYMENT_METHODS](state, { paymentMethods }) {
        state.paymentMethods = paymentMethods
    },

    [meTypes.ADD_PAYMENT_METHOD](state, { paymentMethod }) {
        state.paymentMethods.push(paymentMethod)
    },

    [meTypes.UPDATE_PAYMENT_METHOD]({ paymentMethods }, { payment_id }) {
        paymentMethods.forEach(element => {
            element.is_default = element.id === payment_id ? 1 : 0
        })
    },

    [meTypes.DELETE_PAYMENT_METHOD]({ paymentMethods }, { paymentMethod }) {
        const index = paymentMethods.findIndex(
            ({ id }) => id == paymentMethod.id
        )
        paymentMethods.splice(index, 1)
    },

    [meTypes.SET_BANK_INFO](state, { params }) {
        state.bankInfo = params
    },

    [meTypes.SET_NOTIFICATION](state, { notification }) {
        state.notification = notification
    },
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    // User

    loadAccount({ dispatch }) {
        dispatch('loadProfile')
    },

    updateProfile({ commit }, { user }) {
        commit(meTypes.SET_USER, { user })
    },

    async updateUser({ commit }, { id, params }) {
        const response = await api.users.updateUser(id, params)
        const { status, data } = response
        if (status === 'success') {
            commit(meTypes.SET_USER, { user: data })
        }
        return response
    },

    async loadProfile({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const { status, data } = await api.users.getUser(user.id)
        status === 'success' && commit(meTypes.SET_USER, { user: data })
    },

    // Licenses

    async loadLicenses({ state, commit, rootGetters }) {
        if (state.licenses.length) {
            return
        }
        const user = rootGetters['auth/user']
        const { status, data } = await api.licenses.getLicensesByUser(user.id)
        commit({
            type: meTypes.SET_LICENSES,
            licenses: status === 'success' ? data : [],
        })
    },

    async updateLicense({ commit }, { id, params }) {
        const response = await api.licenses.updateLicense(id, params)
        const { status, data } = response
        status === 'success' &&
            commit(meTypes.UPDATE_LICENSE, { license: data })
        return response
    },

    // Beats

    async loadBeats({ state, commit, rootGetters }) {
        if (state.beats.length) {
            return
        }
        const user = rootGetters['auth/user']
        const { status, data } = await api.audios.getBeatsByUser(user.id)
        commit({
            type: meTypes.SET_BEATS,
            beats: status === 'success' ? data : [],
        })
    },

    async createBeat({ commit }, { params }) {
        const response = await api.audios.createAudio(params)
        const { status, data } = response
        if (status === 'success') {
            commit(meTypes.ADD_BEAT, { beat: data })
        }
        return response
    },

    async updateBeat({ commit }, { id, params }) {
        const response = await api.audios.updateAudio(id, params)
        const { status, data } = response
        status === 'success' && commit(meTypes.UPDATE_BEAT, { beat: data })
        return response
    },

    async deleteBeat({ commit }, beat) {
        const response = await api.audios.deleteAudio(beat.id)
        const { status } = response
        status === 'success' && commit(meTypes.DELETE_BEAT, { beat })
        return response
    },

    reorderBeat({ state, commit }, { oldIndex, newIndex, sorts }) {
        commit(meTypes.REORDER_BEAT, { oldIndex, newIndex })
        api.audios.sortAudios({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    // Sound Kits

    async loadSoundKits({ state, commit, rootGetters }) {
        if (state.soundKits.length) {
            return
        }
        const user = rootGetters['auth/user']
        const { status, data } = await api.audios.getSoundKitsByUser(user.id)
        commit({
            type: meTypes.SET_SOUND_KITS,
            soundKits: status === 'success' ? data : [],
        })
    },

    async createSoundKit({ commit }, { params }) {
        const response = await api.audios.createAudio(params)
        const { status, data } = response
        if (status === 'success') {
            commit(meTypes.ADD_SOUND_KIT, { soundKit: data })
        }
        return response
    },

    async updateSoundKit({ commit }, { id, params }) {
        const response = await api.audios.updateAudio(id, params)
        const { status, data } = response
        status === 'success' &&
            commit(meTypes.UPDATE_SOUND_KIT, { soundKit: data })
        return response
    },

    async deleteSoundKit({ commit }, soundKit) {
        const response = await api.audios.deleteAudio(soundKit.id)
        const { status } = response
        status === 'success' && commit(meTypes.DELETE_SOUND_KIT, { soundKit })
        return response
    },

    reorderSoundKit({ state, commit }, { oldIndex, newIndex, sorts }) {
        commit(meTypes.REORDER_SOUND_KIT, { oldIndex, newIndex })
        api.audios.sortAudios({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    // Beat Packs

    async loadBeatPacks({ state, commit, rootGetters }) {
        if (state.beatPacks.length) {
            return
        }
        const user = rootGetters['auth/user']
        const { status, data } = await api.albums.getAlbumsByUser(user.id)
        commit({
            type: meTypes.SET_BEAT_PACKS,
            beatPacks: status === 'success' ? data : [],
        })
    },

    async createBeatPack({ commit }, { params }) {
        const response = await api.albums.createAlbum(params)
        const { status, data } = response
        if (status === 'success') {
            commit(meTypes.ADD_BEAT_PACK, { beatPack: data })
        }
        return response
    },

    async updateBeatPack({ commit }, { id, params }) {
        const response = await api.albums.updateAlbum(id, params)
        const { status, data } = response
        status === 'success' &&
            commit(meTypes.UPDATE_BEAT_PACK, { beatPack: data })
        return response
    },

    async deleteBeatPack({ commit }, beatPack) {
        const response = await api.albums.deleteAlbum(beatPack.id)
        const { status } = response
        status === 'success' && commit(meTypes.DELETE_BEAT_PACK, { beatPack })
        return response
    },

    reorderBeatPack({ state, commit }, { oldIndex, newIndex, sorts }) {
        commit(meTypes.REORDER_BEAT_PACK, { oldIndex, newIndex })
        api.albums.sortAlbums({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    async loadRelatedTracks({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const { status, data } = await api.audios.getRelatedTracks(user.id)
        commit({
            type: meTypes.SET_RELATED_TRACKS,
            relatedTracks: status === 'success' ? data : [],
        })
    },

    async loadRelatedBeatPacks({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const { status, data } = await api.albums.getRelatedAlbums(user.id, 2)
        commit({
            type: meTypes.SET_RELATED_BEAT_PACK,
            relatedBeatPacks: status === 'success' ? data : [],
        })
    },

    // Videos

    async loadVideos({ state, commit }, { params }) {
        if (state.videos.length) {
            return
        }
        const { status, data } = await api.videos.getVideosByUser(
            state.user.id,
            params
        )
        commit({
            type: meTypes.SET_VIDEOS,
            videos: status === 'success' ? data : [],
        })
    },

    async createVideo({ commit }, { params }) {
        const response = await api.videos.createVideo(params)
        const { status, data } = response
        if (status === 'success') {
            commit(meTypes.ADD_VIDEO, { video: data })
        }
        return response
    },

    async updateVideo({ commit }, { id, params }) {
        const response = await api.videos.updateVideo(id, params)
        const { status, data } = response
        status === 'success' && commit(meTypes.UPDATE_VIDEO, { video: data })
        return response
    },

    async deleteVideo({ commit }, video) {
        const response = await api.videos.deleteVideo(video.id)
        const { status } = response
        status === 'success' && commit(meTypes.DELETE_VIDEO, { video })
        return response
    },

    reorderVideo({ state, commit }, { oldIndex, newIndex, sorts }) {
        commit(meTypes.REORDER_VIDEO, { oldIndex, newIndex })
        api.videos.sortVideos({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    // Links

    async loadLinks({ state, commit }) {
        if (state.links.length) {
            return
        }
        const { status, data } = await api.links.getLinksByUser(state.user.id)
        status === 'success' && commit(meTypes.SET_LINKS, { links: data })
    },

    async createLink({ commit }, { params }) {
        const response = await api.links.createLink(params)
        const { status, data } = response
        if (status === 'success') {
            commit(meTypes.ADD_LINK, { link: data })
        }
        return response
    },

    async updateLink({ commit }, { id, params }) {
        const response = await api.links.updateLink(id, params)
        const { status, data } = response
        status === 'success' && commit(meTypes.UPDATE_LINK, { link: data })
        return response
    },

    async deleteLink({ commit }, link) {
        const response = await api.links.deleteLink(link.id)
        const { status } = response
        status === 'success' && commit(meTypes.DELETE_LINK, { link })
        return response
    },

    reorderLink({ state, commit }, { oldIndex, newIndex, sorts }) {
        commit(meTypes.REORDER_LINK, { oldIndex, newIndex })
        api.links.sortLinks({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    //Account

    async loadPurchases({ state, commit }) {
        if (state.purchases.length) {
            return
        }
        const { status, data } = await api.account.getPurchases(state.user.id)
        status === 'success' &&
            commit(meTypes.SET_PURCHASES, { purchases: data })
    },

    async loadPaymentMethods({ state, commit }) {
        const { status, data } = await api.account.getPaymentMethodsByUser(
            state.user.id
        )
        commit({
            type: meTypes.SET_PAYMENT_METHODS,
            paymentMethods: status === 'success' ? data : [],
        })
    },

    // eslint-disable-next-line
    async createPaymentMethod({ commit }, { params }) {
        const response = await api.account.insertPaymentMethod(params)
        return response
    },

    async updatePaymentMethod({ commit }, { payment_id, params }) {
        const response = await api.account.updatePaymentMethod(
            payment_id,
            params
        )
        const { status } = response
        status === 'success' &&
            commit(meTypes.UPDATE_PAYMENT_METHOD, { payment_id })
        return response
    },

    async deletePaymentMethod({ commit }, paymentMethod) {
        const response = await api.account.deletePaymentMethod(paymentMethod.id)
        const { status } = response
        status === 'success' &&
            commit(meTypes.DELETE_PAYMENT_METHOD, { paymentMethod })
        return response
    },

    async addBankInfo({ commit }, { params }) {
        commit(meTypes.SET_BANK_INFO, { params })
        return {
            status: 'success',
            message: 'The Bank info has been added successfully',
        }
    },

    async loadNotification({ state, commit }) {
        const response = await api.account.getNotification(state.user.id)
        const { status, data } = response
        status === 'success' &&
            commit({
                type: meTypes.SET_NOTIFICATION,
                notification: data.length > 0 ? data[0] : {},
            })
    },

    async updateNotification({ commit }, { id, params }) {
        const response = await api.account.updateNotification(id, params)
        const { status, data } = response
        status === 'success' &&
            commit({
                type: meTypes.SET_NOTIFICATION,
                notification: data,
            })
        return response
    },
}

const getters = {
    licenses: ({ licenses }) => licenses,
    findLicenseById: ({ licenses }) => {
        return id => {
            return licenses.find(license => license.id == id)
        }
    },
    findBeatById: ({ beats }) => {
        return id => {
            return beats.find(beat => beat.id == id)
        }
    },
    user: ({ user }) => {
        if (!user) {
            return null
        }
        return {
            ...user,
            photo: user.data_image,
            banner: user.data_banner,
        }
    },
    videos: ({ videos }) => {
        return videos.map(video => {
            return {
                ...video,
                isPublic: video.public == '1',
                isPrivate: video.public == '2',
            }
        })
    },
    links: ({ links }) => {
        return links.map(link => {
            return {
                ...link,
                coverart: link.data_image || appConstants.defaultCoverArt,
                isPublic: link.public == '1',
                isPrivate: link.public == '2',
            }
        })
    },
    beats: ({ beats }) => {
        return beats.map(beat => {
            return {
                ...beat,
                coverart: beat.data_image || appConstants.defaultCoverArt,
                isPublic: beat.public == '1',
                isPrivate: beat.public == '2',
            }
        })
    },
    soundKits: ({ soundKits }) => {
        return soundKits.map(kit => {
            return {
                ...kit,
                coverart: kit.data_image || appConstants.defaultCoverArt,
                isPublic: kit.public == '1',
                isPrivate: kit.public == '2',
            }
        })
    },
    beatPacks: ({ beatPacks }) => {
        return beatPacks.map(pack => {
            return {
                ...pack,
                coverart: pack.data_image || appConstants.defaultCoverArt,
                isPublic: pack.public == '1',
                isPrivate: pack.public == '2',
            }
        })
    },

    relatedTracks: ({ relatedTracks }) => relatedTracks,
    relatedBeatPacks: ({ relatedBeatPacks, beatPacks }) => {
        return relatedBeatPacks.map(pack => {
            let findBeatPack = beatPacks.find(item => item.id == pack.id)
            return {
                ...findBeatPack,
                coverart:
                    findBeatPack.data_image || appConstants.defaultCoverArt,
                isPublic: findBeatPack.public == '1',
                isPrivate: findBeatPack.public == '2',
            }
        })
    },
    purchases: ({ purchases }) => purchases,
    paymentMethods: ({ paymentMethods }) => paymentMethods,
    bankInfo: ({ bankInfo }) => bankInfo,
    notification: ({ notification }) => notification,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
