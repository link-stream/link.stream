<template>
    <div class="layout layout-account" :class="getMenuType">
        <!--<LoadingMask
            variant="fullscreen"
            :class="{
                'is-shown': loading,
            }"
        />-->
        <main class="layout-content" style="margin-bottom: -50px;">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav class="d-lg-none" />
        <SideBar />
        <AddStore />        
        <SelectPlanBar v-if="showPlanBar" />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '~/components/Account/TopNav/TopNav'
import SideBar from '~/components/Account/SideNav/SideBar'
import AddStore from '~/components/Modal/AddStore'
import SelectPlanBar from '~/components/Account/SideNav/SelectPlanBar'
export default {
    name: 'Account',
    components: {
        TopNav,
        SideBar,
        SelectPlanBar,
        AddStore,
    },
    computed: {
        ...mapGetters({
            getMenuType: 'getMenuType',
            user: 'me/user',
            showPlanBar: 'me/showPlanBar',
            //loading: 'loading/isStarted',
        }),
        isShowPlanBar() {
            return (
                this.$route.name === 'marketingMessages' ||
                this.$route.name === 'editMessage' ||
                this.$route.name === 'selectEmailTemplate'
            )
        },
    },
    watch: {
        async user() {
            if (this.user != null) {
                this.$store.commit('me/SET_PLAN_BAR', this.user.plan_id === '1')
            }
        },
    },
    created() {
        this.$store.dispatch('me/loadProfile')
        this.$store.dispatch('me/loadStores')
    },
}
</script>
