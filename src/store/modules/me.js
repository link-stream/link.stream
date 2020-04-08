/**
 * Logged In User Module
 */

import { types, meTypes } from '../mutationTypes'
import { lsApi } from '~/services/lsApi'
import { base64ImgToSrc } from '~/utils'

const initialState = () => ({
    user: null,
    visibilities: [],
    tracks: [],
    videos: [],
})

const state = initialState()

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [meTypes.LOAD_VISIBILITIES](state, data) {
        state.visibilities = data
    },

    [meTypes.LOAD_TRACKS](state, data) {
        state.tracks = data
    },

    [meTypes.LOAD_PROFILE](state, data) {
        state.user = data
    },

    [meTypes.UPDATE_PROFILE](state, data) {
        state.user = data
    },

    [meTypes.UPDATE_VIDEOS](state, data) {
        state.videos = data
    },

    [meTypes.SORT_VIDEOS](state, sorts) {
        state.videos.forEach(video => {
            video.sort = sorts.find(obj => obj.id === video.id).sort
        })
    },
}

const actions = {
    reset: {
        root: true,
        handler({ commit }) {
            commit(types.RESET)
        },
    },
    async loadAccount({ dispatch }) {
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
        status === 'success' && commit(meTypes.LOAD_PROFILE, data)
    },

    async loadVisibilities({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await lsApi.common.getVisibilitiesByUser(
            authUser.id
        )
        if (status !== 'success') {
            return
        }
        const visibilities = Object.keys(data).map(key => {
            return {
                id: parseInt(key),
                title: data[key],
            }
        })
        commit(meTypes.LOAD_VISIBILITIES, visibilities)
    },

    async loadTracks({ commit, rootGetters }) {
        const authUser = rootGetters['auth/user']
        const { status, data } = await lsApi.audios.getTracksByUser(authUser.id)
        status === 'success' && commit(meTypes.LOAD_TRACKS, data)
    },

    updateProfile({ commit }, payload) {
        const { user } = payload
        commit(meTypes.UPDATE_PROFILE, user)
    },

    updateVideos({ commit }, payload) {
        const { videos } = payload
        commit('UPDATE_VIDEOS', videos)
    },

    sortVideos({ commit }, payload) {
        commit(meTypes.SORT_VIDEOS, payload.sorts)
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
