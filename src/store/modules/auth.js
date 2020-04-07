import Cookies from 'js-cookie'
import router from '~/router'
import * as types from '../mutationTypes'
import { isEmpty } from 'lodash'
import { base64ImgToSrc } from '~/utils'

const COOKIE_PENDING_USER = 'pendingUserInfo'
const COOKIE_USER_INFO = 'userInfo'

const initialState = () => ({
    token: null,
    user: null,
    pendingUser: null,
})

const user = Cookies.getJSON(COOKIE_USER_INFO)

export const state = {
    token: user ? user.token : null,
    user: user || null,
    pendingUser: Cookies.getJSON(COOKIE_PENDING_USER),
}

export const mutations = {
    [types.RESET](state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
        Cookies.remove(COOKIE_PENDING_USER)
        Cookies.remove(COOKIE_USER_INFO)
    },

    [types.SIGNUP](state, data) {
        state.pendingUser = data.user
        Cookies.set(COOKIE_PENDING_USER, data.user)
    },

    [types.LOGIN](state, data) {
        const { user } = data
        state.user = user
        state.token = user.token
        Cookies.set(COOKIE_USER_INFO, user)
    },

    [types.LOGOUT]() {
        // TODO
    },

    [types.UPDATE_PASSWORD]() {
        // TODO
    },

    [types.UPDATE_PROFILE](state, data) {
        state.user = data.user
        Cookies.set(COOKIE_USER_INFO, data.user)
    },
}

export const actions = {
    signup({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.SIGNUP, payload)
            router.push({ name: 'signupConfirm' })
        }
    },

    login({ commit, dispatch }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.RESET)
            commit(types.LOGIN, payload)
            dispatch('me/loadAccountSettings')
            router.push({ name: 'userAccountDashboard' })
        }
    },

    async logout({ commit }) {
        commit(types.LOGOUT)
        commit(types.RESET)
    },

    updateProfile({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.UPDATE_PROFILE, payload)
        }
    },
}

export const getters = {
    token: state => user.token,
    pendingUser: state => state.pendingUser,
    user: state => state.user,
    isLoggedIn: state => (state.user ? true : false),
    userAvatar: (state, getters) => {
        const { data_image } = getters.user || {}
        return base64ImgToSrc(data_image)
    },
    userProfileBanner: (state, getters) => {
        const { data_banner } = getters.user || {}
        return base64ImgToSrc(data_banner)
    },
}
