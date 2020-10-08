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
    beatsLoad: [],
    soundKitsLoad: [],
    soundKits: [],
    moreElements: [],
    videos: [],
    links: [],
    profileGenres: [],
    licenses: [],
    cartItems: [],
    individualLoading: false,
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

    [profileTypes.SET_MORE_ELEMENTS](state, { elements }) {
        state.moreElements = elements
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

    [profileTypes.SET_LICENSES](state, { licenses }) {
        state.licenses = licenses
    },

    [profileTypes.SET_INDIVIDUAL_LOADING](state, value) {
        state.individualLoading = value
    },

    [profileTypes.ADD_PLAYER_BEAT]({ beatsLoad }, { playerItem }) {
        beatsLoad.push(playerItem)
    },

    [profileTypes.ADD_PLAYER_SOUND_KIT]({ soundKitsLoad }, { playerItem }) {
        soundKitsLoad.push(playerItem)
    },

    [profileTypes.ADD_CART_ITEM]({ cartItems }, { cartItem }) {
        cartItems.push(cartItem)
    },

    [profileTypes.REMOVE_CART_ITEM]({ cartItems }, { cartItem }) {
        const findIndex = cartItems.findIndex(item => {
            if (cartItem.track_type === appConstants.tracks.types.beat) {
                if (item.type === 'beat') {
                    return (
                        item.id === cartItem.id &&
                        item.license_id === cartItem.license_id
                    )
                } else {
                    return (
                        item.type === cartItem.type && item.id === cartItem.id
                    )
                }
            } else {
                return (
                    item.track_type === cartItem.track_type &&
                    item.id === cartItem.id
                )
            }
        })
        cartItems.splice(findIndex, 1)
    },
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    async getProfileBeatsTab({ commit }, { url, audio_id, type }) {
        await api.profiles
            .getProfileBeatsTab(url, audio_id, type)
            .then(response => {
                const { status, data } = response
                if (status === 'success') {
                    commit(profileTypes.SET_PROFILE, { profile: data.profile })
                    commit(profileTypes.SET_BEATS, { beats: data.beats })
                    commit(profileTypes.SET_MORE_ELEMENTS, {
                        elements: data.extra,
                    })
                    commit(profileTypes.SET_GENRES, { genres: data.genres })
                    commit(profileTypes.SET_LICENSES, {
                        licenses: data.licenses,
                    })
                    return response
                }
            })
    },

    async getProfileMain({ commit }, { url }) {
        const response = await api.profiles.getProfileMain(url)
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_PROFILE, { profile: data })
        return response
    },

    async getProfileBeats({ state, commit }, params) {
        const response = await api.profiles.getProfileBeats(
            state.profile.id,
            params
        )
        const { status, data } = response
        status === 'success' && commit(profileTypes.SET_BEATS, { beats: data })
        return response
    },

    async getProfileKitsTab({ commit }, { url, audio_id }) {
        await api.profiles.getProfileKitsTab(url, audio_id).then(response => {
            const { status, data } = response
            if (status === 'success') {
                commit(profileTypes.SET_PROFILE, { profile: data.profile })
                commit(profileTypes.SET_SOUND_KITS, {
                    soundKits: data.sound_kits,
                })
                commit(profileTypes.SET_MORE_ELEMENTS, { elements: data.extra })
                commit(profileTypes.SET_GENRES, { genres: data.genres })
                return response
            }
        })
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

    async getMoreElements({ commit }, item) {
        commit(profileTypes.SET_MORE_ELEMENTS, { elements: item })
    },

    async getProfileVideosTab({ commit }, { url, video_id }) {
        await api.profiles.getProfileVideosTab(url, video_id).then(response => {
            const { status, data } = response
            if (status === 'success') {
                commit(profileTypes.SET_PROFILE, { profile: data.profile })
                commit(profileTypes.SET_VIDEOS, { videos: data.videos })
                commit(profileTypes.SET_GENRES, { genres: data.genres })
                return response
            }
        })
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

    async getProfileLinksTab({ commit }, { url, audio_id }) {
        await api.profiles.getProfileLinksTab(url, audio_id).then(response => {
            const { status, data } = response
            if (status === 'success') {
                commit(profileTypes.SET_PROFILE, { profile: data.profile })
                commit(profileTypes.SET_LINKS, { links: data.links })
                return response
            }
        })
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

    async getProfileLicenses({ state, commit }) {
        const response = await api.profiles.getProfileLicenses(state.profile.id)
        const { status, data } = response
        status === 'success' &&
            commit(profileTypes.SET_LICENSES, { licenses: data })
        return response
    },

    async addPlayerBeat({ commit }, item) {
        commit(profileTypes.ADD_PLAYER_BEAT, { playerItem: item })
    },

    async addPlayerSoundKit({ commit }, item) {
        commit(profileTypes.ADD_PLAYER_SOUND_KIT, { playerItem: item })
    },

    async addCartItem({ commit }, item) {
        commit(profileTypes.ADD_CART_ITEM, { cartItem: item })
    },

    async removeCartItem({ commit }, item) {
        commit(profileTypes.REMOVE_CART_ITEM, { cartItem: item })
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

    beatsLoad: ({ beatsLoad }) => beatsLoad,
    soundKitsLoad: ({ soundKitsLoad }) => soundKitsLoad,
    moreElements: ({ moreElements }) => moreElements,

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
    licenses: ({ licenses }) => licenses,
    cartItems: ({ cartItems }) => cartItems,
    individualLoading: ({ individualLoading }) => individualLoading,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
