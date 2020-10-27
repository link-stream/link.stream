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
                target: '_self',
            },
            {
                label: 'Licenses',
                to: '/app/licenses/manage',
                target: '_self',
            },
            {
                label: 'Sound Kits',
                to: '/app/kits/manage',
                target: '_self',
            },
            {
                label: 'Beat Packs',
                to: '/app/beat-packs/manage',
                target: '_self',
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
                target: '_self',
            },
            {
                label: 'Manage links',
                to: '/app/links/manage',
                target: '_self',
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
                target: '_self',
            },
            {
                label: 'Manage videos',
                to: '/app/videos/manage',
                target: '_self',
            },
        ],
    },
	{
        id: 'analytics',
        icon: ['fas', 'chart-bar'],
        img: 'icon-chart-bar.svg',
        active: 'icon-chart-bar-active.svg',
        label: 'Analytics',
        to: '/app/analytics',
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
                target: '_self',
            },
            {
                label: 'Subscribers',
                to: '/app/marketing/subscribers',
                target: '_self',
            },
            // {
            //     label: 'Landing Pages',
            //     to: '/app/marketing/landing-pages',
            //     target: '_self',
            // },
            // {
            //     label: 'Ad Promos',
            //     to: '/app/marketing/ad-promos',
            //     target: '_self',
            // },
            {
                label: 'YouTube Uploader',
                to: '/app/marketing/youtube/uploader',
                target: '_self',
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
                target: '_self',
            },
            {
                label: 'View Profile',
                to: '/user_url',
                target: '_blank',
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
                target: '_self',
            },
            {
                label: 'Purchases',
                to: '/app/account/purchases',
                target: '_self',
            },
            {
                label: 'Payments',
                to: '/app/account/payments',
                target: '_self',
            },
            {
                label: 'Payouts',
                to: '/app/account/payouts',
                target: '_self',
            },
            {
                label: 'Notifications',
                to: '/app/account/notifications',
                target: '_self',
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
