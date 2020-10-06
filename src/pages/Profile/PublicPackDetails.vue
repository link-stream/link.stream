<template>
    <b-container class="page-pack-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="main-info">
                <div class="left-col">
                    <div class="img-back d-sm-none"></div>
                    <div class="img-container">
                        <img :src="pack.coverart" />
                        <img src="@/assets/img/ico/play-light.svg" class="center-img d-sm-none" />
                    </div>
                </div>
                <div class="right-col">
                    <div class="title-container">
                        <MiniAudioPlayer src class="d-none d-sm-block" />
                        <div class="title-desc">
                            <div class="title">{{ pack.title }}</div>
                            <div class="sub-title">
                                Ambient Beat Pack by
                                {{ profile.display_name }}
                            </div>
                        </div>
                    </div>
                    <div class="desc" v-if="pack.description && !readMore">
                        <div class="d-none d-sm-block">
                            {{ pack.description | truncate(270) }}
                            <a
                                v-if="pack.description.length > 270"
                                href="#"
                                class="read-more"
                                @click.prevent="readMore = true"
                            >Read More</a>
                        </div>
                        <div class="d-sm-none">
                            {{ pack.description | truncate(100) }}
                            <a
                                v-if="pack.description.length > 100"
                                href="#"
                                class="read-more"
                                @click.prevent="readMore = true"
                            >Read More</a>
                        </div>
                    </div>
                    <div class="desc" v-if="pack.description && readMore">
                        {{ pack.description }}
                        <a
                            href="#"
                            class="read-more"
                            @click.prevent="readMore = false"
                        >Less</a>
                    </div>
                    <div class="actions">
                        <basic-button class="btn-buy" @click="handleBuyClick()">
                            <img src="@/assets/img/ico/basket.svg" />
                            {{ pack.price | currencyFormat }} - Add to Cart
                        </basic-button>
                    </div>
                </div>
            </div>
            <div class="beat-container" v-if="!isBeatLoading">
                <div class="header">
                    <div class="float-left">{{ this.beats.length }} BEATS</div>
                    <div class="float-right">{{ Math.ceil(sumDurations / 60) }} mins</div>
                </div>
                <div v-for="(beat, index) in beats" :key="index" class="beat-info">
                    <ListAudioPlayer :src="beat.src" />
                    <div class="beat-title">{{ beat.title }}</div>
                    <b-icon-three-dots-vertical class="btn-menu" />
                </div>
            </div>
            <div class="more-artist">
                <div class="section-title separator">More Beat Packs</div>
                <b-form-row>
                    <b-col
                        cols="6"
                        sm="6"
                        md="6"
                        lg="3"
                        v-for="(artist, index) in moreArtists"
                        :key="index"
                    >
                        <router-link
                            class="artist text-black"
                            :to="
                                artist.type === 'beat'
                                    ? {
                                          name: 'profileBeatDetails',
                                          params: { beatId: artist.id },
                                      }
                                    : {
                                          name: 'profilePackDetails',
                                          params: { packId: artist.id },
                                      }
                            "
                            target="_blank"
                        >
                            <div class="img-container">
                                <img :src="artist.coverart" />
                            </div>
                            <h4 class="title">{{ artist.title }}</h4>
                            <div class="desc">{{ profile.display_name }}</div>
                        </router-link>
                    </b-col>
                </b-form-row>
            </div>
        </div>
    </b-container>
</template>
<script>
import { api } from '~/services'
import { appConstants } from '~/constants'
import { MiniAudioPlayer, ListAudioPlayer } from '~/components/Player'
export default {
    name: 'PublicPackDetails',
    props: ['url', 'packId'],
    components: {
        MiniAudioPlayer,
        ListAudioPlayer,
    },
    data: () => ({
        isLoading: false,
        isBeatLoading: false,
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

        await this.$store.dispatch('profile/getProfileBeatsTab', {
            url: this.url,
            audio_id: this.packId,
            type: 'pack',
        })

        this.profile = this.$store.getters['profile/profile']
        const moreArtists = this.$store.getters['profile/moreElements']
        const pack = this.$store.getters['profile/beats'][0]

        this.pack = {
            ...pack,
            coverart: pack.data_image || appConstants.defaultCoverArt,
        }

        if (moreArtists.length) {
            this.moreArtists = moreArtists.map(artist => {
                return {
                    ...artist,
                    coverart: artist.data_image || appConstants.defaultCoverArt,
                    producer_name: this.profile.display_name,
                }
            })
        }
        this.isLoading = false

        this.isBeatLoading = true
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
        this.isBeatLoading = false
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
