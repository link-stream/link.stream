// pages
import { HomePage } from '~/pages/HomePage'

const routes = [
    // Main pages
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: { requiresGuest: true, layout: 'landing' },
    },
]

export default routes
