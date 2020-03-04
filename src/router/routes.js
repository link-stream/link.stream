// pages
import { Login, Logout, Signup, RegisterConfirm, EmailConfirm, ForgotPassword, PasswordReset } from '~/pages/Auth'
import { Landing } from '~/pages/Landing'
import { NotFound } from '~/pages/Error'
import { Legal } from '~/pages/Others'
import { Dashboard, ProfileEdit } from '~/pages/Dashboard'

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
        name: 'forgot-password',
        component: ForgotPassword,
        meta: { requiresGuest: true, layout: 'preauth' },
    },
    {
        path: '/reset-password/:param1/:param2',
        name: 'reset-password',
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
        name: 'dashboard',
        alias: '/app/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, layout: 'dashboard' },
    },
    {
        path: '/app/profile/edit',
        name: 'profile-edit',
        component: ProfileEdit,
        meta: { requiresAuth: true, layout: 'dashboard' },
    },
    // 404 catcher
    { path: '/404', alias: '*', name: '404', component: NotFound, meta: { layout: 'error' } },
]

export default routes
