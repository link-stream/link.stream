<template>
    <div class="page page-youtube-uploader">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">YouTube uploader</h1>
                <h6 class="page-subtitle">
                    Drive more traffic to your store and boost sales by
                    publishing your beats to YouTube
                </h6>
            </div>
        </header>
        <main class="page-body">
            <div class="Card youtube-token" v-if="!googleToken">
                <b-row>
                    <b-col cols="12" xl="9" class="mx-auto">
                        <img class="img-youtube" src="@/assets/img/ico/logo_youtube.svg" />
                        <h6  class="description">
                            Start by clicking the button below - you will be taken to
                            Google Accounts so you can allow LinkStream to interface
                            with your YouTube Channel
                        </h6>
                        <a href="#" class="btn-google" @click.prevent="loginGoogle()">
                            <img src="@/assets/img/ico/logo_google.svg" />
                            <span>Sign in with Google</span>
                        </a>
                    </b-col>
                </b-row>
            </div>
            <div v-else class="uploader-container">
                <h4 class="title">
                    Select a beat to upload
                </h4>
                <SearchInput
                    pill
                    color="black"
                    v-model="searchString"
                    placeholder="Search for beat"
                    direction="right"
                    class="search-form"
                    @keyupEnter="searchBeat"
                />
                <LoadingSpinner class="page-loader" v-if="loading" />
                <b-form-row v-else>
                    <b-col v-for="beat in beats" :key="beat.id">
                        <b-aspect class="img-container">
                            <img v-if="beat.data_image" :src="beat.data_image" />
                            <img v-else :src="defaultCoverArt" />
                        </b-aspect>
                        <div class="beat-title">
                            {{ beat.title }}
                        </div>
                    </b-col>
                </b-form-row>        
            </div>
        </main>
    </div>
</template>
<script>
import { api } from '~/services'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
export default {
    name: 'YoutubeUploader',
    data: () => ({
        loading: false,
        googleToken: '',
        searchString: '',
        beats: [],
        defaultCoverArt: appConstants.defaultCoverArt,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    created() {
        this.searchBeat()
    },
    methods: {
        async searchBeat() {
            this.loading = true
            const { status, data } = await api.audios.getBeatsByUser(this.user.id)
            if (status === 'success') {
                this.beats = data
            }
            this.loading = false
        },
        loginGoogle() {
            this.googleToken = 'token'
        },
    },
}
</script>
