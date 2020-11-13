<template>
    <div class="beats-container">
        <p v-if="!loading && !beats.length" class="text-center my-5">
            There are no public beats or beat packs.
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
                    View More
                </basic-button>
            </div>
        </div>
        <BuyLicenseModal @close="handleCloseBuy" />
        <ShareArtModal @close="handleCloseShare" />
        <ArtPlayer
            :itemId="itemId"
            :type="type"
            :isFirst="currentIndex === 0"
            :isLast="currentIndex === beats.length - 1"
            :status="currentStatus"
            :loading="individualLoading"
            :user_id="user_id"
            @prev="prevItem"
            @next="nextItem"
            @setStatus="setStatus"
        />
    </div>
</template>
<script>
import { api } from '~/services'
import { mapGetters } from 'vuex'
import ArtItem from '@/components/Profile/ArtItem'
import ArtPlayer from '@/components/Profile/ArtPlayer'
import ShareArtModal from '@/components/Modal/ShareArtModal'
import BuyLicenseModal from '@/components/Modal/BuyLicenseModal'
export default {
    name: 'ProfileBeats',
    components: {
        ArtItem,
        ArtPlayer,
        BuyLicenseModal,
        ShareArtModal,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            beats: 'profile/beats',
            startover: 'profile/startover',
            individualLoading: 'profile/individualLoading',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: -1,
        currentStatus: false,
        playerItem: {},
        curBeat: {},
        itemId: '',
        type: '',
        user_id: '',
    }),
    watch: {
        startover() {
            if (this.startover) {
                this.currentIndex = this.beats.findIndex(
                    beats => beats.type === 'beat'
                )
                this.$store.commit('profile/SET_STARTOVER', false)
            }
        },
        currentIndex() {
            this.updateCurrentItem()
        },
        beats() {
            const that = this
            const prevIndex = that.currentIndex
            this.beats.some((beat, index) => {
                if (beat.type === 'beat') {
                    that.currentIndex = index
                    this.itemId = beat.id
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
        const response = await api.profiles.getProfileMain(this.url)
        if (response.status === 'false') {
            this.$router.push({
                name: 'home',
            })
        } else {
            await this.$store.dispatch('profile/getProfileBeatsTab', {
                url: this.url,
            })
            this.user_id = this.$store.getters['profile/profile'].id
        }
        this.loading = false
    },
    methods: {
        async updateCurrentItem() {
            if (this.beats[this.currentIndex].id === this.playerItem.id) {
                return
            }
            this.itemId = this.beats[this.currentIndex].id
            this.type = this.beats[this.currentIndex].type
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
        handleCloseBuy() {
            this.$bus.$emit('modal.buyLicense.close')
        },
        handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
    },
}
</script>
