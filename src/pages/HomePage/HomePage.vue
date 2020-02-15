<template>
    <div id="home-page" class="my-md-5">
        <b-container fluid>
            <b-row class="text-center text-white">
                <b-col cols="12" class="my-3">
                    <b-img src="@/assets/img/logo/logo-lg.png" class="logo" alt="LinkStream"></b-img>
                </b-col>
                <b-col cols="12" class="my-3">
                    <h2 class="text-uppercase">
                        <p class="font-weight-lighter">Your streams come true</p>
                        Spring 2020
                    </h2>
                </b-col>
                <b-col cols="12" class="my-5 pt-4">
                    <a href="https://www.instagram.com/_linkstream" target="_blank" class="text-white">
                        <font-awesome-icon :icon="['fab', 'instagram']" class="mr-1" />
                        Join the fam on Instgram!
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
    name: 'HomePage',
}
</script>

<style lang="scss" scoped>
#home-page {
    font-family: $font-landing-family;
    font-weight: $font-weight-normal;

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
