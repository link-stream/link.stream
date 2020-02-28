// pages
import { Login, Signup, RegisterConfirm, EmailConfirm, PasswordReset } from '~/pages/Auth'
import { Landing } from '~/pages/Landing'
import { Legal } from '~/pages/Others'

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
    // Main pages
    {
        path: '/',
        name: 'landing',
        component: Landing,
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
