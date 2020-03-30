<template>
    <div id="app">
        <div class="secion-overlay"></div>
        <b-container>
            <b-row>
                <b-col lg="6" offset-lg="3">
                    <b-row class="text-center text-white">
                        <b-col cols="12" class="my-3 text-center">
                            <b-img src="@/assets/img/logo/logo-v-lg.png" class="logo" alt="LinkStream"></b-img>
                        </b-col>
                        <transition name="page" mode="out-in">
                            <router-view :key="$route.fullPath"></router-view>
                        </transition>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Error',
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
.logo {
    max-width: 100%;
    width: 160px;
}
/deep/ h1.title {
    font-family: $font-base-family;
    font-size: 8 * $font-size-base;
    font-weight: $font-weight-bolder;
}
/deep/ p {
    font-size: 1.25 * $font-size-base;
    letter-spacing: 0.15 * $spacer;
}
</style>
