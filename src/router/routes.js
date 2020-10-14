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
    AccountSoundKitAddEdit,
    AccountBeatPacks,
    AccountBeatPackAddEdit,
    AccountSettings,
} from '~/pages/Account'

import {
    MarketingMessages,
    Subscribers,
    LandingPages,
    AdPromos,
    EditMessage,
    CustomizeMessage,
    CustomizeMessagePlain,
    CustomizeMessageVideo,
    SentSMS,
    ReportMessage,
    ViewEmail,
    SelectEmailTemplate,
    AddSubscriber,
    SubscriberDetails,
    ImportSubscribers,
    SelectPageTemplate,
    EditLandingPage,
    EditSplitTest,
    AddVariations,
    ResultSplitTest,
} from '~/pages/Marketing'

import PublicProfile from '@/pages/Profile/PublicProfile'
import PublicBeatDetails from '@/pages/Profile/PublicBeatDetails'
import PublicPackDetails from '@/pages/Profile/PublicPackDetails'
import PublicKitDetails from '@/pages/Profile/PublicKitDetails'

import Cart from '@/pages/Profile/Checkout/Cart'
import CheckoutSignin from '@/pages/Profile/Checkout/CheckoutSignin'
import CheckoutContactInfo from '@/pages/Profile/Checkout/CheckoutContactInfo'
import PayWithCard from '@/pages/Profile/Checkout/PayWithCard'
import CheckoutReceipt from '@/pages/Profile/Checkout/CheckoutReceipt'

const routes = [
    // Misc

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

    // Auth

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

    // Account

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
        path: '/:url',
        name: 'accountProfileView',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
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
        component: AccountSoundKitAddEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/kits/:id/edit',
        name: 'accountSoundKitEdit',
        component: AccountSoundKitAddEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/beat-packs/manage',
        name: 'accountBeatPacks',
        component: AccountBeatPacks,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/beat-packs/add',
        name: 'accountBeatPackAdd',
        component: AccountBeatPackAddEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/beat-packs/:id/edit',
        name: 'accountBeatPackEdit',
        component: AccountBeatPackAddEdit,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/account/info',
        name: 'accountSettingsInfo',
        component: AccountSettings,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/account/purchases',
        name: 'accountSettingsPurchases',
        component: AccountSettings,
        meta: { requiresAuth: true, layout: 'account' },
    },

    {
        path: '/app/account/payments',
        name: 'accountSettingsPayments',
        component: AccountSettings,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/account/payouts',
        name: 'accountSettingsPayouts',
        component: AccountSettings,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/account/notifications',
        name: 'accountSettingsNotifs',
        component: AccountSettings,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/analytics/trafic',
        name: 'analyticsTrafic',
        component: NotFound,
        meta: { layout: 'error' },
    },
    {
        path: '/app/analytics/revenue',
        name: 'analyticsRevenue',
        component: NotFound,
        meta: { layout: 'error' },
    },
    {
        path: '/app/upgrade',
        name: 'upgrade',
        component: NotFound,
        meta: { layout: 'error' },
    },

    //Marketing

    {
        path: '/app/marketing/messages',
        name: 'marketingMessages',
        component: MarketingMessages,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/subscribers',
        name: 'subscribers',
        component: Subscribers,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/landing-pages',
        name: 'landingPages',
        component: LandingPages,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/ad-promos',
        name: 'adPromos',
        component: AdPromos,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/messages/edit',
        name: 'editMessage',
        component: EditMessage,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/messages/customize',
        name: 'customizeMessage',
        component: CustomizeMessage,
        meta: { requiresAuth: true },
    },
    {
        path: '/app/marketing/messages/customize-plain',
        name: 'customizeMessagePlain',
        component: CustomizeMessagePlain,
        meta: { requiresAuth: true },
    },
    {
        path: '/app/marketing/messages/customize-video',
        name: 'customizeMessageVideo',
        component: CustomizeMessageVideo,
        meta: { requiresAuth: true },
    },
    {
        path: '/app/marketing/messages/sent-sms',
        name: 'sentSMS',
        component: SentSMS,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/messages/report/:id',
        name: 'reportMessage',
        component: ReportMessage,
        props: true,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/messages/view/:id',
        name: 'viewEmail',
        component: ViewEmail,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/app/marketing/messages/select-template',
        name: 'selectEmailTemplate',
        component: SelectEmailTemplate,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/subscriber/add',
        name: 'addSubscriber',
        component: AddSubscriber,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/subscribers/details',
        name: 'subscriberDetails',
        component: SubscriberDetails,
        props: true,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/subscribers/import',
        name: 'importSubscribers',
        component: ImportSubscribers,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/landing-pages/select',
        name: 'selectPageTemplate',
        component: SelectPageTemplate,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/landing-page/edit',
        name: 'editLandingPage',
        component: EditLandingPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/app/marketing/landing-page/split-edit',
        name: 'editSplitTest',
        component: EditSplitTest,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/landing-page/add-variations',
        name: 'addVariations',
        component: AddVariations,
        props: true,
        meta: { requiresAuth: true, layout: 'account' },
    },
    {
        path: '/app/marketing/landing-page/result',
        name: 'resultSplitTest',
        component: ResultSplitTest,
        meta: { requiresAuth: true, layout: 'account' },
    },

    //Public Profile
    {
        path: '/:url',
        name: 'publicProfile',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/beats',
        name: 'profileBeats',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/kits',
        name: 'profileSoundKits',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/videos',
        name: 'profileVideos',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/links',
        name: 'profileLinks',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/about',
        name: 'profileAbout',
        component: PublicProfile,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/beats/:beatId',
        name: 'profileBeatDetails',
        component: PublicBeatDetails,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/beat-packs/:packId',
        name: 'profilePackDetails',
        component: PublicPackDetails,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/kits/:kitId',
        name: 'profileKitDetails',
        component: PublicKitDetails,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/cart/',
        name: 'cart',
        component: Cart,
        props: true,
        meta: { layout: 'profile' },
    },
    {
        path: '/:url/checkout-signin',
        name: 'checkoutSignin',
        component: CheckoutSignin,
        props: true,
        meta: { layout: 'auth' },
    },
    {
        path: '/:url/checkout-contact-info',
        name: 'checkoutContactInfo',
        component: CheckoutContactInfo,
        props: true,
        //meta: { layout: 'auth' },
    },
    {
        path: '/:url/checkout-pay',
        name: 'payWithCard',
        component: PayWithCard,
        props: true,
        //meta: { layout: 'auth' },
    },
    {
        path: '/:url/checkout-receipt',
        name: 'checkoutReceipt',
        component: CheckoutReceipt,
        props: true,
        meta: { layout: 'profile' },
    },
    // 404 catch all
    {
        path: '/404',
        alias: '*',
        name: '404',
        component: NotFound,
        meta: { layout: 'error' },
    },
]

export default routes
