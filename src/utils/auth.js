import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

export const authCookie = {
    get() {
        return Cookies.getJSON(appConstants.authCookie.name)
    },
    set(value) {
        Cookies.set(appConstants.authCookie.name, value, {
            expires: appConstants.authCookie.expires,
            secure: process.env === 'production',
        })
    },
}

export const pendingUserCookie = {
    get() {
        return Cookies.getJSON(appConstants.pendingUserCookie.name)
    },
    set(value) {
        Cookies.remove(appConstants.pendingUserCookie.name, value, {
            secure: process.env === 'production',
        })
    },
}

export function destroySessionStorage() {
    Cookies.remove(appConstants.authCookie.name)
    Cookies.remove(appConstants.pendingUserCookie.name)
    window.localStorage &&
        window.localStorage.removeItem(appConstants.vuexLocalStorage.key)
}
