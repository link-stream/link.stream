<template>
    <div id="app">
        <TopNavbar />
        <transition name="page" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import { TopNavbar } from '~/components/Views'

export default {
    name: 'Dashboard',
    components: {
        TopNavbar,
    },
}
</script>

<style src="~/assets/scss/main.scss" lang="scss"></style>
