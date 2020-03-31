import { Login, Logout, Signup, SignupConfirm, EmailConfirm, PasswordForgot, PasswordReset } from '~/pages/Auth'
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
        meta: { layout: 'Landing' },
    },
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { layout: 'Landing' },
    },

    // User auth pages
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true, layout: 'UserAuth' },
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
        meta: { requiresGuest: true, layout: 'UserAuth' },
    },
    {
        path: '/register-confirm',
        name: 'signupConfirm',
        component: SignupConfirm,
        meta: { requiresGuest: true, layout: 'UserAuth' },
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
        component: PasswordForgot,
        meta: { requiresGuest: true, layout: 'UserAuth' },
    },
    {
        path: '/reset-password/:param1/:param2',
        name: 'passwordReset',
        component: PasswordReset,
        meta: { requiresGuest: true, layout: 'UserAuth' },
    },

    // User account pages
    {
        path: '/app',
        name: 'userAccountDashboard',
        alias: '/app/dashboard',
        component: UserAccountDashboard,
        meta: { requiresAuth: true, layout: 'UserAccount' },
    },
    {
        path: '/app/profile/edit',
        name: 'userAccountProfileEdit',
        component: UserAccountProfileEdit,
        meta: { requiresAuth: true, layout: 'UserAccount' },
    },
    {
        path: '/app/videos/manage',
        name: 'userAccountVideos',
        component: UserAccountVideos,
        meta: { requiresAuth: true, layout: 'UserAccount' },
    },
    {
        path: '/app/videos/add',
        name: 'userAccountVideosAdd',
        component: UserAccountVideosAdd,
        meta: { requiresAuth: true, layout: 'UserAccount' },
    },

    // 404 catcher
    { path: '/404', alias: '*', name: '404', component: NotFound, meta: { layout: 'Error' } },
]

export default routes
