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
                    <div v-for="tag in form.tags" :key="tag.text" class="tag">{{ tag.text }}</div>
                </div>
                <div class="collabs-container">
                    <div class="title">Collaborators</div>
                    <div class="collab-row" v-for="(collab, index) in form.collabs" :key="index">
                        <UserAvatar :user="collab.user" />
                        <img
                            class="avatar-badge"
                            v-if="collab.user.id == profile.id"
                            src="@/assets/img/ico/badge.svg"
                        />
                        <span class="user-name">
                            {{ collab.user.name | truncate(14) }}
                            {{ collab.user.id == profile.id ? '(you)' : '' }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="right-col">
                <div class="header">
                    <div class="left-header">
                        <div class="title-container">
                            <MiniAudioPlayer :src="form.src" />
                            <div class="title">{{ form.title }}</div>
                        </div>
                        <div class="desc">Ambient beat by {{ profile.display_name }}</div>
                    </div>
                    <div class="right-header">
                        <button class="btn btn-icon btn-download btn-round">
                            <b-icon-download />
                        </button>
                        <b-dropdown class="actions-menu" variant="icon" right no-caret>
                            <template v-slot:button-content>
                                <button class="btn btn-icon btn-round">
                                    <Icon icon="dot-menu-h " />
                                </button>
                            </template>
                        </b-dropdown>
                    </div>
                </div>
                <div class="license-body">
                    <div class="Card" v-for="(license, index) in licenses" :key="index">
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="price">{{ license.price | currencyFormat }}</div>
                                <div class="text">
                                    <h4 class="card-title">{{ license.title }}</h4>
                                    <small>{{ license.descripcion }}</small>
                                </div>
                                <basic-button
                                    size="sm"
                                    class="btn-buy"
                                    @click="handleBuyClick(license)"
                                >
                                    <img src="@/assets/img/ico/basket.svg" />
                                    Buy
                                </basic-button>
                            </div>
                        </div>
                    </div>
                    <basic-button variant="link" class="float-right text-black">Negotiate Price</basic-button>
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
                                    {{ artist.plays }} plays
                                </div>
                            </router-link>
                        </b-col>
                    </b-form-row>
                </div>
            </div>
        </div>
        <!-- <ArtPlayer /> -->
    </b-container>
</template>
<script>
import { appConstants } from '~/constants'
import { MiniAudioPlayer } from '~/components/Player'
// import ArtPlayer from '@/components/Profile/ArtPlayer'
export default {
    name: 'PublicBeatDetails',
    props: ['url', 'beatId'],
    components: {
        MiniAudioPlayer,
        // ArtPlayer,
    },
    data: () => ({
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
                          data_image,
                          profit,
                          publishing,
                      }) => ({
                          profit,
                          publishing,
                          user: {
                              id: user_id,
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
            this.$store.dispatch('profile/addCartItem', {
                ...this.beat,
                price: license.price,
                license_id: license.license_id,
            })
            this.$bus.$emit('modal.addedCart.open')
        },
    },
}
</script>
