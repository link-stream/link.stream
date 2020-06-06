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
    visibilities: [],
    tracks: [],
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

    [meTypes.SET_VISIBILITIES](state, { visibilities }) {
        state.visibilities = visibilities
    },

    [meTypes.SET_LICENSES](state, { licenses }) {
        state.licenses = licenses
    },

    /**
     * Tracks
     */

    [meTypes.SET_TRACKS](state, { tracks }) {
        state.tracks = tracks
    },

    /**
     * Videos
     */

    [meTypes.SET_VIDEOS](state, { videos }) {
        state.videos = videos
    },

    [meTypes.UPDATE_VIDEO](state, { video }) {
        const { videos } = state
        const index = videos.map(v => v.id).indexOf(video.id)
        index > -1 && videos.splice(index, 1, video)
    },

    [meTypes.DELETE_VIDEO](state, { video }) {
        const { videos } = state
        const index = videos.map(v => v.id).indexOf(video.id)
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
        const index = links.map(l => l.id).indexOf(link.id)
        index > -1 && links.splice(index, 1, link)
    },

    [meTypes.DELETE_LINK](state, { link }) {
        const { links } = state
        const index = links.map(l => l.id).indexOf(link.id)
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

    async loadVisibilities({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await api.common.getVisibilitiesByUser(
            authUser.id
        )
        commit({
            type: meTypes.SET_VISIBILITIES,
            visibilities: status === 'success' ? data : [],
        })
    },

    loadAccount({ dispatch }) {
        dispatch('loadProfile')
    },

    updateProfile({ commit }, { user }) {
        commit(meTypes.SET_USER, { user })
    },

    async loadProfile({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await api.users.getUser(authUser.id)
        status === 'success' && commit(meTypes.SET_USER, { user: data })
    },

    async loadLicenses({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await api.licenses.getLicensesByUser(
            authUser.id
        )
        commit({
            type: meTypes.SET_LICENSES,
            licenses: status === 'success' ? data : [],
        })
    },

    /**
     * Tracks
     */

    async loadTracks({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await api.audios.getTracksByUser(authUser.id)
        commit({
            type: meTypes.SET_TRACKS,
            tracks: status === 'success' ? data : [],
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
    visibilities: ({ visibilities }) => visibilities,
    tracks: ({ tracks }) => tracks,
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
    links: ({ links }) => {
        return links.map(link => {
            return {
                ...link,
                artwork: link.data_image || appConstants.defaultArtwork,
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
