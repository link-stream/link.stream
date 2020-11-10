import { commonTypes, authTypes } from '../mutationTypes'
import { api } from '~/services/api'
import router from '~/router'
import { isEmpty } from 'lodash'
import {
    getAuthCookie,
    setAuthCookie,
    getPendingUserCookie,
    setPendingUserCookie,
    clearLocalStorage,
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
    userType: '',
})

const state = {
    user: getAuthCookie(),
    pendingUser: getPendingUserCookie(),
}

const mutations = {
    [commonTypes.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [authTypes.SIGNUP](state, { user }) {
        state.pendingUser = user
    },

    [authTypes.LOGIN](state, { user }) {
        const { id, token } = user.store[1]
        state.user = { id, token }
    },

    [authTypes.LOGIN_NEW](state, { store, user }) {
        const user_id = user.id
        const { id, token } = store
        state.user = { user_id, id, token }
    },

    [authTypes.SET_USER_TYPE](state, { user }) {
        state.userType = user.type
    },
}

const actions = {
    reset({ commit }) {
        commit(commonTypes.RESET)
    },

    signup({ commit }, { user }) {
        if (!isEmpty(user)) {
            commit(authTypes.SIGNUP, { user })
            setPendingUserCookie(user)
            router.push({ name: 'signupConfirm' })
        }
    },

    async login({ commit, dispatch }, { user, route }) {
        if (!isEmpty(user)) {
            commit(commonTypes.RESET)
            commit(authTypes.LOGIN, { user })
            commit(authTypes.SET_USER_TYPE, { user })
            setAuthCookie({ id: user.id, token: user.token })
            await dispatch('me/loadAccount', null, { root: true })
            if (route === undefined) {
                router.push({
                    name: 'accountDashboard',
                })
            } else {
                if (route.route === 'publicProfile') {
                    router.push({
                        name: route.route,
                        params: { url: route.params },
                    })
                }
                if (route.route === 'payWithCard') {
                    router.push({
                        name: route.route,
                    })
                }
            }
        }
    },

    async loginNew({ commit, dispatch }, { store, user, route }) {
        if (!isEmpty(user)) {
            commit(commonTypes.RESET)
            commit(authTypes.LOGIN_NEW, { store, user })
            commit(authTypes.SET_USER_TYPE, { user })
            setAuthCookie({
                user_id: user.id,
                id: store.id,
                token: store.token,
            })
            await dispatch('me/loadAccount', null, { root: true })
            if (route === undefined) {
                router.push({
                    name: 'accountDashboard',
                })
            } else {
                if (route.route === 'publicProfile') {
                    router.push({
                        name: route.route,
                        params: { url: route.params },
                    })
                }
                if (route.route === 'payWithCard') {
                    router.push({
                        name: route.route,
                    })
                }
            }
        }
    },

    async logout({ dispatch }) {
        await api.users.logout()
        dispatch('reset')
        dispatch('me/reset', null, { root: true })
        clearLocalStorage()
    },
}

const getters = {
    user: ({ user }) => user,
    isLoggedIn: ({ user }) => {
        return () => !!(getAuthCookie() && user)
    },
    isType: state => type => {
        return () => state.userType === type
    },
    token: ({ user }) => (user ? user.token : null),
    pendingUser: ({ pendingUser }) => pendingUser,
    userType: ({ userType }) => userType,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
