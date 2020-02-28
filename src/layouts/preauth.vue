<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand to="/" class="m-auto">
                <b-img src="@/assets/img/logo/logo-h-lg.png" class="logo" alt="LinkStream"></b-img>
            </b-navbar-brand>
        </b-navbar>
        <transition name="page" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
export default {
    name: 'Preauth',
}
</script>

<style src="~/assets/scss/main.scss" lang="scss"></style>
<style lang="scss" scoped>
.navbar {
    height: 80px;
    background-color: $black !important;

    .navbar-brand .logo {
        height: 34px;
    }
}
/deep/ .form-group {
    width: 350px;
    max-width: 100%;
    margin: 0 auto;
    color: $black;
    text-align: left;

    > div {
        position: relative;
    }
}

/deep/ .btn-round {
    width: 300px;
    max-width: 100%;
    line-height: 1.2;
}
</style>
