import GoogleLogin from 'vue-google-login'
import { call } from '~/services'

export default {
    components: {
        GoogleLogin,
    },
    data() {
        return {
            google: {
                client_id: process.env.SOCIAL.GOOGLE_CLIENT_ID,
            },
            instagram: {
                client_id: process.env.SOCIAL.INSTAGRAM_CLIENT_ID,
                redirect_uri: window.location.href,
            },
            loading: {
                google: false,
                instagram: false,
            },
        }
    },
    methods: {
        async onGoogleSuccess(googleUser) {
            const { id_token: platform_token } = googleUser.getAuthResponse()
            if (platform_token) {
                this.loading.google = true
                try {
                    const { status, data } = await call('/users/google', { platform_token }, 'POST')
                    if (status === 'success') {
                        console.log(data)
                        this.$toast.success('Success')
                    }
                } catch (e) {
                    this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }
                this.loading.google = false
            }
        },
        async onInstagramSuccess(instagramUser) {
            const { code } = instagramUser
            const { redirect_uri: redirect_url } = this.instagram
            if (code && redirect_url) {
                this.loading.instagram = true
                try {
                    const { status, data } = await call('/users/instagram', { code, redirect_url }, 'POST')
                    if (status === 'success') {
                        console.log(data)
                        this.$toast.success('Success')
                    }
                } catch (e) {
                    this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }
                this.loading.instagram = false
            }
        },
        authenticateInstagram() {
            const _this = this
            const { client_id, redirect_uri } = this.instagram
            // Pop-up window size, change if you want
            const popupWidth = 700,
                popupHeight = 500,
                popupLeft = (window.screen.width - popupWidth) / 2,
                popupTop = (window.screen.height - popupHeight) / 2
            // Url needs to point to instagram_auth.php
            const popup = window.open(
                `https://instagram.com/oauth/authorize/?app_id=${client_id}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`,
                '',
                'width=' + popupWidth + ',height=' + popupHeight + ',left=' + popupLeft + ',top=' + popupTop + ''
            )
            const interval = setInterval(function() {
                try {
                    // Check if hash exists
                    if (popup.location.search.length) {
                        // Hash found, that includes the access token
                        clearInterval(interval)
                        var code = popup.location.search.slice(6) //slice ?code= from string
                        popup.close()
                        _this.onInstagramSuccess({ code })
                    }
                } catch (evt) {
                    // Permission denied
                }
            }, 500)
        },
    },
}
