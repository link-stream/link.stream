<template>
    <b-container class="page-pack-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="main-info">
                <div class="left-col">
                    <div class="img-back d-sm-none"></div>
                    <div class="img-container">
                        <img :src="pack.coverart" />
                    </div>
                </div>
                <div class="right-col">
                    <div class="title-container">
                        <div class="title-desc ml-0">
                            <div class="title">{{ pack.title }}</div>
                            <div class="sub-title">
                                Ambient Beat Pack by
                                <router-link                                    
                                    :to="{
                                        name: 'publicProfile',
                                        params: { url: profile.url },
                                    }"
                                >
                                    {{ profile.display_name }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="actions d-sm-none">
                        <basic-button
                            v-if="pack.price > 0"
                            class="btn-buy"
                            @click="handleBuyClick()"
                        >
                            <img src="@/assets/img/ico/basket.svg" />
                            {{ pack.price | currencyFormat }} - Add to cart
                        </basic-button>
                        <spinner-button
                            v-else
                            class="btn-buy"
                            :loading="loading"
                            @click="handleDownloadClick"
                        >
                            <img src="@/assets/img/ico/download-wh.svg" />
                            Download
                        </spinner-button>
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
                    <div class="actions d-none d-sm-block">
                        <basic-button
                            v-if="pack.price > 0"
                            class="btn-buy"
                            @click="handleBuyClick()"
                        >
                            <img src="@/assets/img/ico/basket.svg" />
                            {{ pack.price | currencyFormat }} - Add to cart
                        </basic-button>

                        <spinner-button
                            v-else
                            class="btn-buy"
                            :loading="loading"
                            @click="handleDownloadClick"
                        >
                            <img src="@/assets/img/ico/download-wh.svg" />
                            Download
                        </spinner-button>


                        <!--   -->
                        <basic-button
                            variant="outline-black"
                            class="btn-share"
                            @click="handleShareClick()"
                        >
                            <font-awesome-icon
                                :icon="['fas', 'share-alt-square']"
                                size="lg"
                                class="mr-2"
                            />Share
                        </basic-button>
                    </div>
                </div>
            </div>
            <div class="beat-container">
                <div class="header">
                    <div class="float-left">{{ this.beats.length }} BEATS</div>
                    <div class="float-right">{{ Math.ceil(sumDurations / 60) }} mins</div>
                </div>
                <div v-for="(beat, index) in beats" :key="index" class="beat-info">
                    <ListAudioPlayer
                        :type="beat.type"
                        :id="beat.id"
                        :fromprofile="true"
                        :user_id="profile.id"
                    />
                    <div class="beat-title">{{ beat.title }}</div>
                    <b-button
                        class="btn-menu-xs"
                        variant="link"
                        :to="{
                            name: 'profileBeatDetails',
                            params: {
                                beatId: beat.id,
                            },
                        }"
                        target="_blank"
                    >
                        <b-icon-box-arrow-in-right :id="`goto-button-${beat.id}`" font-scale="0.9" />
                    </b-button>
                    <b-tooltip :target="`goto-button-${beat.id}`" triggers="hover">Go to Beat</b-tooltip>
                </div>
            </div>
            <div class="actions d-xl-none">
                <basic-button variant="outline-black" class="btn-share" @click="handleShareClick()">
                    <font-awesome-icon :icon="['fas', 'share-alt-square']" size="lg" class="mr-2" />Share
                </basic-button>
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
            <ShareArtModal @close="handleCloseShare" />
        </div>
    </b-container>
</template>
<script>
import moment from 'moment'
import Cookies from 'js-cookie'
import { api } from '~/services'
import { appConstants } from '~/constants'
import { ListAudioPlayer } from '~/components/Player'
import ShareArtModal from '@/components/Modal/ShareArtModal'
export default {
    name: 'PublicPackDetails',
    props: ['url', 'packId'],
    components: {
        ShareArtModal,
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
        loading: false,
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

        //Visitor Info        
        if (!Cookies.getJSON('session_id')) {
            const response = await api.users.getIpAddress()
            const visitorIp = response.visitor_ip.split('.').join('')
            const sessionId = `${visitorIp}${moment().format('YYYYMMDDHHmmss')}`
            const sha1 = require('sha1')
            const encryptSessionId = sha1(sessionId)
            Cookies.set('session_id', encryptSessionId)
            const utm = Cookies.getJSON('params_url.utm_source')
            const ref_id = Cookies.getJSON('params_url.ref_id')
            const visitorResponse = await api.users.insertVisitor({
                user_id: this.profile.id,
                session_id: encryptSessionId,
                agent: window.navigator.userAgent,
                url: window.location.href,
                utm_source: utm ? utm : '',
                ref_id: ref_id ? ref_id : '',
            })
        }  

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
        this.beats = []
        for (const item of pack.beats) {
            this.beats.push({
                id: item.id_audio,
                type: 'beat',
                title: item.title,
                src: '',
                profileId: this.profile.id,
            })
        }
    },
    methods: {
        handleBuyClick() {
            this.$store.dispatch('profile/addCartItem', {
                ...this.pack,
            })
            this.$bus.$emit('modal.addedCart.open')
        },
        handleDownloadClick() {
            this.loading = true
            const downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.pack.id}/pack`
            window.open(downloadUrl, '_self')
            this.loading = false
        },
        handleShareClick() {
            this.$bus.$emit('modal.share.open', this.pack)
        },
        handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
        handleLoaded() {
            if (this.audioObj.readyState >= 2) {
                this.sumDurations += parseInt(this.audioObj.duration)
            }
        },
    },
}
</script>
