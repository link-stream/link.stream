import Cookies from 'js-cookie'
import router from '~/router'
import * as types from '../mutationTypes'
import { isEmpty } from 'lodash'

const PENDING_USER = 'pendingUserInfo'
const USER_INFO = 'userInfo'

// state
const initialState = () => ({
    user: null,
    pendingUser: null,
})

export const state = {
    user: Cookies.getJSON(USER_INFO),
    pendingUser: Cookies.getJSON(PENDING_USER),
}

// mutations
export const mutations = {
    [types.RESET](state) {
        // acquire initial state
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
        // clear cookies
        Cookies.remove(PENDING_USER)
        Cookies.remove(USER_INFO)
    },

    [types.SIGNUP](state, data) {
        state.pendingUser = data.user
        Cookies.set(PENDING_USER, data.user)
    },

    [types.LOGIN](state, data) {
        state.user = data.user
        Cookies.set(USER_INFO, data.user)
    },

    [types.LOGOUT]() {
        // nothing to do
    },

    [types.UPDATE_PASSWORD]() {
        // nothing to do
    },

    [types.UPDATE_PROFILE](state, data) {
        state.user = data.user
        Cookies.set(USER_INFO, data.user)
    },
}

// actions
export const actions = {
    signup({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.SIGNUP, payload)
            router.push({ name: 'signupConfirm' })
        }
    },

    login({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.RESET)
            commit(types.LOGIN, payload)
            router.push({ name: 'dashboard' })
        }
    },

    async logout({ commit }) {
        commit(types.LOGOUT)
        // reset all of state dat
        commit(types.RESET)
    },

    updateProfile({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.UPDATE_PROFILE, payload)
        }
    },
}

// getters
export const getters = {
    pendingUser: state => state.pendingUser,
    user: state => state.user,
    avatar: state => {
        // https://s3.us-east-2.amazonaws.com/files.link.stream/Dev/Profile/avatar_73_1583829696221.jpeg
        if (state.user.image)
            return `//s3.${process.env.VUE_APP_GOOGLE_AWS_REGION}.amazonaws.com/${process.env.VUE_APP_GOOGLE_AWS_BUCKET}/${process.env.VUE_APP_GOOGLE_AWS_DIR}/Profile/${state.user.image}`
        return null
    },
    profileBanner: state => {
        if (state.user.banner)
            return `//s3.${process.env.VUE_APP_GOOGLE_AWS_REGION}.amazonaws.com/${process.env.VUE_APP_GOOGLE_AWS_BUCKET}/${process.env.VUE_APP_GOOGLE_AWS_DIR}/Profile/${state.user.banner}`
        return null
    },
}
