<template>
    <div class="beats-container">
        <p v-if="!loading && !soundKits.length" class="text-center my-5">
            There are no public sound kits.
        </p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-form-row>
                <b-col
                    cols="12"
                    lg="3"
                    md="6"
                    v-for="(item, index) in soundKits"
                    :key="index"
                >
                    <SoundKitItem
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
                <basic-button
                    variant="outline-black"
                    size="md"
                    class="btn-view-more"
                >
                    view More
                </basic-button>
            </div>
        </div>
        <ArtPlayer
            :playerItem="curItem"
            :isFirst="currentIndex === 0"
            :isLast="currentIndex === soundKits.length - 1"
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
import SoundKitItem from '@/components/Profile/SoundKitItem'
import ArtPlayer from '@/components/Profile/ArtPlayer'
export default {
    name: 'ProfileSoundKits',
    components: {
        SoundKitItem,
        ArtPlayer,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            soundKits: 'profile/soundKits',
            profile: 'profile/profile',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: -1,
        currentStatus: false,
        curItem: {},
        individualLoading: false,
    }),
    watch: {
        currentIndex() {
            this.updateCurrentItem()
        },
        soundKits() {
            this.currentIndex = 0
            this.currentStatus = false
            this.updateCurrentItem()
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        await this.$store.dispatch('profile/getProfileKits')
        await this.$store.dispatch('profile/getProfileGenres', 'kits')
        this.loading = false
    },
    methods: {
        async updateCurrentItem() {
            if (this.soundKits[this.currentIndex].id === this.curItem.id) {
                return
            }
            this.individualLoading = true
            const response = await api.profiles.getProfileKitById(
                this.profile.id,
                this.soundKits[this.currentIndex].id
            )
            if (response.status !== 'success' || !response.data.length) {
                return {}
            }
            const soundKit = response.data[0]
            this.curItem = {
                id: soundKit.id,
                coverart: soundKit.data_image || appConstants.defaultCoverArt,
                title: soundKit.title,
                producer_name: this.profile.display_name,
                src: soundKit.data_tagged_file,
                type: 'kit',
            }
            this.individualLoading = false
        },
        prevItem() {
            this.currentIndex =
                this.currentIndex > 0 ? this.currentIndex - 1 : 0
        },
        nextItem() {
            this.currentIndex =
                this.currentIndex < this.soundKits.length - 1
                    ? this.currentIndex + 1
                    : this.soundKits.length - 1
        },
        setStatus(status) {
            this.currentStatus = status
        },
        setCurrentItem(index) {
            if (this.currentIndex === index) {
                this.currentStatus = !this.currentStatus
            } else {
                this.currentIndex = index
            }
        },
    },
}
</script>
