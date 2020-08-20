<template>
    <div class="beats-container">
        <p v-if="!loading && !beats.length" class="text-center my-5">
            There are no public sound kits.
        </p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-form-row>
                <b-col
                    cols="12"
                    lg="3"
                    md="6"
                    v-for="(item, index) in beats"
                    :key="index"
                >
                    <ArtItem
                        :artItem="item"
                        :selected="index === currentIndex"
                        :status="currentStatus"
                    />
                </b-col>
            </b-form-row>
            <div class="text-center mb-5">
                <basic-button variant="outline-black" size="md">
                    view More
                </basic-button>
            </div>
        </div>
        <ArtPlayer
            :playerItem="curItem"
            :isFirst="currentIndex === 0"
            :isLast="currentIndex === beats.length - 1"
            @prev="prevItem"
            @next="nextItem"
            @setStatus="setStatus"
        />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { api } from '~/services'
import { appConstants } from '~/constants'
import ArtItem from '@/components/Profile/ArtItem'
import ArtPlayer from '@/components/Profile/ArtPlayer'
export default {
    name: 'ProfileBeats',
    components: {
        ArtItem,
        ArtPlayer,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            beats: 'profile/beats',
            profile: 'profile/profile',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: -1,
        currentStatus: false,
        curItem: {},
    }),
    watch: {
        currentIndex() {
            this.updateCurrentItem()
        },
        beats() {
            this.currentIndex = 0
            this.updateCurrentItem()
        }
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        await this.$store.dispatch('profile/getProfileBeats')
        await this.$store.dispatch('profile/getProfileGenres', 'beats')
        this.loading = false
        if (this.beats.length) this.currentIndex = 0
    },
    methods: {
        async updateCurrentItem() {
            if (this.beats[this.currentIndex].id === this.curItem.id) {
                return
            }
            const response = await api.profiles.getProfileBeatById(
                this.profile.id,
                this.beats[this.currentIndex].id,
                this.beats[this.currentIndex].type
            )
            if (response.status !== 'success' || !response.data.length) {
                return {}
            }
            const beat = response.data[0]
            let srcAudio = null
            if (beat.type === 'beat') {
                if (beat.data_tagged_file) {
                    srcAudio = beat.data_tagged_file
                } else if (beat.data_untagged_mp3) {
                    srcAudio = beat.data_untagged_mp3
                } else if (beat.data_untagged_wav) {
                    srcAudio = beat.data_untagged_wav
                }
            }
            this.curItem = {
                id: beat.id,
                coverart: beat.data_image || appConstants.defaultCoverArt,
                title: beat.title,
                producer_name: this.profile.display_name,
                src: srcAudio,
                type: beat.type,
            }
        },
        prevItem() {
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0
        },
        nextItem() {
            this.currentIndex = this.currentIndex < this.beats.length - 1 ? this.currentIndex + 1 : this.beats.length - 1
        },
        setStatus(status) {
            this.currentStatus = status
        },
    },
}
</script>
