import Cookies from 'js-cookie'
import router from '~/router'
import * as types from '../mutationTypes'
import { isEmpty } from 'lodash'
import { base64ImgToSrc } from '~/utils'

const PENDING_USER = 'pendingUserInfo'
const USER_INFO = 'userInfo'

// state
const initialState = () => ({
    token: null,
    user: null,
    pendingUser: null,
})

const user = Cookies.getJSON(USER_INFO)

export const state = {
    token: user ? user.token : null,
    user: user || null,
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
        const { user } = data.user
        state.user = user
        state.token = user.token
        Cookies.set(USER_INFO, user)
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
            router.push({ name: 'userAccountDashboard' })
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
    userAvatar: (state, getters) => {
        const { data_image } = getters.user || {}
        return base64ImgToSrc(data_image)
    },
    userProfileBanner: (state, getters) => {
        const { data_banner } = getters.user || {}
        return base64ImgToSrc(data_banner)
    },
}
