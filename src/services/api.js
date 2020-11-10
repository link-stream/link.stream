import qs from 'qs'
import axios from '~/plugins/axios'
import app from '~/main'

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

    const authToken = app.$store.getters['auth/token']
    if (authToken) {
        headers.Token = authToken
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

        if (typeof payload !== 'object') {
            payload = {
                status: 'false',
                error: 'Unexpected error.',
            }
        }
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
                error: response.statusText || 'Unexpected error.',
            }
        }
    }

    return payload
}

const callS3 = async function({ endpoint, params, showProgress = true }) {
    const formData = new FormData()
    formData.append('acl', params['acl'])
    formData.append('key', params['key'])
    formData.append('X-Amz-Credential', params['X-Amz-Credential'])
    formData.append('X-Amz-Algorithm', params['X-Amz-Algorithm'])
    formData.append('X-Amz-Date', params['X-Amz-Date'])
    formData.append('Policy', params['Policy'])
    formData.append('X-Amz-Signature', params['X-Amz-Signature'])
    formData.append('file', params['file'])

    let payload

    try {
        const response = await axios({
            method: 'POST',
            url: endpoint,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            showProgress,
        })

        if (response.status === 204) {
            payload = {
                status: 'success',
            }
        } else {
            payload = response.data

            if (typeof payload !== 'object') {
                payload = {
                    status: 'false',
                    error: 'Unexpected error.',
                }
            }
        }
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
                error: response.statusText || 'Unexpected error.',
            }
        }
    }

    return payload
}

export const api = {
    call,
    users: {
        async getUser(id) {
            const endpoint = '/users/' + id
            return await call({ endpoint })
        },
        async getStores(user_id) {
            const method = METHOD_GET
            const endpoint = '/users/stores/' + user_id
            return await call({ endpoint, method, showProgress: false })
        },
        async updateUser(id, params) {
            const endpoint = '/users/' + id
            const method = METHOD_PUT
            return await call({ endpoint, params, method })
        },
        async confirmEmail(params) {
            const endpoint = '/users/email_confirm'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async login(params) {
            const endpoint = '/users/login'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async loginNew(params) {
            const endpoint = '/users/login_new'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async googleLogin(params) {
            const endpoint = '/users/google'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async instagramLogin(params) {
            const endpoint = '/users/instagram'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async logout() {
            const endpoint = '/users/logout'
            const method = METHOD_POST
            return await call({ endpoint, method })
        },
        async signup(params) {
            const endpoint = '/users/registration'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async forgotPassword(params) {
            const endpoint = '/users/forgot_password'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async resetPassword(params) {
            const endpoint = '/users/password_reset'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async getAvailability({ type, value, userId = '' }) {
            value = encodeURIComponent(value)
            const endpoint = `/users/availability/${type}/${value}/${userId}`
            const method = METHOD_GET
            return await call({ endpoint, method, showProgress: false })
        },
        async resendConfirmEmail(params) {
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
        async inviteCollab({ userId, email }) {
            email = encodeURIComponent(email)
            const endpoint = `/users/invite_collaborator/${userId}/${email}`
            const method = METHOD_POST
            return await call({ endpoint, method })
        },
        async getDashboard(user_id) {
            const endpoint = `/users/dashboard/${user_id}`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async getAnalytics({ user_id, days }) {
            const endpoint = `/users/analytics/${user_id}/${days}`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async getIpAddress() {
            const endpoint = 'profiles/visitor'
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async insertVisitor(params) {
            const endpoint = 'profiles/visitor'
            const method = METHOD_POST
            return await call({ endpoint, method, params })
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
            const endpoint = `/audios/${userId}/2`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async getBeatsByUserTag(userId, tag) {
            let endpoint = `/audios/${userId}/2`
            if (tag) {
                endpoint += '?tag=' + tag
            }
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async getSoundKitsByUser(userId) {
            const endpoint = `/audios/${userId}/3`
            const method = METHOD_GET
            return await call({ endpoint, method })
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
        async getSoundKit(id, userId) {
            const trackType = 3
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
        async getRelatedTracks(userId) {
            const endpoint = '/audios/related_track/' + userId
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async getPreSignedUrl(user_id, file_name) {
            const endpoint = `/audios/pre_signed_url/${user_id}/${file_name}`
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async putAudio({ endpoint, params }) {
            return await callS3({ endpoint, params })
        },
    },
    albums: {
        async createAlbum(params) {
            const endpoint = '/albums'
            const method = METHOD_POST
            return await call({ endpoint, method, params })
        },
        async updateAlbum(id, params) {
            const endpoint = '/albums/' + id
            const method = METHOD_PUT
            return await call({ endpoint, method, params })
        },
        async getAlbumsByUser(userId) {
            const endpoint = '/albums/' + userId
            const method = METHOD_GET
            return await call({ endpoint, method })
        },
        async getAlbum(id, userId) {
            const endpoint = `/albums/${userId}/${id}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async deleteAlbum(id) {
            const endpoint = '/albums/' + id
            const method = METHOD_DELETE
            return await call({ endpoint, method })
        },
        async sortAlbums(params) {
            const endpoint = '/albums/sort_albums/'
            const method = METHOD_POST
            return await call({ endpoint, params, method })
        },
        async getRelatedAlbums(userId, trackType) {
            const endpoint = `/albums/related_album/${userId}/${trackType}`
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
            })
        },
        async createLink(params) {
            const endpoint = '/links'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
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
    misc: {
        async earlyAccess(params) {
            const endpoint = '/landing/early_access'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
    },
    account: {
        async getPurchases(userId) {
            const endpoint = '/users/purchases/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getPaymentMethodsByUser(userId) {
            const endpoint = '/users/payment_method/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async insertPaymentMethod(params) {
            const endpoint = '/users/payment_method'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async updatePaymentMethod(payment_id, params) {
            const endpoint = '/users/payment_method/' + payment_id
            const method = METHOD_PUT
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async deletePaymentMethod(id) {
            const endpoint = '/users/payment_method/' + id
            const method = METHOD_DELETE
            return await call({
                endpoint,
                method,
            })
        },
        async getNotification(userId) {
            const endpoint = '/users/notification/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async updateNotification(id, params) {
            const endpoint = '/users/notification/' + id
            const method = METHOD_PUT
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async confirmPaypalAccount(params) {
            const endpoint = '/users/confirm_paypal_account/'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async getPaypalAccount(userId, accountType) {
            const endpoint = `/users/paypal_account/${userId}/${accountType}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async connectStripeAccount(params) {
            const endpoint = '/users/connect_stripe_account'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async confirmStripeAccount(params) {
            const endpoint = '/users/confirm_stripe_account'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async getStripeAccount(userId) {
            const endpoint = '/users/stripe_account/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async declinedStripeAccount(params) {
            const endpoint = '/users/decline_stripe_account/'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async deleteStripeAccount(userId, accountId) {
            const endpoint = `/users/decline_stripe_account/${userId}/${accountId}`
            const method = METHOD_DELETE
            return await call({
                endpoint,
                method,
            })
        },
        async deletePaypalAccount(userId, accountType) {
            const endpoint = `/users/paypal_account/${userId}/${accountType}`
            const method = METHOD_DELETE
            return await call({
                endpoint,
                method,
            })
        },
    },
    profiles: {
        async getProfileBeatsTab(userUrl, audio_id, type) {
            let endpoint = '/profiles/beats_tab/' + userUrl
            endpoint += audio_id != undefined ? `/${audio_id}` : ''
            endpoint += type != undefined ? `/${type}` : ''
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileMain(userUrl) {
            const endpoint = '/profiles/' + userUrl
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileBeats(producerId, params) {
            let endpoint = '/profiles/beats/' + producerId
            endpoint += '?page=1'
            if (params) {
                endpoint += params.sort ? '&sort=' + params.sort : ''
                endpoint += params.tag ? '&tag=' + params.tag : ''
                endpoint += params.genre ? '&genre=' + params.genre : ''
                endpoint += params.bpm_min ? '&bpm_min=' + params.bpm_min : ''
                endpoint += params.bpm_max ? '&bpm_max=' + params.bpm_max : ''
                endpoint += params.type ? '&type=' + params.type : ''
            }
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileKitsTab(producerId, audio_id, type) {
            let endpoint = '/profiles/sound_kits_tab/' + producerId
            endpoint += audio_id != undefined ? `/${audio_id}` : ''
            endpoint += type != undefined ? `/${type}` : ''
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileKits(producerId, params) {
            let endpoint = '/profiles/sound_kits/' + producerId
            endpoint += '?page=1'
            if (params) {
                endpoint += params.sort ? '&sort=' + params.sort : ''
                endpoint += params.tag ? '&tag=' + params.tag : ''
                endpoint += params.genre ? '&genre=' + params.genre : ''
            }
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileVideosTab(userUrl, video_id) {
            let endpoint = '/profiles/videos_tab/' + userUrl
            endpoint += video_id != undefined ? `/${video_id}` : ''
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileVideos(producerId, params) {
            let endpoint = '/profiles/videos/' + producerId
            endpoint += '?page=1'
            if (params) {
                endpoint += params.sort ? '&sort=' + params.sort : ''
                endpoint += params.tag ? '&tag=' + params.tag : ''
                endpoint += params.genre ? '&genre=' + params.genre : ''
            }
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileLinksTab(userUrl, audio_id) {
            let endpoint = '/profiles/links_tab/' + userUrl
            endpoint += audio_id != undefined ? `/${audio_id}` : ''
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileLinks(producerId, params) {
            let endpoint = '/profiles/links/' + producerId
            endpoint += '?page=1'
            if (params) {
                endpoint += params.sort ? '&sort=' + params.sort : ''
                endpoint += params.tag ? '&tag=' + params.tag : ''
            }
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileGenres(producerId, type) {
            let endpoint = `/profiles/genres/${producerId}/${type}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileBeatPackById(producerId, beatId, type) {
            let endpoint = `/profiles/beats/${producerId}/${beatId}?type=${type}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileKitById(producerId, kitId) {
            let endpoint = `/profiles/sound_kits/${producerId}/${kitId}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileLicenses(producerId) {
            let endpoint = `/profiles/licenses/${producerId}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileMoreBeats(producerId, type) {
            let endpoint = `/profiles/beats/${producerId}?type=${type}&sort=random&page_size=4`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileKitFileByName(producerId, kitId, fileNamme) {
            let endpoint = `/profiles/sound_kit_file/${producerId}/${kitId}/${fileNamme}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getProfileMoreKits(producerId) {
            let endpoint = `/profiles/sound_kits/${producerId}?sort=random&page_size=4`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async insertAction(params) {
            let endpoint = '/profiles/action'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
    },
    marketing: {
        async getMessageSendto(userId) {
            const endpoint = '/marketing/messages_sent_to/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getMessages(userId) {
            const endpoint = '/marketing/messages/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getMessage(userId, id) {
            const endpoint = '/marketing/messages/' + userId + '/' + id
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async insertMessage(params) {
            const endpoint = '/marketing/messages/'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async updateMessage(id, params) {
            const endpoint = '/marketing/messages/' + id
            const method = METHOD_PUT
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async deleteMessage(id) {
            const endpoint = '/marketing/messages/' + id
            const method = METHOD_DELETE
            return await call({
                endpoint,
                method,
            })
        },
        async getMessageReport(userId, id) {
            const endpoint = '/marketing/messages_report/' + userId + '/' + id
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getMarketingPromotes(userId) {
            const endpoint = '/marketing/marketing_promote/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getSubscribers(userId, searchString) {
            let endpoint = '/marketing/subscribers/' + userId
            if (searchString) {
                endpoint += '?search=' + searchString
            }
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async getSubscriber(userId, id) {
            const endpoint = `/marketing/subscribers/${userId}/${id}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async insertSubscriber(params) {
            const endpoint = '/marketing/subscribers/'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async updateSubscriber(id, params) {
            const endpoint = '/marketing/subscribers/' + id
            const method = METHOD_PUT
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async getSubscriberTags(userId) {
            const endpoint = '/marketing/tags/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async updateSubscribersStatus(params) {
            let endpoint = 'marketing/subscribers_action_bulk'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async importSubscribers(params) {
            let endpoint = 'marketing/subscribers_import'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async insertMedia(params) {
            let endpoint = 'marketing/user_media_files'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async deleteMedia(id) {
            let endpoint = 'marketing/user_media_files/' + id
            const method = METHOD_DELETE
            return await call({
                endpoint,
                method,
            })
        },
        async getMedias(userId) {
            let endpoint = 'marketing/user_media_files/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async youtubeUploader(params) {
            const endpoint = 'marketing/youtube_uploader'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
        async getSubscribersCount(param) {
            const endpoint = `marketing/subscribers_count_by_segment/${param.user_id}/${param.segment}/${param.type}`
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
    },
    cart: {
        async getConfigFees() {
            let endpoint = '/config/fees'
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },

        async creditCardPayment(params) {
            let endpoint = '/payments/cc_payment'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },

        async paypalPayment(params) {
            let endpoint = '/payments/paypal_payment'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },

        async getRecommendations(userId) {
            let endpoint = '/profiles/recommendations/' + userId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
        async cardDetails(params) {
            let endpoint = '/payments/cart_details/'
            const method = METHOD_POST
            return await call({
                endpoint,
                params,
                method,
            })
        },
    },
    sales: {
        async getCustomerOrders(userId, invoiceId) {
            let endpoint = '/users/orders/' + userId + '/' + invoiceId
            const method = METHOD_GET
            return await call({
                endpoint,
                method,
            })
        },
    },
}
