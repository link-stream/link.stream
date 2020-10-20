export const menus = [
    {
        id: 'dashboard',
        icon: ['fas', 'tachometer-alt'],
        img: 'icon-home.svg',
        active: 'icon-home-active.svg',
        label: 'Home',
        to: '/app',
    },
	{
        id: 'sales',
        icon: ['fas', 'tachometer-alt'],
        img: 'dollar-sign-solid-nav.svg',
        active: 'dollar-sign-solid-active.svg',
        label: 'Sales',
        to: '/app/sales',
    },
	{
        id: 'tracks',
        icon: ['fas', 'music'],
        img: 'icon-tracks.svg',
        active: 'icon-music-active.svg',
        label: 'Your Music',
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
		img: 'icon-link.svg',
        active: 'icon-link-active.svg',
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
		img: 'icon-youtube-active.svg',
        active: 'icon-youtube.svg',
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
		img: 'icon-chart-bar.svg',
        active: 'icon-chart-bar-active.svg',
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
		img: 'bullhorn-solid.svg',
        active: 'bullhorn-solid-active.svg',
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
            {
                label: 'YouTube Uploader',
                to: '/app/marketing/youtube/uploader',
            },
        ],
    },
    {
        id: 'profile',
        icon: ['fas', 'user-circle'],
        img: 'store-solid.svg',
        active: 'store-solid-active.svg',
        label: 'Online Store',
        to: '/app/profile/edit',
        subs: [
            {
                label: 'Edit Profile',
                to: '/app/profile/edit',
            },
            {
                label: 'View Profile',
                to: '/user_url',
            },
        ],
    },  
    {
        id: 'account',
        icon: ['fas', 'user'],
        img: 'ic-settings.svg',
        active: 'ic-settings-active.svg',
        label: 'Account Settings',
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
		img: 'arrow-alt-circle-up.svg',
        active: 'arrow-alt-circle-up-active.svg',
        label: 'Upgrade',
        to: '/app/upgrade',
    },
]
