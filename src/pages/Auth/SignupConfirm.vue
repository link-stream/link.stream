<template>
    <div class="page page-signup-conf my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="my-5">
                    <h2 class="text-black font-weight-bolder">
                        Confirm Email Address
                    </h2>
                    <p class="fs-1 mx-auto my-4">
                        Please check your inbox to confirm your email address
                        and complete signup.
                    </p>
                    <b-button variant="link" @click="resendConfirationEmail">
                        Resend confirmation email
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { api } from '~/services'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
export default {
    name: 'SignupConfirm',
    data() {
        return {
            pending_user: null,
        }
    },
    mounted() {
        // Redirect to signup page when there is no information of signup user
        if (!Cookies.getJSON(appConstants.cookies.pendingUser.name)) {
            this.$router.push({ name: 'signup' })
        }
    },
    methods: {
        async resendConfirationEmail() {
            this.pending_user = Cookies.getJSON(
                appConstants.cookies.pendingUser.name
            )
            const { status, error } = await api.users.resendConfirmEmail({
                user_id: this.pending_user.id,
            })
            if (status === 'success') {
                this.$toast.success(
                    'We have sent confirmation email successfully.'
                )
            } else {
                this.$toast.error(error)
            }
        },
    },
}
</script>
