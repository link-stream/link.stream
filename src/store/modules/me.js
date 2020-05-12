/**
 * User Account Module
 */

import { types, meTypes } from '../mutationTypes'
import { api } from '~/services/api'
import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @var {object}
     */
    user: null,
    /**
     * @var {array}
     */
    visibilities: null,
    /**
     * @var {array}
     */
    tracks: null,
    /**
     * @var {array}
     */
    videos: null,
    /**
     * @var {array}
     */
    links: null,
})

const state = initialState()

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [meTypes.SET_USER](state, { user }) {
        state.user = user
    },

    [meTypes.SET_VISIBILITIES](state, { visibilities }) {
        state.visibilities = visibilities
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

    [meTypes.ADD_VIDEO](state, { video }) {
        if (!state.videos) {
            state.videos = []
        }
        state.videos.push(video)
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

    [meTypes.ADD_LINK](state, { link }) {
        if (!state.links) {
            state.links = []
        }
        state.links.push(link)
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
    reset: {
        root: true,
        handler({ commit }) {
            commit(types.RESET)
        },
    },

    async loadVisibilities({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const res = await api.common.getVisibilitiesByUser(authUser.id)
        commit({
            type: meTypes.SET_VISIBILITIES,
            visibilities: res.status === 'success' ? res.data : [],
        })
    },

    loadAccount({ dispatch }) {
        const loadProfile = dispatch('loadProfile')
        const loadVisibilities = dispatch('loadVisibilities')
        const loadTracks = dispatch('loadTracks')
        const loadTimezones = dispatch('common/loadTimezones', null, {
            root: true,
        })
        const loadTimes = dispatch('common/loadTimes', null, { root: true })
        const loadGenres = dispatch('common/loadGenres', null, { root: true })
        return Promise.all([
            loadProfile,
            loadVisibilities,
            loadTracks,
            loadTimezones,
            loadTimes,
            loadGenres,
        ])
    },

    /**
     * Profile
     */

    updateProfile({ commit }, { user }) {
        commit(meTypes.SET_USER, { user })
    },

    async loadProfile({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await api.users.getUser(authUser.id)
        status === 'success' && commit(meTypes.SET_USER, { user: data })
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
        if (state.videos) {
            return
        }
        const res = await api.videos.getVideosByUser(state.user.id, params)
        commit({
            type: meTypes.SET_VIDEOS,
            videos: res.status === 'success' ? res.data : [],
        })
    },

    async createVideo({ commit }, { params }) {
        const res = await api.videos.createVideo(params)
        res.status === 'success' &&
            commit(meTypes.ADD_VIDEO, { video: res.data })
        return res
    },

    async updateVideo({ commit }, { id, params }) {
        const res = await api.videos.updateVideo(id, params)
        res.status === 'success' &&
            commit(meTypes.UPDATE_VIDEO, { video: res.data })
        return res
    },

    async deleteVideo({ commit }, { video }) {
        const res = await api.videos.deleteVideo(video.id)
        res.status === 'success' && commit(meTypes.DELETE_VIDEO, { video })
        return res
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
        if (state.links) {
            return
        }
        const res = await api.links.getLinksByUser(state.user.id)
        res.status === 'success' &&
            commit(meTypes.SET_LINKS, { links: res.data })
    },

    async createLink({ commit }, { params }) {
        const res = await api.links.createLink(params)
        res.status === 'success' && commit(meTypes.ADD_LINK, { link: res.data })
        return res
    },

    async updateLink({ commit }, { id, params }) {
        const res = await api.links.updateLink(id, params)
        res.status === 'success' &&
            commit(meTypes.UPDATE_LINK, { link: res.data })
        return res
    },

    async deleteLink({ commit }, { link }) {
        const res = await api.links.deleteLink(link.id)
        res.status === 'success' && commit(meTypes.DELETE_LINK, { link })
        return res
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
    user: state => {
        const user = state.user
        if (!user) {
            return null
        }
        return {
            ...user,
            photo: user.data_image,
            banner: user.data_banner,
        }
    },
    visibilities: state => state.visibilities || [],
    tracks: state => state.tracks || [],
    videos: state => {
        const videos = state.videos
        if (!videos) {
            return []
        }
        return videos.map(video => {
            return {
                ...video,
                isPublic: video.public == '1',
                isPrivate: video.public == '2',
            }
        })
    },
    links: state => {
        const links = state.links
        if (!links) {
            return []
        }
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
