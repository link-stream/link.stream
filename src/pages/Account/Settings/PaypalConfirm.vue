<template>
    <div class="page page-account-settings">
        <h1 class="page-title">
            <LoadingSpinner
                class="m-2 float-left"
                animation="bounce"
            />
            Processing...
        </h1>
        <h6 class="page-subtitle">
            Please wait until be connected to paypal.
        </h6>
    </div>
</template>
<script>
import axios from '~/plugins/axios'
import qs from 'qs'
import { mapGetters } from 'vuex'
import { api } from '~/services'
export default {
    name: 'PaypalConfirm',
    data: () =>({
        auth_code: '',
        access_token: '',
        refresh_token: '',
        user_id: '',
        email: '',
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    async created() {
        this.auth_code = this.$route.query.code
        if (this.auth_code) {
            await this.getAccessToken()
        }
        if (this.access_token) {
            await this.getUserInfo()
        }
        if (this.user_id) {
            await this.savePaypalInfo()
        }
        const accountType = localStorage.getItem('paypal_type')
        if (accountType === 'payout') {
            this.$router.push({
                name: 'accountSettingsPayouts',
            })
        } else if( accountType === 'payment') {
            this.$router.push({
                name: 'accountSettingsPayments',
            })
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
            console.log(data)
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
            console.log(data)
            if (status === 200) {
                this.user_id = data.user_id
                this.email = data.emails.find(({ primary }) => primary).value
            } else {
                this.$toast.error(response.data.error_description)
            }
        },
        async savePaypalInfo() {
            const params = {
                user_id: this.user.id,
                paypal_user_id: this.user_id,
                paypal_email: this.email,
                account_type: localStorage.getItem('paypal_type'),
            }
            const response = await api.account.confirmPaypalAccount(params)
            console.log(response)
        }
    }
}
</script>