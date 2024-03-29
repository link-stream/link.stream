import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import common from './modules/common'
import me from './modules/me'
// import menu from './modules/menu'
import loading from './modules/loading'
import trackAddWizard from './modules/trackAddWizard'
import profile from './modules/profile'
import customMenu from './modules/customMenu'
import marketing from './modules/marketing'
import { appConstants } from '~/constants'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        auth,
        common,
        me,
        // menu,
        trackAddWizard,
        loading,
        profile,
        customMenu,
        marketing,
    },
    plugins: [
        createPersistedState({
            key: appConstants.vuexLocalStorage.key,
            paths: ['me.user'],
        }),
    ],
})
