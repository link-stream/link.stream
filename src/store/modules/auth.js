import router from '~/router'
import { types, authTypes } from '../mutationTypes'
import { isEmpty } from 'lodash'
import {
    authCookie,
    pendingUserCookie,
    destroySessionStorage,
} from '~/utils/auth'

const initialState = () => ({
    user: null,
    pendingUser: null,
})

const state = {
    user: authCookie.get(),
    pendingUser: pendingUserCookie.get(),
}

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [authTypes.SIGNUP](state, data) {
        state.pendingUser = data
    },

    [authTypes.LOGIN](state, data) {
        const { id, token } = data
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
            pendingUserCookie.set(user)
            router.push({ name: 'signupConfirm' })
        }
    },

    async login({ commit, dispatch }, payload) {
        const { user } = payload
        if (!isEmpty(user)) {
            commit(types.RESET)
            commit(authTypes.LOGIN, user)
            await dispatch('me/loadAccount', null, { root: true })
            authCookie.set(user)
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
