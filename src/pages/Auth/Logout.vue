<script>
export default {
    name: 'logout',
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push({ name: 'login' })
        },
    },
    render() {
        this.logout()
        return true
    },
}
</script>
