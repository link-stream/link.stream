<template>
    <div id="app-container" :class="getMenuType">
        <TopNavbar />
        <Sidebar />
        <main>
            <div class="container-fluid">
                <transition name="page" mode="out-in">
                    <router-view :key="$route.fullPath"></router-view>
                </transition>
            </div>
        </main>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TopNavbar, Sidebar } from '~/components/Views'

export default {
    name: 'Dashboard',
    components: {
        TopNavbar,
        Sidebar,
    },
    computed: {
        ...mapGetters(['getMenuType']),
    },
}
</script>

<style src="~/assets/scss/main.scss" lang="scss"></style>
