import Cookies from 'js-cookie'
import router from '~/router'
import * as types from '../mutationTypes'
import { isEmpty } from 'lodash'

const SIGNUP_USER = 'signupUserInfo'
const USER_INFO = 'userInfo'

// state
const initialState = () => ({
    user: null,
    registeredUser: null,
})

export const state = {
    user: Cookies.getJSON(USER_INFO),
    signupUser: Cookies.getJSON(SIGNUP_USER),
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
        Cookies.remove(SIGNUP_USER)
        Cookies.remove(USER_INFO)
    },

    [types.SIGNUP](state, data) {
        state.signupUser = data.user
        Cookies.set(SIGNUP_USER, data.user)
    },

    [types.LOGIN](state, data) {
        state.user = data.user
        Cookies.set(USER_INFO, data.user)
    },

    [types.LOGOUT](state) {
        // nothing to do
    },

    [types.UPDATE_PASSWORD](state, res) {
        // nothing to do
    },
}

// actions
export const actions = {
    signup({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.SIGNUP, payload)
            router.push({ name: 'register-confirm' })
        }
    },

    login({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.LOGIN, payload)
            router.push({ name: 'home' })
        }
    },

    async logout({ commit }) {
        commit(types.LOGOUT)
        // reset all of state dat
        commit(types.RESET)
    },
}

// getters
export const getters = {
    signupUser: state => state.signupUser,
    user: state => state.user,
}
