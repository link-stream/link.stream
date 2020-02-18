// pages
import { HomePage } from '~/pages/HomePage'
import { Legal } from '~/pages/Other'

const routes = [
    // Main pages
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: { requiresGuest: true, layout: 'landing' },
    },
    // Other pages
    {
        path: '/legal',
        name: 'legal',
        component: Legal,
        meta: { requiresGuest: true, layout: 'landing' },
    },
]

export default routes
