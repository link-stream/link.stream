<template>
    <div class="page page-account-settings">
        <h1 class="page-title">
            <LoadingSpinner class="m-2 float-left" animation="bounce" />Processing...
        </h1>
        <!-- <h6 class="page-subtitle">Please wait until be connected to stripe.</h6> -->
    </div>
</template>

<script>
import { api } from '~/services'
export default {
    name: 'StripeCancel',
    async mounted() {
        const response = await api.account.declinedStripeAccount({
            user_id: JSON.parse(localStorage.getItem('user_id')),
            account_id: JSON.parse(localStorage.getItem('account_id')),
        })
        this.$router
            .push({
                name: 'accountSettingsPayouts',
            })
            .catch(err => {})
    },
}
</script>
