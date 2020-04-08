import qs from 'qs'
import axios from '~/plugins/axios'

const METHOD_GET = 'GET'
const METHOD_POST = 'POST'
const METHOD_PUT = 'PUT'
const METHOD_DELETE = 'DELETE'

const call = async function({
    endpoint,
    params = {},
    method = METHOD_GET,
    showProgress = true,
}) {
    const headers = {
        'X-API-KEY': process.env.VUE_APP_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    const auth = {
        username: process.env.VUE_APP_API_USER,
        password: process.env.VUE_APP_API_PASS,
    }

    let payload

    try {
        const response = await axios({
            method,
            url: endpoint,
            data: qs.stringify(params),
            headers,
            auth,
            showProgress,
        })
        payload = response.data
    } catch (e) {
        const response =
            typeof e === 'object' && typeof e.response === 'object'
                ? e.response
                : {}

        if (typeof response.data === 'object') {
            payload = response.data
        } else {
            payload = {
                status: 'false',
                error: response.statusText || 'Unexpected error',
            }
        }
    }

    return payload
}

export const lsApi = {
    users: {
        async getUser(userId) {
            const endpoint = '/users/' + userId
            return await call({ endpoint, showProgress: false })
        },
        async updateUser(userId, params) {
            const endpoint = '/users/' + userId
            const method = METHOD_PUT
            return await call({ endpoint, params, method })
        },
        async emailConfirm(params) {
            const endpoint = '/users/email_confirm'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async google(params) {
            const endpoint = '/users/google'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async instagram(params) {
            const endpoint = '/users/instagram'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async login(params) {
            const endpoint = '/users/login'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async registration(params) {
            const endpoint = '/users/registration'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async forgotPassword(params) {
            const endpoint = '/users/forgot_password'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async passwordReset(params) {
            const endpoint = '/users/password_reset'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async availability({ type, value, userId = '' }) {
            const endpoint = `/users/availability/${type}/${value}/${userId}`
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async resendEmailConfirm(params) {
            const endpoint = '/users/resend_email_confirm'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
    },
    audios: {
        async getGenres() {
            const endpoint = '/audios/genre'
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async getTracksByUser(userId) {
            const endpoint = '/audios/related_track/' + userId
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
    },
    videos: {
        async createVideo(params) {
            const endpoint = '/videos'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async sortVideos(params) {
            const endpoint = '/videos/sort_videos/'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async getVideosByUser(userId, params) {
            const endpoint = '/videos/' + userId
            const method = METHOD_GET
            return await call({ endpoint, params, method, showProgress: false })
        },
    },
    common: {
        async getVisibilitiesByUser(userId) {
            const endpoint = '/common/visibility/' + userId
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async getTimezones() {
            const endpoint = '/common/timezones'
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        getTimes() {
            return [
                { mil: '0', std: '12:00 AM' },
                { mil: '15', std: '12:15 AM' },
                { mil: '30', std: '12:30 AM' },
                { mil: '45', std: '12:45 AM' },
                { mil: '60', std: '1:00 AM' },
                { mil: '75', std: '1:15 AM' },
                { mil: '90', std: '1:30 AM' },
                { mil: '105', std: '1:45 AM' },
                { mil: '120', std: '2:00 AM' },
                { mil: '135', std: '2:15 AM' },
                { mil: '150', std: '2:30 AM' },
                { mil: '165', std: '2:45 AM' },
                { mil: '180', std: '3:00 AM' },
                { mil: '195', std: '3:15 AM' },
                { mil: '210', std: '3:30 AM' },
                { mil: '225', std: '3:45 AM' },
                { mil: '240', std: '4:00 AM' },
                { mil: '255', std: '4:15 AM' },
                { mil: '270', std: '4:30 AM' },
                { mil: '285', std: '4:45 AM' },
                { mil: '300', std: '5:00 AM' },
                { mil: '315', std: '5:15 AM' },
                { mil: '330', std: '5:30 AM' },
                { mil: '345', std: '5:45 AM' },
                { mil: '360', std: '6:00 AM' },
                { mil: '375', std: '6:15 AM' },
                { mil: '390', std: '6:30 AM' },
                { mil: '405', std: '6:45 AM' },
                { mil: '420', std: '7:00 AM' },
                { mil: '435', std: '7:15 AM' },
                { mil: '450', std: '7:30 AM' },
                { mil: '465', std: '7:45 AM' },
                { mil: '480', std: '8:00 AM' },
                { mil: '495', std: '8:15 AM' },
                { mil: '510', std: '8:30 AM' },
                { mil: '525', std: '8:45 AM' },
                { mil: '540', std: '9:00 AM' },
                { mil: '555', std: '9:15 AM' },
                { mil: '570', std: '9:30 AM' },
                { mil: '585', std: '9:45 AM' },
                { mil: '600', std: '10:00 AM' },
                { mil: '615', std: '10:15 AM' },
                { mil: '630', std: '10:30 AM' },
                { mil: '645', std: '10:45 AM' },
                { mil: '660', std: '11:00 AM' },
                { mil: '675', std: '11:15 AM' },
                { mil: '690', std: '11:30 AM' },
                { mil: '705', std: '11:45 AM' },
                { mil: '720', std: '12:00 PM' },
                { mil: '735', std: '12:15 PM' },
                { mil: '750', std: '12:30 PM' },
                { mil: '765', std: '12:45 PM' },
                { mil: '780', std: '1:00 PM' },
                { mil: '795', std: '1:15 PM' },
                { mil: '810', std: '1:30 PM' },
                { mil: '825', std: '1:45 PM' },
                { mil: '840', std: '2:00 PM' },
                { mil: '855', std: '2:15 PM' },
                { mil: '870', std: '2:30 PM' },
                { mil: '885', std: '2:45 PM' },
                { mil: '900', std: '3:00 PM' },
                { mil: '915', std: '3:15 PM' },
                { mil: '930', std: '3:30 PM' },
                { mil: '945', std: '3:45 PM' },
                { mil: '960', std: '4:00 PM' },
                { mil: '975', std: '4:15 PM' },
                { mil: '990', std: '4:30 PM' },
                { mil: '1005', std: '4:45 PM' },
                { mil: '1020', std: '5:00 PM' },
                { mil: '1035', std: '5:15 PM' },
                { mil: '1050', std: '5:30 PM' },
                { mil: '1065', std: '5:45 PM' },
                { mil: '1080', std: '6:00 PM' },
                { mil: '1095', std: '6:15 PM' },
                { mil: '1110', std: '6:30 PM' },
                { mil: '1125', std: '6:45 PM' },
                { mil: '1140', std: '7:00 PM' },
                { mil: '1155', std: '7:15 PM' },
                { mil: '1170', std: '7:30 PM' },
                { mil: '1185', std: '7:45 PM' },
                { mil: '1200', std: '8:00 PM' },
                { mil: '1215', std: '8:15 PM' },
                { mil: '1230', std: '8:30 PM' },
                { mil: '1245', std: '8:45 PM' },
                { mil: '1260', std: '9:00 PM' },
                { mil: '1275', std: '9:15 PM' },
                { mil: '1290', std: '9:30 PM' },
                { mil: '1305', std: '9:45 PM' },
                { mil: '1320', std: '10:00 PM' },
                { mil: '1335', std: '10:15 PM' },
                { mil: '1350', std: '10:30 PM' },
                { mil: '1365', std: '10:45 PM' },
                { mil: '1380', std: '11:00 PM' },
                { mil: '1395', std: '11:15 PM' },
                { mil: '1410', std: '11:30 PM' },
                { mil: '1425', std: '11:45 PM' },
            ]
        },
    },
}
