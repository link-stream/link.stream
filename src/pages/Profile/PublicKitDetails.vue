<template>
    <b-container class="page-pack-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="main-info">
                <div class="left-col">
                    <div class="img-back d-sm-none"></div>
                    <div class="img-container">
                        <img :src="kit.coverart" />
                        <MiniAudioPlayer
                            :src="kit.src"
                            :type="kit.type"
                            :id="kit.id"
                            :fromprofile="true"
                            :user_id="profile.id"
                            class="center-img d-sm-none"
                        />
                        <!-- <img src="@/assets/img/ico/play-light.svg" class="center-img d-sm-none" /> -->
                    </div>
                </div>
                <div class="right-col">
                    <div class="title-container">
                        <MiniAudioPlayer
                            :src="kit.src"
                            :type="kit.type"
                            :id="kit.id"
                            :fromprofile="true"
                            :user_id="profile.id"
                            class="d-none d-sm-block"
                        />
                        <div class="title-desc">
                            <div class="title">{{ kit.title }}</div>
                            <div class="sub-title">
                                Sound Kit from 
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
                            v-if="kit.price > 0"
                            class="btn-buy"
                            @click="handleBuyClick()"
                        >
                            <img src="@/assets/img/ico/basket.svg" />
                            {{ kit.price | currencyFormat }} - Add to cart
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
                    <div class="desc" v-if="kit.description && !readMore">
                        <div class="d-none d-sm-block">
                            {{ kit.description | truncate(270) }}
                            <a
                                v-if="kit.description.length > 270"
                                href="#"
                                class="read-more"
                                @click.prevent="readMore = true"
                            >Read More</a>
                        </div>
                        <div class="d-sm-none">
                            {{ kit.description | truncate(100) }}
                            <a
                                v-if="kit.description.length > 100"
                                href="#"
                                class="read-more"
                                @click.prevent="readMore = true"
                            >Read More</a>
                        </div>
                    </div>
                    <div class="desc" v-if="kit.description && readMore">
                        {{ kit.description }}
                        <a
                            href="#"
                            class="read-more"
                            @click.prevent="readMore = false"
                        >Less</a>
                    </div>
                    <div class="actions d-none d-sm-block">
                        <basic-button
                            v-if="kit.price > 0"
                            class="btn-buy"
                            @click="handleBuyClick()"
                        >
                            <img src="@/assets/img/ico/basket.svg" />
                            {{ kit.price | currencyFormat }} - Add to cart
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
                    <div class="float-left">{{ this.samples.length }} SAMPLES</div>
                </div>
                <div v-for="(sample, index) in samples" :key="index" class="beat-info">
                    <ListAudioPlayer
                        :src="sample.src"
                        :type="sample.type"
                        :id="sample.id"
                        :fromprofile="true"
                        :user_id="profile.id"
                    />
                    <div class="beat-title">{{ sample.title }}</div>
                </div>
            </div>
            <div class="actions d-sm-none">
                <basic-button variant="outline-black" class="btn-share" @click="handleShareClick()">
                    <font-awesome-icon :icon="['fas', 'share-alt-square']" size="lg" class="mr-2" />Share Kit
                </basic-button>
            </div>
            <div class="more-artist">
                <div class="section-title separator">More Sound Kits</div>
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
                            :to="{
                                name: 'profileKitDetails',
                                params: { kitId: artist.id },
                            }"
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
import ShareArtModal from '@/components/Modal/ShareArtModal'
import { MiniAudioPlayer, ListAudioPlayer } from '~/components/Player'
export default {
    name: 'PublicKitDetails',
    props: ['url', 'kitId'],
    components: {
        ShareArtModal,
        MiniAudioPlayer,
        ListAudioPlayer,
    },
    data: () => ({
        isLoading: false,
        profile: {},
        kit: {},
        moreArtists: [],
        samples: [],
        readMore: false,
        loading: false,
    }),
    async created() {
        this.isLoading = true
        await this.$store.dispatch('profile/getProfileKitsTab', {
            url: this.url,
            audio_id: this.kitId,
        })
        this.profile = this.$store.getters['profile/profile']

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

        const moreArtists = this.$store.getters['profile/moreElements']
        if (moreArtists.length) {
            this.moreArtists = moreArtists.map(artist => {
                return {
                    ...artist,
                    coverart: artist.data_image || appConstants.defaultCoverArt,
                    producer_name: this.profile.display_name,
                }
            })
        }
        const kit = this.$store.getters['profile/soundKits'][0]
        this.kit = {
            ...kit,
            type: 'kit',
            coverart: kit.data_image || appConstants.defaultCoverArt,
            src: kit.data_tagged_file,
        }
        this.samples = []
        for (const item of kit.kit_files_name) {
            this.samples.push({
                id: kit.id,
                title: item,
                type: 'kit',
                src: null,
            })
        }
        this.isLoading = false
        for (const item of this.samples) {
            const response = await api.profiles.getProfileKitFileByName(
                this.profile.id,
                kit.id,
                item.title
            )
            if (response.status === 'success') {
                item.src = response.data.audio
            }
        }
    },
    methods: {
        handleBuyClick() {
            this.$store.dispatch('profile/addCartItem', {
                ...this.kit,
            })
            this.$bus.$emit('modal.addedCart.open')
        },
        handleDownloadClick() {
            this.loading = true
            const downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.kit.id}/kit`
            window.open(downloadUrl, '_self')
            this.loading = false
        },
        handleShareClick() {
            this.kit.type = 'kit'
            this.$bus.$emit('modal.share.open', this.kit)
        },
        handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
    },
}
</script>
