<template>
    <div class="layout layout-acc" :class="getMenuType">
        <main class="layout-content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav />
        <SideNav :class="getMenuType" />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '~/components/Account/TopNav/TopNav'
import SideNav from '~/components/Account/SideNav/SideNav'

export default {
    name: 'Account',
    components: {
        TopNav,
        SideNav,
    },
    computed: {
        ...mapGetters(['getMenuType']),
    },
    created() {
        this.$store.dispatch('me/loadProfile')
    },
}
</script>
