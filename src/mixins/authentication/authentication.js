import GoogleLogin from 'vue-google-login'

export default {
    components: {
        GoogleLogin,
    },
    data() {
        return {
            google: {
                client_id: '508620332071-blu7sd9t3osgc56sg1hnq9m8mu9a6tda.apps.googleusercontent.com',
            },
            instagram: {
                client_id: '697592760647122',
                redirect_uri: window.location.href,
            },
        }
    },
    methods: {
        onGoogleSuccess(googleUser) {
            console.log(googleUser)
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile())
        },
        onInstagramSuccess(instagramUser) {
            console.log(instagramUser)
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
                'https://instagram.com/oauth/authorize/?app_id=' +
                    client_id +
                    '&redirect_uri=' +
                    redirect_uri +
                    '&scope=user_profile,user_media&response_type=code',
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
