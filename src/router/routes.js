import { Login, Logout, Signup, RegisterConfirm, EmailConfirm, ForgotPassword, PasswordReset } from '~/pages/Auth'
import { Landing } from '~/pages/Landing'
import { NotFound } from '~/pages/Error'
import { Legal } from '~/pages/Others'
import {
    UserAccountDashboard,
    UserAccountProfileEdit,
    UserAccountVideos,
    UserAccountVideosAdd,
} from '~/pages/UserAccount'

const routes = [
    // Public pages
    {
        path: '/',
        name: 'landing',
        component: Landing,
        meta: { layout: 'landing' },
    },
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { layout: 'landing' },
    },

    // User auth pages
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true, layout: 'userAuth' },
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
        meta: { requiresGuest: true, layout: 'userAuth' },
    },
    {
        path: '/register-confirm',
        name: 'signupConfirm',
        component: RegisterConfirm,
        meta: { requiresGuest: true, layout: 'userAuth' },
    },
    {
        path: '/email-confirm/:param1/:param2',
        name: 'emailConfirm',
        component: EmailConfirm,
        meta: { requiresGuest: true },
    },
    {
        path: '/forgot',
        name: 'passwordForgot',
        component: ForgotPassword,
        meta: { requiresGuest: true, layout: 'userAuth' },
    },
    {
        path: '/reset-password/:param1/:param2',
        name: 'passwordReset',
        component: PasswordReset,
        meta: { requiresGuest: true, layout: 'userAuth' },
    },

    // User account pages
    {
        path: '/app',
        name: 'userAccountDashboard',
        alias: '/app/dashboard',
        component: UserAccountDashboard,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    {
        path: '/app/profile/edit',
        name: 'userAccountProfileEdit',
        component: UserAccountProfileEdit,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    {
        path: '/app/videos/manage',
        name: 'userAccountVideos',
        component: UserAccountVideos,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    {
        path: '/app/videos/add',
        name: 'userAccountVideosAdd',
        component: UserAccountVideosAdd,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },

    // 404 catcher
    { path: '/404', alias: '*', name: '404', component: NotFound, meta: { layout: 'error' } },
]

export default routes
