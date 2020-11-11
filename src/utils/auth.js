import { appConstants } from '~/constants'
import Cookies from 'js-cookie'

export const getAuthCookie = () =>
    Cookies.getJSON(appConstants.cookies.auth.name)

export const setAuthCookie = ({ user_id, user_token, id, token }) => {
    Cookies.set(
        appConstants.cookies.auth.name,
        { user_id, user_token, id, token },
        {
            expires: appConstants.cookies.auth.expires,
            secure: process.env === 'production',
        }
    )
}

export const getPendingUserCookie = () =>
    Cookies.getJSON(appConstants.cookies.pendingUser.name)

export const setPendingUserCookie = value => {
    Cookies.set(
        appConstants.cookies.pendingUser.name,
        {
            id: value.id,
            user_name: value.user_name,
        },
        {
            expires: appConstants.cookies.pendingUser.expires,
            secure: process.env === 'production',
        }
    )
}

export function clearLocalStorage() {
    Cookies.remove(appConstants.cookies.auth.name)
    Cookies.remove(appConstants.cookies.pendingUser.name)
    window.localStorage &&
        window.localStorage.removeItem(appConstants.vuexLocalStorage.key)
}

export const getCartCookie = () =>
    Cookies.getJSON(appConstants.cookies.cartItem.name)
