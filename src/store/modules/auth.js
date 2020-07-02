import { types, authTypes } from '../mutationTypes'
import { api } from '~/services/api'
import router from '~/router'
import { isEmpty } from 'lodash'
import {
    getAuthCookie,
    setAuthCookie,
    getPendingUserCookie,
    setPendingUserCookie,
    destroySession,
} from '~/utils/auth'

const initialState = () => ({
    /**
     * @type {object}
     */
    user: null,
    /**
     * @type {object}
     */
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

    [authTypes.SIGNUP](state, { user }) {
        state.pendingUser = user
        setPendingUserCookie(user)
    },

    [authTypes.LOGIN](state, { user }) {
        const { id, token } = user
        state.user = { id, token }
        setAuthCookie({ id, token })
    },

    [authTypes.LOGOUT]() {
        // Do nothing
    },
}

const actions = {
    reset({ commit }) {
        commit(types.RESET)
    },

    signup({ commit }, { user }) {
        if (!isEmpty(user)) {
            commit(authTypes.SIGNUP, { user })
            router.push({ name: 'signupConfirm' })
        }
    },

    async login({ commit, dispatch }, { user }) {
        if (!isEmpty(user)) {
            commit(types.RESET)
            commit(authTypes.LOGIN, { user })
            await dispatch('me/loadAccount', null, { root: true })
            router.push({ name: 'accountDashboard' })
        }
    },

    async logout({ commit, dispatch }) {
        await api.users.logout()
        commit(authTypes.LOGOUT)
        dispatch('reset')
        dispatch('me/reset', null, { root: true })
        destroySession()
    },
}

const getters = {
    user: ({ user }) => user,
    isLoggedIn: ({ user }) => (user ? true : false),
    token: ({ user }, getters) => (getters.isLoggedIn ? user.token : null),
    pendingUser: ({ pendingUser }) => pendingUser,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
