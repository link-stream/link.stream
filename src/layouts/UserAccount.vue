<template>
    <div class="layout layout-ua" :class="getMenuType">
        <main class="layout__content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNavbar />
        <Sidebar :class="getMenuType" />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api } from '~/services/api'
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
