<script>
import { call } from '~/services'

export default {
    name: 'EmailConfirm',
    methods: {
        async emailConfirm() {
            try {
                const { param1, param2 } = this.$route.params
                const { status, error = null } = await call(
                    '/users/email_confirm',
                    {
                        param_1: param1,
                        param_2: param2,
                    },
                    'POST'
                )
                if (status === 'success') {
                    this.$toast.success('Thank you for your confirmation. Please login to LinkStream.')
                } else {
                    this.$toast.error(error)
                }
            } catch (e) {
                this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
            }
            this.$router.push({ name: 'login' })
        },
    },
    render() {
        this.emailConfirm()
        return true
    },
}
</script>
