<template>
    <div id="app">
        <div class="secion-overlay"></div>
        <transition name="page" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Landing',
}
</script>

<style src="~/assets/scss/main.scss" lang="scss"></style>
<style lang="scss" scoped>
.secion-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $black;
}
</style>
