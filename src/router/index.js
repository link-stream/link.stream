import Vue from 'vue'
import Router from 'vue-router'
import store from '~/store'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: routes,
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        router.app.$Progress.start()
    }
    next()
})

router.beforeEach(async (to, from, next) => {
    // middleware for access controlled pages
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.user) {
            // redirect to login if attempting to access authed page
            next({ name: 'login' })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.user) {
            // redirect home if attempting to access guest-only page
            next({ name: 'dashboard' })
        } else {
            next()
        }
    } else {
        next()
    }
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    router.app.$Progress.finish()
})

export default router
