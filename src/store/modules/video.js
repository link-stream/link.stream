import * as types from '../mutationTypes'

// state
const initialState = () => ({
    videos: [],
})

export const state = initialState()

// mutations
export const mutations = {
    [types.RESET](state) {
        // acquire initial state
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    },

    // load videos
    [types.LOAD_VIDEOS](state, videos) {
        state.videos = videos
    },

    // sort videos
    [types.SORT_VIDEOS](state, sorts) {
        state.videos.forEach(video => {
            video.sort = sorts.find(obj => obj.id === video.id).sort
        }),
            ['sort']
    },
}

// actions
export const actions = {
    loadVideos({ commit }, payload) {
        const { videos } = payload
        commit(types.LOAD_VIDEOS, videos)
    },
    sortVideos({ commit }, payload) {
        const { sorts } = payload
        commit(types.SORT_VIDEOS, sorts)
    },
}

// getters
export const getters = {
    videos: state => state.videos,
}
