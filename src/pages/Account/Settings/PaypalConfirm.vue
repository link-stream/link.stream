<template>
    <div>
        <h1>Paypal Authorization Code</h1>
        <p>{{ authCode }}</p>
    </div>
</template>
<script>
export default {
    name: 'PaypalConfirm',
    computed: {
        authCode() {
            return this.$route.query.code
        }
    }
}
</script>