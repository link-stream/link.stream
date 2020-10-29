<template>
    <div>
        <h1>Paypal Authorization Code</h1>
        <p>{{ authCode }}</p>
    </div>
</template>
<script>
import axios from '~/plugins/axios'
import qs from 'qs'
export default {
    name: 'PaypalConfirm',
    computed: {
        authCode() {
            return this.$route.query.code
        }
    },
    async mounted() {
        const auth_code = this.$route.query.code
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
            code: auth_code
        }

        let payload
        const response = await axios({
            method: 'POST',
            url: endpoint,
            data: qs.stringify(params),
            headers,
            auth,
        })
        console.log(response)
    }
}
</script>