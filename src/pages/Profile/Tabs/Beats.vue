<template>
    <div class="beats-container">
        <p
            v-if="!loading && !beats.length"
            class="text-center my-5"
        >There are no public beats or beat packs.</p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-form-row>
                <b-col cols="12" lg="3" md="6" v-for="(item, index) in beats" :key="index">
                    <ArtItem
                        :artItem="item"
                        :selected="index === currentIndex"
                        :status="currentStatus"
                        :index="index"
                        :loading="individualLoading"
                        @select="setCurrentItem"
                    />
                </b-col>
            </b-form-row>
            <div class="text-center mb-5">
                <basic-button variant="outline-black" size="md" class="btn-view-more">View More</basic-button>
            </div>
        </div>
        <ArtPlayer
            :playerItem="playerItem"
            :isFirst="currentIndex === 0"
            :isLast="currentIndex === beats.length - 1"
            :status="currentStatus"
            :loading="individualLoading"
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
            beatsLoad: 'profile/beatsLoad',
            profile: 'profile/profile',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: -1,
        currentStatus: false,
        playerItem: {},
        curBeat: {},
        individualLoading: false,
    }),
    watch: {
        currentIndex() {
            this.updateCurrentItem()
        },
        beats() {
            const that = this
            const prevIndex = that.currentIndex
            this.beats.some((beat, index) => {
                if (beat.type === 'beat') {
                    that.currentIndex = index
                    return true
                } else {
                    return false
                }
            })
            this.currentStatus = false
            if (prevIndex > -1) {
                this.updateCurrentItem()
            }
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileBeatsTab', {
            url: this.url,
        })
        this.loading = false
    },
    methods: {
        async updateCurrentItem() {
            if (this.beats[this.currentIndex].id === this.playerItem.id) {
                return
            }
            this.individualLoading = true
            const item = this.beatsLoad.find(
                (beatsLoad) => beatsLoad.id === this.beats[this.currentIndex].id
            )
            if (item === undefined) {
                const response = await api.profiles.getProfileBeatPackById(
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
                this.playerItem = {
                    id: beat.id,
                    coverart: beat.data_image || appConstants.defaultCoverArt,
                    title: beat.title,
                    producer_name: this.profile.display_name,
                    src: srcAudio,
                    type: beat.type,
                }
                this.$store.dispatch('profile/addPlayerBeat', this.playerItem)
                this.curBeat = { ...beat }
            } else {
                this.playerItem = { ...item }
            }
            this.individualLoading = false
        },
        prevItem() {
            for (let k = this.currentIndex - 1; k >= 0; k--) {
                if (this.beats[k].type === 'beat') {
                    this.currentIndex = k
                    break
                }
            }
        },
        nextItem() {
            for (let k = this.currentIndex + 1; k < this.beats.length; k++) {
                if (this.beats[k].type === 'beat') {
                    this.currentIndex = k
                    break
                }
            }
        },
        setStatus(status) {
            this.currentStatus = status
        },
        setCurrentItem(index) {
            if (this.currentIndex === index) {
                if (this.playerItem.type === 'pack') {
                    this.currentStatus = false
                } else {
                    this.currentStatus = !this.currentStatus
                }
            } else {
                this.currentIndex = index
            }
        },
    },
}
</script>
