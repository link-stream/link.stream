<template>
    <div class="layout-landing">
        <div class="secion-overlay"></div>
        <transition name="page" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Landing'
}
</script>