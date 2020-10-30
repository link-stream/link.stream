<template>
    <b-container class="page-beat-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="left-col">
                <div class="main-img img-container">
                    <img :src="form.coverart" />
                </div>
                <div class="tags-container">
                    <div class="title">Beat Tags</div>
                    <div v-for="tag in form.tags" :key="tag.text" class="tag">
                        {{ tag.text }}
                    </div>
                </div>
                <div class="collabs-container">
                    <div class="title">Collaborators</div>
                    <div
                        class="collab-row"
                        v-for="(collab, index) in form.collabs"
                        :key="index"
                    >
                        <UserAvatar :user="collab.user" />
                        <img
                            class="avatar-badge"
                            v-if="collab.user.id == profile.id"
                            src="@/assets/img/ico/badge.svg"
                        />

                        <router-link
                            class="artist text-black"
                            :to="{
                                name: 'publicProfile',
                                params: { url: collab.user.url },
                            }"
                        >
                            <span class="user-name" :id="`user-name-${index}`">
                                {{ collab.user.display_name | truncate(14) }}
                            </span>
                            <b-tooltip :target="`user-name-${index}`">{{
                                collab.user.display_name
                            }}</b-tooltip>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="right-col">
                <div class="header">
                    <div class="left-header">
                        <div class="title-container">
                            <MiniAudioPlayer
                                :src="form.src"
                                :type="form.type"
                                :id="form.id"
                                :fromprofile="true"
                                :user_id="profile.id"
                            />
                            <div class="title">{{ form.title }}</div>
                        </div>
                        <div class="desc">
                            Ambient beat by
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
                    <div class="right-header">
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
                <div class="license-body">
                    <div
                        class="Card"
                        v-for="(license, index) in licenses"
                        :key="index"
                    >
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="price">
                                    {{ license.price | currencyFormat }}
                                </div>
                                <div class="text">
                                    <h4 class="card-title">
                                        {{ license.title }}
                                    </h4>
                                    <small>{{ license.descripcion }}</small>
                                </div>
                                <basic-button
                                    v-if="license.price > 0"
                                    size="sm"
                                    class="btn-buy px-md-1 px-lg-3"
                                    @click="handleBuyClick(license)"
                                >
                                    <img src="@/assets/img/ico/basket.svg" />
                                    Add to cart
                                </basic-button>
                                <basic-button
                                    v-else
                                    size="sm"
                                    class="btn-download"
                                    @click="
                                        handleDownloadClick(license.license_id)
                                    "
                                >
                                    <div v-if="!loadingState">
                                        <img
                                            src="@/assets/img/ico/download-wh.svg"
                                        />
                                        Download
                                    </div>
                                    <div v-else>
                                        <b-spinner
                                            small
                                            type="grow"
                                        ></b-spinner>
                                        <b-spinner
                                            small
                                            type="grow"
                                        ></b-spinner>
                                        <b-spinner
                                            small
                                            type="grow"
                                        ></b-spinner>
                                    </div>
                                </basic-button>
                            </div>
                        </div>
                    </div>
                    <basic-button
                        variant="link"
                        class="float-right text-black"
                        v-show="false"
                        >Negotiate Price</basic-button
                    >
                </div>
                <div class="more-artist">
                    <div class="section-title">More from this artist</div>
                    <b-form-row>
                        <b-col
                            cols="12"
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
                                <div class="desc">
                                    {{ artist.bpm }} BPM •
                                    {{ artist.play }} plays
                                </div>
                            </router-link>
                        </b-col>
                    </b-form-row>
                </div>
            </div>
            <ShareArtModal @close="handleCloseShare" />
        </div>
    </b-container>
</template>
<script>
import moment from 'moment'
import Cookies from 'js-cookie'
import { api } from '~/services'
import { mapGetters } from 'vuex'
import { appConstants } from '~/constants'
import { MiniAudioPlayer } from '~/components/Player'
import ShareArtModal from '@/components/Modal/ShareArtModal'
export default {
    name: 'PublicBeatDetails',
    props: ['url', 'beatId'],
    components: {
        ShareArtModal,
        MiniAudioPlayer,
    },
    data: () => ({
        loadingState: false,
        isLoading: false,
        profile: {},
        form: {},
        beat: {},
        licenses: [],
        moreArtists: [],
    }),
    async created() {
        this.isLoading = true
        await this.$store.dispatch('profile/getProfileBeatsTab', {
            url: this.url,
            audio_id: this.beatId,
            type: 'beat',
        })

        this.profile = this.$store.getters['profile/profile']
        const licenses = this.$store.getters['profile/licenses']
        const beatItem = this.$store.getters['profile/beats'][0]
        const moreArtists = this.$store.getters['profile/moreElements']

        if (!beatItem) {
            this.$router.push({
                name: 'home',
            })
            return
        }

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
            await api.users.insertVisitor({
                user_id: this.profile.id,
                session_id: encryptSessionId,
                agent: window.navigator.userAgent,
                url: window.location.href,
                utm_source: utm ? utm : '',
                ref_id: ref_id ? ref_id : '',
            })
        }

        if (moreArtists.length) {
            this.moreArtists = moreArtists.map((artist) => {
                return {
                    ...artist,
                    coverart: artist.data_image || appConstants.defaultCoverArt,
                    plays: 0,
                }
            })
        }

        const beat = beatItem
        const form = {
            id: beat.id,
            type: beat.type,
            title: beat.title,
            coverart: beat.data_image || appConstants.defaultCoverArt,
            tags: beat.tags
                ? beat.tags.split(', ').map((tag) => ({
                      text: tag,
                  }))
                : [],
            selectedLicenseIds: [],
            collabs: Array.isArray(beat.collaborators)
                ? beat.collaborators.map(
                      ({
                          user_id,
                          user_name,
                          display_name,
                          data_image,
                          profit,
                          url,
                          publishing,
                      }) => ({
                          profit,
                          publishing,
                          user: {
                              id: user_id,
                              url: url,
                              display_name: display_name,
                              name: user_name,
                              photo: data_image,
                          },
                      })
                  )
                : [],
            src: '',
        }
        if (beat.data_tagged_file) {
            form.src = beat.data_tagged_file
        } else if (beat.data_untagged_mp3) {
            form.src = beat.data_untagged_mp3
        } else if (beat.data_untagged_wav) {
            form.src = beat.data_untagged_wav
        }
        this.form = form
        this.beat = {
            ...beat,
            coverart: beat.data_image || appConstants.defaultCoverArt,
        }

        // Merge beat licenses into licenses
        if (Array.isArray(beat.licenses) && beat.licenses.length) {
            this.licenses = beat.licenses.map((license) => {
                const findLicense = licenses.find(
                    ({ id }) => id == license.license_id
                )
                return {
                    ...license,
                    title: findLicense.title,
                    descripcion: findLicense.descripcion,
                }
            })
        }

        this.isLoading = false
    },
    methods: {
        handleBuyClick(license) {
            var listItems = []
            listItems =
                Cookies.getJSON(appConstants.cookies.cartItem.name) ===
                undefined
                    ? []
                    : Cookies.getJSON(appConstants.cookies.cartItem.name)

            var cartItem = {
                type: this.beat.type,
                price: license.price,
                id: this.beat.id,
                license_id: license.license_id,
                user_id: this.beat.user_id,
            }

            var temp_id = listItems.find((aux) => aux.id === cartItem.id)
            var temp_license = listItems.find(
                (aux) => aux.license_id === cartItem.license_id
            )
            if (temp_id === undefined || temp_license === undefined) {
                listItems.push(cartItem)
                Cookies.set(appConstants.cookies.cartItem.name, listItems)
                this.$bus.$emit('modal.addedCart.open')
            } else this.$toast.info('The element is added')

            /*this.$store.dispatch('profile/addCartItem', {
                ...this.beat,
                price: license.price,
                license_id: license.license_id,
            })
            this.$bus.$emit('modal.addedCart.open')*/
        },
        handleDownloadClick(license_id) {
            this.loadingState = true
            const downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.beat.id}/${this.beat.type}/${license_id}`
            window.open(downloadUrl, '_self')
            this.loadingState = false
        },
        handleShareClick() {
            this.$bus.$emit('modal.share.open', this.beat)
        },
        handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
    },
}
</script>
