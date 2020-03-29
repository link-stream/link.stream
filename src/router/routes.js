import { Login, Logout, Signup, RegisterConfirm, EmailConfirm, ForgotPassword, PasswordReset } from '~/pages/Auth'
import { Landing } from '~/pages/Landing'
import { NotFound } from '~/pages/Error'
import { Legal } from '~/pages/Others'
import { Dashboard, ProfileEdit, Videos, AddVideo } from '~/pages/Dashboard'

const routes = [
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

    // Landing pages
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { layout: 'landing' },
    },
    {
        path: '/',
        name: 'landing',
        component: Landing,
        meta: { layout: 'landing' },
    },

    // User account pages
    {
        path: '/app',
        name: 'userAccountDashboard',
        alias: '/app/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    {
        path: '/app/profile/edit',
        name: 'userAccountProfileEdit',
        component: ProfileEdit,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    {
        path: '/app/videos/manage',
        name: 'userAccountVideos',
        component: Videos,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    {
        path: '/app/videos/add',
        name: 'userAccountVideosAdd',
        component: AddVideo,
        meta: { requiresAuth: true, layout: 'userAccount' },
    },
    
    // 404 catcher
    { path: '/404', alias: '*', name: '404', component: NotFound, meta: { layout: 'error' } },
]

export default routes
