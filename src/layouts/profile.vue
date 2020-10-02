<template>
    <div class="layout layout-profile">
        <main class="layout-content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav />
        <vue-progress-bar></vue-progress-bar>
        <AddedCartModal />
    </div>
</template>

<script>
import TopNav from '~/components/Profile/TopNav'
import AddedCartModal from '@/components/Modal/AddedCartModal'
export default {
    name: 'Profile',
    components: {
        TopNav,
        AddedCartModal,
    },
}
</script>
