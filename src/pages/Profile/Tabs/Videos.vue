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
        <ShareArtModal @close="handleCloseShare" />
    </div>
</template>
<script>
import { api } from '~/services'
import { mapGetters } from 'vuex'
import VideoItem from '@/components/Profile/VideoItem'
import ShareArtModal from '@/components/Modal/ShareArtModal'
export default {
    name: 'ProfileSoundKits',
    components: {
        VideoItem,
        ShareArtModal,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            videos: 'profile/videos',
        }),
    },
    data: () => ({
        loading: false,
    }),
    async created() {
        this.loading = true
        const response = await api.profiles.getProfileMain(this.url)
        if (response.status === 'false') {
            this.$router.push({
                name: 'home',
            })            
        } else {
            await this.$store.dispatch('profile/getProfileVideosTab', {
                url: this.url,
            })
        }
        this.loading = false
    },
    methods: {
         handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
    },
}
</script>
