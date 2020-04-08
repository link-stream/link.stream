<template>
    <div class="layout-ua">
        <div :class="getMenuType">
            <main class="layout-content">
                <transition name="page" mode="out-in">
                    <router-view :key="$route.fullPath"></router-view>
                </transition>
            </main>
            <TopNavbar />
            <Sidebar />
            <vue-progress-bar></vue-progress-bar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { lsApi } from '~/services/lsApi'
import TopNavbar from '~/components/UserAccount/TopNavbar/TopNavbar'
import Sidebar from '~/components/UserAccount/Sidebar/Sidebar'

export default {
    name: 'UserAccount',
    components: {
        TopNavbar,
        Sidebar,
    },
    computed: {
        ...mapGetters(['getMenuType']),
    },
}
</script>
