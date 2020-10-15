<template>
    <div class="page page-youtube-uploader">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">YouTube uploader</h1>
                <h6 v-if="googleUserInfo.token" class="page-subtitle">
                    You are signed into YouTube as
                    <a href="#">
                        {{ googleUserInfo.userName }}
                    </a>
                </h6>
                <h6 v-else class="page-subtitle">
                    Drive more traffic to your store and boost sales by
                    publishing your beats to YouTube
                </h6>
            </div>
        </header>
        <main class="page-body">
            <div class="Card youtube-token" v-if="!googleUserInfo.token">
                <b-row>
                    <b-col cols="12" xl="9" class="mx-auto">
                        <img
                            class="img-youtube"
                            src="@/assets/img/ico/logo_youtube.svg"
                        />
                        <h6 class="description">
                            Start by clicking the button below - you will be
                            taken to Google Accounts so you can allow LinkStream
                            to interface with your YouTube Channel
                        </h6>
                        <GoogleLogin
                            class="btn-google"
                            :params="google"
                            :onSuccess="onGoogleSuccess"
                        >
                            <img src="@/assets/img/ico/logo_google.svg" />
                            <span>Sign in with Google</span>
                        </GoogleLogin>
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
                <div v-else>
                    <div v-if="isSearched" class="alert-search">
                        <a href="#" @click.prevent="clearSearch">
                            <font-awesome-icon
                                :icon="['fas', 'times-circle']"
                            />
                        </a>
                        <span class="font-weight-bold">
                            Searching for
                        </span>
                        <span>
                            {{ searchString }}
                        </span>
                    </div>
                    <b-row cols="2" cols-md="3" cols-lg="4" cols-xl="5">
                        <b-col
                            v-for="beat in beats"
                            :key="beat.id"
                            class="one-beat"
                            @click="showPreviewVideo(beat)"
                        >
                            <b-aspect class="img-container">
                                <img
                                    v-if="beat.data_image"
                                    :src="beat.data_image"
                                />
                                <img v-else :src="defaultCoverArt" />
                            </b-aspect>
                            <div class="beat-title">
                                {{ beat.title }}
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import { api } from '~/services'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import GoogleLogin from 'vue-google-login'
export default {
    name: 'YoutubeUploader',
    components: {
        GoogleLogin,
    },
    data: () => ({
        loading: false,
        searchString: '',
        beats: [],
        defaultCoverArt: appConstants.defaultCoverArt,
        google: {
            client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        },
        isSearched: false,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            googleUserInfo: 'marketing/googleUserInfo',
        }),
    },
    created() {
        this.searchBeat()
    },
    methods: {
        async searchBeat() {
            this.loading = true
            const { status, data } = await api.audios.getBeatsByUserTag(
                this.user.id,
                this.searchString
            )
            if (status === 'success') {
                this.beats = data
            }
            this.loading = false
            this.isSearched = !!this.searchString
        },
        async onGoogleSuccess(googleUser) {
            const { id_token } = googleUser.getAuthResponse()
            const params = {
                userName: googleUser.getBasicProfile().getName(),
                token: id_token,
            }
            await this.$store.dispatch('marketing/setGoogleUserInfo', params)
        },
        clearSearch() {
            this.searchString = ''
            this.isSearched = false
        },
        showPreviewVideo(beat) {
            this.$router.push({
                name: 'previewVideo',
                params: {
                    beat: beat,
                },
            })
        },
    },
}
</script>
