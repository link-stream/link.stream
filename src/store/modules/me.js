/**
 * Logged In User Module
 */

import { types, meTypes } from '../mutationTypes'
import { api } from '~/services/api'
import { base64ImgToSrc } from '~/utils'

const initialState = () => ({
    user: null,
    visibilities: [],
    tracks: [],
    videos: [],
    links: [],
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
     * General
     */

    [meTypes.SET_VISIBILITIES](state, { visibilities }) {
        state.visibilities = visibilities
    },

    [meTypes.SET_TRACKS](state, { tracks }) {
        state.tracks = tracks
    },

    [meTypes.SET_USER](state, { user }) {
        state.user = user
    },

    /**
     * Videos
     */

    [meTypes.SET_VIDEOS](state, { videos }) {
        state.videos = videos
    },

    [meTypes.ADD_VIDEO](state, { video }) {
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
        state.links.push(link)
    },

    [meTypes.DELETE_LINK](state, { link }) {
        const { links } = state
        const index = links.map(l => l.id).indexOf(link.id)
        links.splice(index, 1)
    },
}

const actions = {
    reset: {
        root: true,
        handler({ commit }) {
            commit(types.RESET)
        },
    },

    /**
     * Misc
     */

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
        const res = await api.videos.getVideosByUser(state.user.id, params)
        commit({
            type: meTypes.SET_VIDEOS,
            videos: res.status === 'success' ? res.data : [],
        })
        return res
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

    async deleteVideo({ state, commit }, { video }) {
        const res = await api.videos.deleteVideo(video.id, {
            user_id: state.user.id,
        })
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
        const res = await api.links.getLinksByUser(state.user.id)
        res.status === 'success' &&
            commit(meTypes.SET_LINKS, { links: res.data })
        return res
    },

    async createLink({ commit }, { params }) {
        const res = await api.links.createLink(params)
        res.status === 'success' && commit(meTypes.ADD_LINK, { link: res.data })
        return res
    },

    async deleteLink({ commit }, { link }) {
        const res = await api.links.deleteLink(link.id)
        res.status === 'success' && commit(meTypes.DELETE_LINK, { link })
        return res
    },
}

const getters = {
    user: state => state.user,
    visibilities: state => state.visibilities,
    tracks: state => state.tracks,
    videos: state => state.videos,
    links: state => state.links,
    avatar: state => {
        const { user } = state
        if (user) {
            return base64ImgToSrc(user.data_image)
        }
        return null
    },
    profileBanner: state => {
        const { user } = state
        if (user) {
            return base64ImgToSrc(user.data_banner)
        }
        return null
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
