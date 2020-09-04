<template>
    <div class="layout layout-account" :class="getMenuType">
        <!--<LoadingMask
            variant="fullscreen"
            :class="{
                'is-shown': loading,
            }"
        />-->
        <main class="layout-content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav class="d-sm-none" />
        <SideBar :class="getMenuType" />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '~/components/Account/TopNav/TopNav'
import SideBar from '~/components/Account/SideNav/SideBar'

export default {
    name: 'Account',
    components: {
        TopNav,
        SideBar,
    },
    computed: {
        ...mapGetters({
            getMenuType: 'getMenuType',
            //loading: 'loading/isStarted',
        }),
    },
    created() {
        this.$store.dispatch('me/loadProfile')
    },
}
</script>
