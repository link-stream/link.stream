// pages
import { Login, Signup } from '~/pages/Auth'
import { HomePage } from '~/pages/HomePage'
import { Legal } from '~/pages/Other'

const routes = [
    // Pre Auth routs
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    // Main pages
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: { requiresGuest: true, layout: 'landing' },
    },
    // Other pages
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { requiresGuest: true, layout: 'landing' },
    },
]

export default routes
