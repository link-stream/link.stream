<template>
    <div class="layout-user-account">
        <div :class="getMenuType">
            <main class="layout-user-account__content">
                <transition name="page" mode="out-in">
                    <router-view :key="$route.fullPath"></router-view>
                </transition>
            </main>
            <TopNavbar/>
            <Sidebar/>
            <vue-progress-bar></vue-progress-bar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { call } from '~/services'
import TopNavbar from '~/components/UserAccount/TopNavbar'
import Sidebar from '~/components/UserAccount/Sidebar'

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