<template>
    <div id="register-conform-page" class="my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="my-5">
                    <h2 class="text-black font-weight-bolder">Confirm Email Address</h2>
                    <p class="fs-1 mx-auto my-4">Please check your inbox to confirm your email address and complete signup.</p>
                    <b-button variant="link" @click="resendConfirationEmail">Resend confirmation email</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'RegisterConfirm',
    methods: {
        resendConfirationEmail() {
            // TODO:: resend confiration email here
        },
    },
}
</script>

<style lang="scss" scoped>
#register-conform-page {
    p {
        width: 350px;
        max-width: 100%;
        line-height: 2;
    }
}
</style>
