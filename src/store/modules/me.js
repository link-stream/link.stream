/**
 * Logged In User Module
 */

import Vue from 'vue'
import { types, meTypes } from '../mutationTypes'
import { lsApi } from '~/services/lsApi'
import { base64ImgToSrc } from '~/utils'

const initialState = () => ({
    user: null,
    visibilities: null,
    tracks: null,
    videos: null,
})

const state = initialState()

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [meTypes.SET_VISIBILITIES](state, { visibilities }) {
        state.visibilities = visibilities
    },

    [meTypes.SET_TRACKS](state, { tracks }) {
        state.tracks = tracks
    },

    [meTypes.SET_USER](state, { user }) {
        state.user = user
    },

    [meTypes.SET_VIDEOS](state, { videos }) {
        state.videos = videos
    },

    [meTypes.ADD_VIDEO](state, { video }) {
        state.videos.push(video)
    },

    [meTypes.UPDATE_VIDEO](state, { video }) {
        const index = state.videos.map(v => v.id).indexOf(video.id)
        index > -1 && Vue.set(state.videos, index, video)
    },

    [meTypes.DELETE_VIDEO](state, { id }) {
        const index = state.videos.map(v => v.id).indexOf(id)
        Vue.delete(state.videos, index)
    },

    [meTypes.SORT_VIDEOS](state, { sorts }) {
        const videosMap = {}
        state.videos.forEach(v => (videosMap[v.id] = v))
        const sortedVideos = []
        sorts.forEach(sort => sortedVideos.push(videosMap[sort.id]))
        state.videos = sortedVideos
    },
}

const actions = {
    reset: {
        root: true,
        handler({ commit }) {
            commit(types.RESET)
        },
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

    async loadProfile({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await lsApi.users.getUser(authUser.id)
        status === 'success' && commit(meTypes.SET_USER, { user: data })
    },

    async loadVisibilities({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const res = await lsApi.common.getVisibilitiesByUser(authUser.id)
        commit({
            type: meTypes.SET_VISIBILITIES,
            visibilities: res.status === 'success' ? res.data : [],
        })
    },

    async loadTracks({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await lsApi.audios.getTracksByUser(authUser.id)
        commit({
            type: meTypes.SET_TRACKS,
            tracks: status === 'success' ? data : [],
        })
    },

    async loadVideos({ state, commit }, { params }) {
        const res = await lsApi.videos.getVideosByUser(state.user.id, params)
        commit({
            type: meTypes.SET_VIDEOS,
            videos: res.status === 'success' ? res.data : [],
        })
        return res
    },

    async createVideo({ commit }, { params }) {
        const res = await lsApi.videos.createVideo(params)
        res.status === 'success' &&
            commit(meTypes.ADD_VIDEO, { video: res.data })
        return res
    },

    async updateVideo({ commit }, { id, params }) {
        const res = await lsApi.videos.updateVideo(id, params)
        res.status === 'success' &&
            commit(meTypes.UPDATE_VIDEO, { video: res.data })
        return res
    },

    async deleteVideo({ state, commit }, { id }) {
        const res = await lsApi.videos.deleteVideo(id, {
            user_id: state.user.id,
        })
        res.status === 'success' && commit(meTypes.DELETE_VIDEO, { id })
        return res
    },

    sortVideos({ state, commit }, { sorts }) {
        commit(meTypes.SORT_VIDEOS, { sorts })
        lsApi.videos.sortVideos({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    updateProfile({ commit }, { user }) {
        commit(meTypes.SET_USER, { user })
    },
}

const getters = {
    user: state => state.user,
    visibilities: state => state.visibilities,
    tracks: state => state.tracks,
    videos: state => state.videos,
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
