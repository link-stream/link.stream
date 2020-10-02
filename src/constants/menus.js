export const menus = [
    {
        id: 'dashboard',
        icon: ['fas', 'tachometer-alt'],
        label: 'Dashboard',
        to: '/app',
    },
    {
        id: 'profile',
        icon: ['fas', 'user-circle'],
        label: 'Profile',
        to: '/app/profile/edit',
        subs: [
            {
                label: 'Edit Profile',
                to: '/app/profile/edit',
            },
            {
                label: 'View Profile',
                to: '/app/profile/view',
            },
        ],
    },
    {
        id: 'tracks',
        icon: ['fas', 'music'],
        label: 'Tracks',
        to: '/app/beats/manage',
        subs: [
            {
                label: 'Beats',
                to: '/app/beats/manage',
            },
            {
                label: 'Licenses',
                to: '/app/licenses/manage',
            },
            {
                label: 'Sound Kits',
                to: '/app/kits/manage',
            },
            {
                label: 'Beat Packs',
                to: '/app/beat-packs/manage',
            },
        ],
    },
    {
        id: 'links',
        icon: ['fas', 'link'],
        label: 'Links',
        to: '/app/links/manage',
        subs: [
            {
                label: 'Add new link',
                to: '/app/links/add',
            },
            {
                label: 'Manage links',
                to: '/app/links/manage',
            },
        ],
    },
    {
        id: 'videos',
        icon: ['fas', 'play-circle'],
        label: 'Videos',
        to: '/app/videos/manage',
        subs: [
            {
                label: 'Add new video',
                to: '/app/videos/add',
            },
            {
                label: 'Manage videos',
                to: '/app/videos/manage',
            },
        ],
    },
    {
        id: 'analytics',
        icon: ['fas', 'chart-bar'],
        label: 'Analytics',
        to: '/app/analytics/trafic',
        subs: [
            {
                label: 'Trafic',
                to: '/app/analytics/trafic',
            },
            {
                label: 'Revenue',
                to: '/app/analytics/revenue',
            },
        ],
    },
    {
        id: 'marketing',
        icon: ['fas', 'bullhorn'],
        label: 'Marketing',
        to: '/app/marketing/messages',
        subs: [
            {
                label: 'Messages',
                to: '/app/marketing/messages',
            },
            {
                label: 'Subscribers',
                to: '/app/marketing/subscribers',
            },
            {
                label: 'Landing Pages',
                to: '/app/marketing/landing-pages',
            },
            {
                label: 'Ad Promos',
                to: '/app/marketing/ad-promos',
            },
        ],
    },
    {
        id: 'account',
        icon: ['fas', 'user'],
        label: 'Account',
        to: '/app/account/info',
        subs: [
            {
                label: 'Account Info',
                to: '/app/account/info',
            },
            {
                label: 'Purchases',
                to: '/app/account/purchases',
            },
            {
                label: 'Payments',
                to: '/app/account/payments',
            },
            {
                label: 'Payouts',
                to: '/app/account/payouts',
            },
            {
                label: 'Notifications',
                to: '/app/account/notifications',
            },
        ],
    },
    {
        id: 'upgrade',
        icon: ['fas', 'arrow-circle-up'],
        label: 'Upgrade',
        to: '/app/upgrade',
    },
]
