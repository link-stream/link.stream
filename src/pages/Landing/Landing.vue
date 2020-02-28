<template>
    <div id="landing-page" class="my-md-5">
        <b-container fluid>
            <b-row class="text-center text-white">
                <b-col cols="12" class="my-3">
                    <b-img src="@/assets/img/logo/logo-v-lg.png" class="logo" alt="LinkStream"></b-img>
                </b-col>
                <b-col cols="12" class="my-3">
                    <h2 class="text-uppercase font-weight-bold">
                        <p class="font-weight-light">Your streams come true</p>
                        Spring 2020
                    </h2>
                </b-col>
                <b-col cols="12" class="my-5 pt-4">
                    <a href="https://www.instagram.com/_linkstream" target="_blank" class="text-white">
                        <font-awesome-icon :icon="['fab', 'instagram']" class="mr-1" />
                        Join the fam on Instagram!
                    </a>
                </b-col>
                <b-col cols="12">
                    <label>©2020 LinkStream LLC. All Rights Reserved.</label>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Landing',
}
</script>

<style lang="scss" scoped>
#landing-page {
    font-family: $font-source-family;

    .logo {
        max-width: 100%;
        width: 360px;
    }
    h2 {
        font-family: $font-base-family;
        letter-spacing: 0.25 * $spacer;
    }
}
</style>
