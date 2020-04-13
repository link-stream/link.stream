import router from '~/router'
import { types, authTypes } from '../mutationTypes'
import { isEmpty } from 'lodash'
import {
    getAuthCookie,
    setAuthCookie,
    getPendingUserCookie,
    setPendingUserCookie,
    destroySessionStorage,
} from '~/utils/auth'

const initialState = () => ({
    user: null,
    pendingUser: null,
})

const state = {
    user: getAuthCookie(),
    pendingUser: getPendingUserCookie(),
}

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [authTypes.SIGNUP](state, payload) {
        state.pendingUser = payload
    },

    [authTypes.LOGIN](state, payload) {
        const { id, token } = payload
        state.user = { id, token }
    },

    [authTypes.LOGOUT]() {
        // TODO
    },
}

const actions = {
    reset: {
        root: true,
        handler({ commit }) {
            commit(types.RESET)
        },
    },
    signup({ commit }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(authTypes.SIGNUP, user)
            setPendingUserCookie(user)
            router.push({ name: 'signupConfirm' })
        }
    },

    async login({ commit, dispatch }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.RESET)
            commit(authTypes.LOGIN, user)
            await dispatch('me/loadAccount', null, { root: true })
            setAuthCookie(user)
            router.push({ name: 'userAccountDashboard' })
        }
    },

    async logout({ commit, dispatch }) {
        commit(authTypes.LOGOUT)
        dispatch('reset', null, { root: true })
        destroySessionStorage()
    },
}

const getters = {
    user: state => state.user,
    isLoggedIn: state => (state.user ? true : false),
    token: (state, getters) => (getters.isLoggedIn ? state.user.token : null),
    pendingUser: state => state.pendingUser,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
