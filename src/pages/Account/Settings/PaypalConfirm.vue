<template>
    <div class="page page-account-settings">
        <h1 class="page-title">Paypal information</h1>
        <LoadingSpinner
            class="m-5"
            animation="bounce"
            v-if="loading"
        />
        <div v-else class="page-body">
            <p>
                <span class="font-weight-bold">Auth Code:</span>
                {{ this.auth_code }}
            </p>
            <p>
                <span class="font-weight-bold">Access Token:</span>
                {{ this.access_token }}
            </p>
            <p>
                <span class="font-weight-bold">Refresh Token:</span>
                {{ this.refresh_token }}
            </p>
            <p>
                <span class="font-weight-bold">User Id:</span>
                {{ this.user_id }}
            </p>
            <p>
                <span class="font-weight-bold">Email:</span>
                {{ this.email }}
            </p>
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios'
import qs from 'qs'
export default {
    name: 'PaypalConfirm',
    data: () =>({
        auth_code: '',
        access_token: '',
        refresh_token: '',
        user_id: '',
        email: '',
    }),
    async created() {
        this.auth_code = this.$route.query.code
        if (this.auth_code) {
            await this.getUserInfo()
        }
        if (this.access_token) {
            await this.getUserInfo()
        }
    },
    methods: {
        async getAccessToken() {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
            const auth = {
                username: process.env.VUE_APP_PAYPAL_CLIENT_ID,
                password: process.env.VUE_APP_PAYPAL_SECRET,
            }
            const endpoint = 'https://api.sandbox.paypal.com/v1/oauth2/token'
            const params = {
                grant_type: 'authorization_code',
                code: this.auth_code
            }

            const { status, data } = await axios({
                method: 'POST',
                url: endpoint,
                data: qs.stringify(params),
                headers,
                auth,
            })
            if (status === 200) {
                this.access_token = data.access_token
                this.refresh_token = data.refresh_token
            } else {
                this.$toast.error(response.data.error_description)
            }
        },
        async getUserInfo() {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.access_token}`
            }
            const endpoint = 'https://api.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1'
            const { status, data } = await axios({
                method: 'GET',
                url: endpoint,
                headers,
            })
            if (status === 200) {
                this.user_id = data.user_id
                this.email = data.emails.value
            } else {
                this.$toast.error(response.data.error_description)
            }
        }
    }
}
</script>