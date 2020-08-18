/**
 * Profile Module
 */

import { commonTypes, profileTypes } from '../mutationTypes'
import { api } from '~/services'
import { appConstants } from '~/constants'

const initialState = () => ({
    /**
     * @type {null|object}
     */
    profile: null,
    beats: [],
    soundKits: [],
    videos: [],
    links: [],
    profileGenres: [],
})

const state = initialState()

const mutations = {
    [commonTypes.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [profileTypes.SET_PROFILE](state, { profile }) {
        state.profile = profile
    },

    [profileTypes.SET_BEATS](state, { beats }) {
        state.beats = beats
    },

    [profileTypes.SET_SOUND_KITS](state, { soundKits }) {
        state.soundKits = soundKits
    },

    [profileTypes.SET_VIDEOS](state, { videos }) {
        state.videos = videos
    },

    [profileTypes.SET_LINKS](state, { links }) {
        state.links = links
    },

    [profileTypes.SET_GENRES](state, { genres }) {
        state.profileGenres = genres
    },
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    async getProfileMain({ commit }, { url }) {
        const response = await api.profiles.getProfileMain(url)
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_PROFILE, { profile: data })
        return response
    },

    async getProfileBeats({ state, commit }, params) {
        console.log('params', params)
        const response = await api.profiles.getProfileBeats(
            state.profile.id,
            params
        )
        console.log('response', response)
        const { status, data } = response
        status === 'success' && commit(profileTypes.SET_BEATS, { beats: data })
        return response
    },

    async getProfileKits({ state, commit }, params) {
        const response = await api.profiles.getProfileKits(
            state.profile.id,
            params
        )
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_SOUND_KITS, { soundKits: data })
        return response
    },

    async getProfileVideos({ state, commit }, params) {
        const response = await api.profiles.getProfileVideos(
            state.profile.id,
            params
        )
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_VIDEOS, { videos: data })
        return response
    },

    async getProfileLinks({ state, commit }, params) {
        const response = await api.profiles.getProfileLinks(
            state.profile.id,
            params
        )
        const { status, data } = response
        status === 'success' && commit(profileTypes.SET_LINKS, { links: data })
        return response
    },

    async getProfileGenres({ state, commit }, type) {
        const response = await api.profiles.getProfileGenres(
            state.profile.id,
            type
        )
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_GENRES, { genres: data })
        return response
    },
}

const getters = {
    profile: ({ profile }) => profile,

    beats: ({ beats }) => {
        return beats.map(beat => {
            return {
                ...beat,
                coverart: beat.data_image || appConstants.defaultCoverArt,
            }
        })
    },

    soundKits: ({ soundKits }) => {
        return soundKits.map(soundKit => {
            return {
                ...soundKit,
                coverart: soundKit.data_image || appConstants.defaultCoverArt,
            }
        })
    },

    videos: ({ videos }) => videos,
    links: ({ links }) => links,
    profileGenres: ({ profileGenres }) => profileGenres,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
