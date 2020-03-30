<template>
    <div id="app">
        <transition name="page" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Default',
}
</script>

<style src="~/assets/scss/main.scss" lang="scss"></style>
