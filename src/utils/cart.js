import { appConstants } from '~/constants'
import Cookies from 'js-cookie'

export const getCartCookie = () =>
    Cookies.getJSON(appConstants.cookies.cartItem.name)

export const setCartCookie = (items) => {
    Cookies.set(
        appConstants.cookies.cartItem.name,
        items,
        {
            expires: appConstants.cookies.cartItem.expires,
            secure: process.env === 'production',
        }
    )
}