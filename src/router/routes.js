import { NotFound } from '~/pages/Error'
import { Legal, ComingSoon } from '~/pages/Others'
import {
    Login,
    Signup,
    SignupConfirm,
    EmailConfirm,
    PasswordForgot,
    PasswordReset,
} from '~/pages/Auth'
import {
    AccountDashboard,
    AccountProfileEdit,
    AccountVideos,
    AccountVideoAdd,
    AccountLinks,
    AccountLinkAdd,
    AccountBeats,
    AccountBeatAdd,
    AccountBeatEdit,
    AccountTracksLicenses,
    AccountTracksLicenseEdit,
    AccountSoundKits,
    AccountSoundKitAdd,
} from '~/pages/Account'

const routes = [
    /**
     * Misc pages
     */
    {
        path: '/',
        name: 'home',
        component: ComingSoon,
        meta: { layout: 'landing' },
    },
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { layout: 'landing' },
    },

    /**
     * Auth
     */
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true, layout: 'auth' },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: { requiresAuth: true },
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        meta: { requiresGuest: true, layout: 'auth' },
    },
    {
        path: '/register-confirm',
        name: 'signupConfirm',
        component: SignupConfirm,
        meta: { requiresGuest: true, layout: 'auth' },
    },
    {
        path: '/email-confirm/:param1/:param2',
        name: 'emailConfirm',
        component: EmailConfirm,
        meta: { requiresGuest: true, layout: 'default' },
    },
    {
        path: '/forgot',
        name: 'passwordForgot',
        component: PasswordForgot,
        meta: { requiresGuest: true, layout: 'auth' },
    },
    {
        path: '/reset-password/:param1/:param2',
        name: 'passwordReset',
        component: PasswordReset,
        meta: { requiresGuest: true, layout: 'auth' },
    },

    /**
     * Account
     */
    {
        path: '/app',
        name: 'accountDashboard',
        alias: '/app/dashboard',
        component: AccountDashboard,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/profile/edit',
        name: 'accountProfileEdit',
        component: AccountProfileEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/videos/manage',
        name: 'accountVideos',
        component: AccountVideos,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/videos/add',
        name: 'accountVideoAdd',
        component: AccountVideoAdd,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/links/manage',
        name: 'accountLinks',
        component: AccountLinks,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/links/add',
        name: 'accountLinkAdd',
        component: AccountLinkAdd,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/beats/manage',
        name: 'accountBeats',
        component: AccountBeats,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/beats/add',
        name: 'accountBeatAdd',
        component: AccountBeatAdd,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/beats/:id/edit',
        name: 'accountBeatEdit',
        component: AccountBeatEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/licenses/manage',
        name: 'accountTracksLicenses',
        component: AccountTracksLicenses,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/licenses/:id/edit',
        name: 'accountTracksLicenseEdit',
        component: AccountTracksLicenseEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/kits/manage',
        name: 'accountSoundKits',
        component: AccountSoundKits,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/kits/add',
        name: 'accountSoundKitAdd',
        component: AccountSoundKitAdd,
        meta: { requiresAuth: true, layout: 'account' },
    },

    /**
     * 404 catcher
     */
    {
        path: '/404',
        alias: '*',
        name: '404',
        component: NotFound,
        meta: { layout: 'error' },
    },
]

export default routes
