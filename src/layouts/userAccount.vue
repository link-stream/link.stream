<template>
    <div id="app-container" :class="getMenuType">
        <main>
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNavbar />
        <Sidebar />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { call } from '~/services'
import { TopNavbar, Sidebar } from '~/components/Views'

export default {
    name: 'UserAccount',
    components: {
        TopNavbar,
        Sidebar,
    },
    computed: {
        ...mapGetters(['user', 'getMenuType']),
    },
    async created() {
        // fetch user data
        const { status, data } = await call(`/users/${this.user.id}`, null, 'GET', false)
        if (status === 'success') {
            this.$store.dispatch('updateProfile', { user: data })
        }
    },
}
</script>

<style src="~/assets/scss/main.scss" lang="scss"></style>
<style lang="scss" scoped>
/deep/ h2.page-title {
    font-weight: 800;
    color: $black;
}
/deep/ h6.step {
    font-size: 0.775 * $font-size-base;
    font-weight: 600;
    color: $gray-500;
    text-transform: uppercase;
    letter-spacing: 1px;
}
</style>
