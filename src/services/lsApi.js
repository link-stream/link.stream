import qs from 'qs'
import axios from '~/plugins/axios'

const METHOD_GET = 'GET'
const METHOD_POST = 'POST'
const METHOD_PUT = 'PUT'
const METHOD_DELETE = 'DELETE'

const call = async function({ endpoint, params = {}, method = METHOD_GET, showProgress = true }) {
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
        const response = (typeof e === 'object') && (typeof e.response === 'object')
            ? e.response
            : {}

        if (typeof response.data === 'object') {
            payload = response.data
        } else {
            payload = {
                status: 'false',
                error: response.statusText || 'Unexpected error'
            }
        }
    }
    
    return payload
}

export const lsApi = {
    users: {
        async getUserById(user_id) {
            const endpoint = '/users/' + user_id
            return await call({ endpoint, showProgress: false })
        },
        async updateUser(user_id, params) {
            const endpoint = '/users/' + user_id
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
        async availability({ type, value, user_id = '' }) {
            const endpoint = `/users/availability/${type}/${value}/${user_id}`
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async resendEmailConfirm(params) {
            const endpoint = '/users/resend_email_confirm'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        }
    },
    audios: {
        async getGenres() {
            const endpoint = '/audios/genre'
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async getRelatedTracksByUserId(user_id) {
            const endpoint = '/audios/related_track/' + user_id
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async getVisibilityByUserId(user_id) {
            const endpoint = '/audios/visibility/' + user_id
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        }
    },
    videos: {
        async createVideo(params) {
            const endpoint = '/videos'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async sortVideos(params) {
            const endpoint = '/videos/sort_videos'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async getVideosByUserId(user_id, params) {
            const endpoint = '/videos/' + user_id
            const method = METHOD_GET
            return await call({ endpoint, params, method, showProgress: false })
        }
    }
}
