<template>
    <div class="beats-container">
        <p
            v-if="!loading && !soundKits.length"
            class="text-center my-5"
        >There are no public sound kits.</p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-form-row>
                <b-col cols="12" lg="3" md="6" v-for="(item, index) in soundKits" :key="index">
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
                <basic-button variant="outline-black" size="md" class="btn-view-more">view More</basic-button>
            </div>
        </div>
        <ShareArtModal @close="handleCloseShare" />
        <ArtPlayer
            :itemId="itemId"
            :type="type"
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
import ArtPlayer from '@/components/Profile/ArtPlayer'
import SoundKitItem from '@/components/Profile/SoundKitItem'
import ShareArtModal from '@/components/Modal/ShareArtModal'
export default {
    name: 'ProfileSoundKits',
    components: {
        SoundKitItem,
        ArtPlayer,
        ShareArtModal,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
            soundKits: 'profile/soundKits',
            startover: 'profile/startover',
            soundKitsLoad: 'profile/soundKitsLoad',
            individualLoading: 'profile/individualLoading',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: -1,
        currentStatus: false,
        curItem: {},
        itemId: '',
        type: '',
    }),
    watch: {
        startover() {
            if (this.startover) {
                this.currentIndex = 0
                this.$store.commit('profile/SET_STARTOVER', false)
            }
        },
        currentIndex() {
            this.updateCurrentItem()
        },
        soundKits() {
            const prevIndex = this.currentIndex
            this.currentIndex = 0
            this.itemId = this.soundKits[this.currentIndex].id
            this.type = 'sound_kit'
            this.currentStatus = false
            if (prevIndex > -1) {
                this.updateCurrentItem()
            }
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileKitsTab', {
            url: this.url,
        })
        this.loading = false
    },
    methods: {
        async updateCurrentItem() {
            if (this.soundKits[this.currentIndex].id === this.curItem.id) {
                return
            }
            this.itemId = this.soundKits[this.currentIndex].id
            this.type = 'kit'
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
        handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
    },
}
</script>
