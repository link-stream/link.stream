import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

export const getAuthCookie = () =>
    Cookies.getJSON(appConstants.cookies.auth.name)

export const setAuthCookie = value => {
    Cookies.set(appConstants.cookies.auth.name, value, {
        expires: appConstants.cookies.auth.expires,
        secure: process.env === 'production',
    })
}

export const getPendingUserCookie = () =>
    Cookies.getJSON(appConstants.cookies.pendingUser.name)

export const setPendingUserCookie = value => {
    Cookies.remove(appConstants.cookies.pendingUser.name, value, {
        secure: process.env === 'production',
    })
}

export function destroySessionStorage() {
    Cookies.remove(appConstants.cookies.auth.name)
    Cookies.remove(appConstants.cookies.pendingUser.name)
    window.localStorage &&
        window.localStorage.removeItem(appConstants.vuexLocalStorage.key)
}
