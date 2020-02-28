// pages
import { Login, Logout, Signup, RegisterConfirm, EmailConfirm, PasswordReset } from '~/pages/Auth'
import { Landing } from '~/pages/Landing'
import { NotFound } from '~/pages/Error'
import { Legal } from '~/pages/Others'
import { Home } from '~/pages/Dashboard'

const routes = [
    // Pre Auth routs
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: { requiresAuth: true },
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    {
        path: '/register-confirm',
        name: 'register-confirm',
        component: RegisterConfirm,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    {
        path: '/email-confirm/:param1/:param2',
        name: 'email-confirm',
        component: EmailConfirm,
        meta: { requiresGuest: true },
    },
    {
        path: '/forgot',
        name: 'password-reset',
        component: PasswordReset,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    // Other pages
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { layout: 'landing' },
    },
    // Main pages
    {
        path: '/',
        name: 'landing',
        component: Landing,
        meta: { layout: 'landing' },
    },
    {
        path: '/app',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true, layout: 'dashboard' },
    },
    // 404 catcher
    { path: '/404', alias: '*', name: '404', component: NotFound, meta: { layout: 'error' } },
]

export default routes
