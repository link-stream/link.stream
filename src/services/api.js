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

export const api = {
    users: {
        async getUser(id) {
            const endpoint = '/users/' + id
            return await call({ endpoint, showProgress: false })
        },
        async updateUser(id, params) {
            const endpoint = '/users/' + id
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
        async searchCollab({ userId, search }) {
            search = encodeURIComponent(search)
            const endpoint = `/users/collaborator/${userId}?search=${search}`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
    },
    licenses: {
        async getLicensesByUser(userId) {
            const endpoint = '/licenses/' + userId
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async updateLicense(id, params) {
            const endpoint = '/licenses/' + id
            const method = METHOD_PUT
            return await call({ endpoint, method, params })
        },
    },
    audios: {
        async getBeatsByUser(userId) {
            const endpoint = '/audios/' + userId
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async getKeys() {
            const endpoint = '/audios/audio_key'
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async createAudio(params) {
            const endpoint = '/audios'
            const method = METHOD_POST
            return await call({ endpoint, method, params })
        },
        async getBeat(id, userId) {
            const trackType = 2
            const endpoint = `/audios/${userId}/${trackType}/${id}`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async updateAudio(id, params) {
            const endpoint = '/audios/' + id
            const method = METHOD_PUT
            return await call({ endpoint, params, method })
        },
        async deleteAudio(id) {
            const endpoint = '/audios/' + id
            const method = METHOD_DELETE
            return await call({ endpoint, method })
        },
        async sortAudios(params) {
            const endpoint = '/audios/sort_audios/'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async getAvailability({
            userId,
            value,
            audioId = '',
            field = 'title',
            trackType = '2',
        }) {
            value = encodeURIComponent(value)
            const endpoint = `/audios/availability/${userId}/${field}/${trackType}/${audioId}?value=${value}`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
    },
    videos: {
        async createVideo(params) {
            const endpoint = '/videos'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async updateVideo(id, params) {
            const endpoint = '/videos/' + id
            const method = METHOD_PUT
            return await call({ endpoint, params, method })
        },
        async deleteVideo(id) {
            const endpoint = '/videos/' + id
            const method = METHOD_DELETE
            return await call({ endpoint, method })
        },
        async sortVideos(params) {
            const endpoint = '/videos/sort_videos/'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async getVideosByUser(userId, params) {
            const endpoint = '/videos/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                params,
                method,
                showProgress: false,
            })
        },
    },
    links: {
        async getLinksByUser(userId) {
            const endpoint = '/links/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
                showProgress: false,
            })
        },
        async createLink(params) {
            const endpoint = '/links'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
                showProgress: false,
            })
        },
        async updateLink(id, params) {
            const endpoint = '/links/' + id
            const method = METHOD_PUT
            return await call({ endpoint, params, method })
        },
        async deleteLink(id) {
            const endpoint = '/links/' + id
            const method = METHOD_DELETE
            return await call({
                endpoint,
                method,
                showProgress: false,
            })
        },
        async sortLinks(params) {
            const endpoint = '/links/sort_links/'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
    },
    common: {
        async getGenres() {
            const endpoint = '/common/genres'
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async getVisibilitiesByUser(userId) {
            const endpoint = '/common/visibility/' + userId
            const method = METHOD_GET
            const response = await call({
                endpoint,
                method,
                showProgress: false,
            })
            const { status, data } = response
            if (status === 'success') {
                response.data = Object.keys(data).map(key => {
                    return {
                        id: key,
                        title: data[key],
                    }
                })
            }
            return response
        },
        async getTimezones() {
            const endpoint = '/common/timezones'
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
    },
}
