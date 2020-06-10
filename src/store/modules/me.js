/**
 * User Account Module
 */

import { types, meTypes } from '../mutationTypes'
import { api } from '~/services/api'
import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @type {object}
     */
    user: null,
    beats: [],
    videos: [],
    links: [],
    licenses: [],
})

const state = initialState()

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    /**
     * User
     */

    [meTypes.SET_USER](state, { user }) {
        state.user = user
    },

    [meTypes.SET_LICENSES](state, { licenses }) {
        state.licenses = licenses
    },

    /**
     * Beats
     */

    [meTypes.SET_BEATS](state, { beats }) {
        state.beats = beats
    },

    [meTypes.DELETE_BEAT](state, { beat }) {
        const { beats } = state
        const index = beats.map(({ id }) => id).indexOf(beat.id)
        beats.splice(index, 1)
    },

    [meTypes.REORDER_BEAT](state, { oldIndex, newIndex }) {
        const { beats } = state
        const beat = beats[oldIndex]
        beats.splice(oldIndex, 1)
        beats.splice(newIndex, 0, beat)
    },

    /**
     * Videos
     */

    [meTypes.SET_VIDEOS](state, { videos }) {
        state.videos = videos
    },

    [meTypes.UPDATE_VIDEO](state, { video }) {
        const { videos } = state
        const index = videos.map(({ id }) => id).indexOf(video.id)
        index > -1 && videos.splice(index, 1, video)
    },

    [meTypes.DELETE_VIDEO](state, { video }) {
        const { videos } = state
        const index = videos.map(({ id }) => id).indexOf(video.id)
        videos.splice(index, 1)
    },

    [meTypes.REORDER_VIDEO](state, { oldIndex, newIndex }) {
        const { videos } = state
        const video = videos[oldIndex]
        videos.splice(oldIndex, 1)
        videos.splice(newIndex, 0, video)
    },

    /**
     * Links
     */

    [meTypes.SET_LINKS](state, { links }) {
        state.links = links
    },

    [meTypes.UPDATE_LINK](state, { link }) {
        const { links } = state
        const index = links.map(({ id }) => id).indexOf(link.id)
        index > -1 && links.splice(index, 1, link)
    },

    [meTypes.DELETE_LINK](state, { link }) {
        const { links } = state
        const index = links.map(({ id }) => id).indexOf(link.id)
        links.splice(index, 1)
    },

    [meTypes.REORDER_LINK](state, { oldIndex, newIndex }) {
        const { links } = state
        const link = links[oldIndex]
        links.splice(oldIndex, 1)
        links.splice(newIndex, 0, link)
    },
}

const actions = {
    reset({ commit }) {
        commit(types.RESET)
    },

    /**
     * User
     */

    loadAccount({ dispatch }) {
        dispatch('loadProfile')
    },

    updateProfile({ commit }, { user }) {
        commit(meTypes.SET_USER, { user })
    },

    async loadProfile({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const { status, data } = await api.users.getUser(user.id)
        status === 'success' && commit(meTypes.SET_USER, { user: data })
    },

    async loadLicenses({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const { status, data } = await api.licenses.getLicensesByUser(user.id)
        commit({
            type: meTypes.SET_LICENSES,
            licenses: status === 'success' ? data : [],
        })
    },

    /**
     * Beats
     */

    async loadBeats({ commit, rootGetters }) {
        const user = rootGetters['auth/user']
        const { status, data } = await api.audios.getBeatsByUser(user.id)
        commit({
            type: meTypes.SET_BEATS,
            beats: status === 'success' ? data : [],
        })
    },

    async deleteBeat({ commit }, { beat }) {
        const response = await api.audios.deleteBeat(beat.id)
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

    /**
     * Videos
     */

    async loadVideos({ state, commit }, { params }) {
        const { status, data } = await api.videos.getVideosByUser(
            state.user.id,
            params
        )
        commit({
            type: meTypes.SET_VIDEOS,
            videos: status === 'success' ? data : [],
        })
    },

    async createVideo(context, { params }) {
        return await api.videos.createVideo(params)
    },

    async updateVideo({ commit }, { id, params }) {
        const response = await api.videos.updateVideo(id, params)
        const { status, data } = response
        status === 'success' && commit(meTypes.UPDATE_VIDEO, { video: data })
        return response
    },

    async deleteVideo({ commit }, { video }) {
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

    /**
     * Links
     */

    async loadLinks({ state, commit }) {
        const { status, data } = await api.links.getLinksByUser(state.user.id)
        status === 'success' && commit(meTypes.SET_LINKS, { links: data })
    },

    async createLink(context, { params }) {
        return await api.links.createLink(params)
    },

    async updateLink({ commit }, { id, params }) {
        const response = await api.links.updateLink(id, params)
        const { status, data } = response
        status === 'success' && commit(meTypes.UPDATE_LINK, { link: data })
        return response
    },

    async deleteLink({ commit }, { link }) {
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
}

const getters = {
    licenses: ({ licenses }) => licenses,
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
    beats: ({ beats }) => {
        return beats.map(beat => {
            return {
                ...beat,
                coverart: beat.data_image || appConstants.coverartDefault,
                isPublic: beat.public == '1',
                isPrivate: beat.public == '2',
            }
        })
    },
    links: ({ links }) => {
        return links.map(link => {
            return {
                ...link,
                coverart: link.data_image || appConstants.coverartDefault,
                isPublic: link.public == '1',
                isPrivate: link.public == '2',
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
