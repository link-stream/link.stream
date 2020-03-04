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
        to: '/app/profile',
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
        to: '/app/tracks',
        subs: [
            {
                label: 'Add new track',
                to: '/app/tracks/add',
            },
            {
                label: 'Manage tracks',
                to: '/app/tracks/manage',
            },
            {
                label: 'Promote',
                to: '/app/tracks/promote',
            },
        ],
    },
    {
        id: 'links',
        icon: ['fas', 'link'],
        label: 'Links',
        to: '/app/links',
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
        to: '/app/videos',
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
        to: '/app/analytics',
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
        id: 'account',
        icon: ['fas', 'user'],
        label: 'Account',
        to: '/app/account',
        subs: [
            {
                label: 'Settings',
                to: '/app/account/settings',
            },
            {
                label: 'Billing',
                to: '/app/account/billing',
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