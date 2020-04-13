import { NotFound } from '~/pages/Error'
import { Legal, ComingSoon } from '~/pages/Others'
import {
    Login,
    Logout,
    Signup,
    SignupConfirm,
    EmailConfirm,
    PasswordForgot,
    PasswordReset,
} from '~/pages/Auth'
import {
    UserAccountDashboard,
    UserAccountProfileEdit,
    UserAccountVideos,
    UserAccountVideosAdd,
} from '~/pages/UserAccount'

const routes = [
    // Misc pages
    {
        path: '/',
        name: 'home',
        component: ComingSoon,
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
        meta: { requiresGuest: true, layout: 'Auth' },
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
        meta: { requiresGuest: true, layout: 'Auth' },
    },
    {
        path: '/register-confirm',
        name: 'signupConfirm',
        component: SignupConfirm,
        meta: { requiresGuest: true, layout: 'Auth' },
    },
    {
        path: '/email-confirm/:param1/:param2',
        name: 'emailConfirm',
        component: EmailConfirm,
        meta: { requiresGuest: true, layout: 'Default' },
    },
    {
        path: '/forgot',
        name: 'passwordForgot',
        component: PasswordForgot,
        meta: { requiresGuest: true, layout: 'Auth' },
    },
    {
        path: '/reset-password/:param1/:param2',
        name: 'passwordReset',
        component: PasswordReset,
        meta: { requiresGuest: true, layout: 'Auth' },
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
        name: 'userAccountVideoAdd',
        component: UserAccountVideosAdd,
        meta: { requiresAuth: true, layout: 'UserAccount' },
    },

    // 404 catcher
    {
        path: '/404',
        alias: '*',
        name: '404',
        component: NotFound,
        meta: { layout: 'Error' },
    },
]

export default routes
