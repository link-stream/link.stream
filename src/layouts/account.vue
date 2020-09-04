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
        <SelectPlanBar v-if="$route.name === 'marketingMessages'" />
        <TopNav class="d-lg-none" />
        <SideBar />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '~/components/Account/TopNav/TopNav'
import SideBar from '~/components/Account/SideNav/SideBar'
import SelectPlanBar from '~/components/Account/SideNav/SelectPlanBar'
export default {
    name: 'Account',
    components: {
        TopNav,
        SideBar,
        SelectPlanBar,
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
