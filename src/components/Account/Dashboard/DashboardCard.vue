<template>
    <div class="DashboardCard">
        <h3>Verify your email address</h3>
        <p class="mt-3">
            A verification email has been sent to {{ email }}. Follow the link
            in the verification email to confirm that you can access your email
            account.
        </p>
        <basic-button size="xs" class="btn-resend" @click="resendEmail">Resend verification email</basic-button>
    </div>
</template>

<script>
import { api } from '~/services'
export default {
    name: 'DashboardCard',
    props: {
        user_id: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    data() {
        return {}
    },
    methods: {
        async resendEmail() {
            const { status } = await api.users.resendConfirmEmail({
                user_id: this.user_id,
            })
            if (status == 'success') {
                this.$toast.success('The verification email has been sent!')
            }
        },
    },
}
</script>
