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

    [meTypes.SET_VISIBILITIES](state, payload) {
        state.visibilities = payload
    },

    [meTypes.SET_TRACKS](state, payload) {
        state.tracks = payload
    },

    [meTypes.SET_PROFILE](state, payload) {
        state.user = payload
    },

    [meTypes.UPDATE_PROFILE](state, payload) {
        state.user = payload
    },

    [meTypes.SET_VIDEOS](state, payload) {
        state.videos = payload
    },

    [meTypes.ADD_VIDEO](state, payload) {
        state.videos.unshift(payload)
    },

    [meTypes.UPDATE_VIDEO](state, payload) {
        const index = state.videos.map(v => v.id).indexOf(payload.id)
        index > -1 && Vue.set(state.videos, index, payload)
    },

    [meTypes.SORT_VIDEOS](state, sorts) {
        const lookupMap = {}
        state.videos.forEach(v => (lookupMap[v.id] = v))
        const sortedVideos = []
        sorts.forEach(sort => sortedVideos.push(lookupMap[sort.id]))
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
        status === 'success' && commit(meTypes.SET_PROFILE, data)
    },

    async loadVisibilities({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await lsApi.common.getVisibilitiesByUser(
            authUser.id
        )
        commit(meTypes.SET_VISIBILITIES, status === 'success' ? data : [])
    },

    async loadTracks({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await lsApi.audios.getTracksByUser(authUser.id)
        commit(meTypes.SET_TRACKS, status === 'success' ? data : [])
    },

    async loadVideos({ commit }, payload) {
        const { userId, params } = payload
        const res = await lsApi.videos.getVideosByUser(userId, params)
        const { status, data } = res
        commit(meTypes.SET_VIDEOS, status === 'success' ? data : [])
        return res
    },

    async createVideo({ commit }, payload) {
        const res = await lsApi.videos.createVideo(payload.params)
        if (res.status === 'success') {
            commit(meTypes.ADD_VIDEO, res.data)
        }
        return res
    },

    async updateVideo({ commit }, payload) {
        const res = await lsApi.videos.updateVideo(payload.id, payload.params)
        if (res.status === 'success') {
            commit(meTypes.UPDATE_VIDEO, res.data)
        }
        return res
    },

    sortVideos({ state, commit }, payload) {
        const { sorts } = payload
        commit(meTypes.SORT_VIDEOS, sorts)
        lsApi.videos.sortVideos({
            user_id: state.user.id,
            list: JSON.stringify(sorts),
        })
    },

    updateProfile({ commit }, payload) {
        const { user } = payload
        commit(meTypes.UPDATE_PROFILE, user)
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
