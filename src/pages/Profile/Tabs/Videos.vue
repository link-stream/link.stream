<template>
    <div class="beats-container">
        <p v-if="!loading && !videos.length" class="text-center my-5">There are no public videos.</p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-row>
                <b-col cols="12" lg="4" md="6" v-for="(item, index) in videos" :key="index">
                    <VideoItem :videoItem="item" />
                </b-col>
            </b-row>
            <div class="text-center mb-5">
                <basic-button variant="outline-black" size="md" class="btn-view-more">View More</basic-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import VideoItem from '@/components/Profile/VideoItem'
export default {
    name: 'ProfileSoundKits',
    components: {
        VideoItem,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
            videos: 'profile/videos',
        }),
    },
    data: () => ({
        loading: false,
    }),
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileVideosTab', {
            url: this.url,
        })
        this.loading = false
    },
}
</script>
