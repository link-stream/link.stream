<template>
    <b-container class="page-pack-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="main-info">
                <div class="left-col">
                    <div class="img-container">
                        <img :src="pack.coverart" />
                    </div>
                </div>
                <div class="right-col">
                    <div class="title-container">
                        <MiniAudioPlayer src="" />
                        <div class="title-desc">
                            <div class="title">
                                {{ pack.title }}
                            </div>
                            <div class="sub-title">
                                Ambient Beat Pack by {{ profile.display_name }}
                            </div>
                        </div>
                    </div>
                    <div class="desc" v-if="pack.description && !readMore">
                        {{ pack.description | truncate(270) }}
                        <a
                            v-if="pack.description.length > 270"
                            href="#"
                            class="read-more"
                            @click.prevent="readMore = true"
                        >
                            Read More
                        </a>
                    </div>
                    <div class="desc" v-if="pack.description && readMore">
                        {{ pack.description }}
                        <a
                            href="#"
                            class="read-more"
                            @click.prevent="readMore = false"
                        >
                            Less
                        </a>
                    </div>
                    <div class="actions">
                        <basic-button class="btn-buy" @click="handleBuyClick()">
                            <img src="@/assets/img/ico/basket.svg" />
                            {{ pack.price | currencyFormat }} - Add to Cart
                        </basic-button>
                    </div>
                </div>
            </div>
            <div class="beat-container">
                <div class="header">
                    <div class="float-left">
                        {{ this.beats.length }} BEATS
                    </div>
                    <div class="float-right">
                        {{ Math.ceil(sumDurations / 60) }} mins
                    </div>
                </div>
                <div
                    v-for="(beat, index) in beats"
                    :key="index"
                    class="beat-info"
                >
                    <ListAudioPlayer :src="beat.src" />
                    <div class="beat-title">
                        {{ beat.title }}
                    </div>
                    <b-icon-three-dots-vertical class="btn-menu" />
                </div>
            </div>
            <div class="more-artist">
                <div class="section-title separator">
                    More Beat Packs
                </div>
                <b-form-row>
                    <b-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="3"
                        v-for="(artist, index) in moreArtists"
                        :key="index"
                    >
                        <div class="artist">
                            <div class="img-container">
                                <img :src="artist.coverart" />
                            </div>
                            <h4 class="title">
                                {{ artist.title }}
                            </h4>
                            <div class="desc">
                                {{ profile.display_name }}
                            </div>
                        </div>
                    </b-col>
                </b-form-row>
            </div>
        </div>
    </b-container>
</template>
<script>
import { api } from '~/services'
import { appConstants } from '~/constants'
import {
    MiniAudioPlayer,
    ListAudioPlayer,
} from '~/components/Player'
export default {
    name: 'PublicPackDetails',
    props: ['url', 'packId'],
    components: {
        MiniAudioPlayer,
        ListAudioPlayer,
    },
    data: () => ({
        isLoading: false,
        profile: {},
        pack: {},
        moreArtists: [],
        beats: [],
        sumDurations: 0,
        audioObj: null,
        readMore: false,
    }),
    async created() {
        this.isLoading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        this.profile = this.$store.getters['profile/profile']

        const packResponse = await api.profiles.getProfileBeatPackById(
            this.profile.id,
            this.packId,
            'pack'
        )
        if (packResponse.status !== 'success' || !packResponse.data.length) {
            this.$router.push({ name: 'profileBeats' })
            this.$toast.error('Beat pack not found.')
            return
        }
        const pack = packResponse.data[0]
        this.pack = {
            ...pack,
            coverart: pack.data_image || appConstants.defaultCoverArt,
        }
        this.beats = []
        this.sumDurations = 0
        this.audioObj = new Audio()
        this.audioObj.addEventListener('loadeddata', this.handleLoaded)
        for (const item of pack.beats) {
            const response = await api.profiles.getProfileBeatPackById(
                this.profile.id,
                item.id_audio,
                'beat'
            )
            if (response.status === 'success' && response.data.length) {
                const beat = response.data[0]
                let srcAudio = null
                if (beat.data_tagged_file) {
                    srcAudio = beat.data_tagged_file
                } else if (beat.data_untagged_mp3) {
                    srcAudio = beat.data_untagged_mp3
                } else if (beat.data_untagged_wav) {
                    srcAudio = beat.data_untagged_wav
                }
                this.beats.push({
                    ...beat,
                    src: srcAudio,
                })
                this.audioObj.src = srcAudio
                this.audioObj.load()
            }
        }
        const moreArtists = await api.profiles.getProfileMoreBeats(
            this.profile.id,
            'pack'
        )
        if (moreArtists.status == 'success') {
            this.moreArtists = moreArtists.data.map(artist => {
                return {
                    ...artist,
                    coverart: artist.data_image || appConstants.defaultCoverArt,
                    producer_name: this.profile.display_name,
                }
            })
        } else {
            this.moreArtists = []
        }

        this.isLoading = false
    },
    methods: {
        handleBuyClick() {
            this.$store.dispatch('profile/addCartItem', {
                ...this.pack,
            })
            this.$bus.$emit('modal.addedCart.open')
        },
        handleLoaded() {
            if (this.audioObj.readyState >= 2) {
                this.sumDurations += parseInt(this.audioObj.duration)
            }
        },
    },
}
</script>
