<template>
    <div class="layout layout-account">
        <main class="layout-content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import TopNav from '~/components/Profile/TopNav'

export default {
    name: 'Profile',
    components: {
        TopNav,
    },
}
</script>
