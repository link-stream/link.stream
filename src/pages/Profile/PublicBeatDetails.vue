<template>
    <b-container class="page-beat-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="left-col">
                <div class="main-img img-contaiiner">
                    <img class="img-fluid" :src="form.coverArtBase64" />
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
                            v-if="collab.user.id == user.id"
                            src="@/assets/img/ico/badge.svg"
                        />
                        <span class="user-name">
                            {{ collab.user.name | truncate(14) }}
                            {{ collab.user.id == user.id ? '(you)' : '' }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="right-col">
                <div class="header">
                    <div class="left-header">
                        <div class="title-container">
                            <MiniAudioPlayer src="" />
                            <div class="title">
                                {{ form.title }}
                            </div>
                        </div>
                        <div class="desc">
                            Ambient beat by {{ user.display_name }}
                        </div>
                    </div>
                    <div class="right-header">
                        <button class="btn btn-icon btn-download btn-round">
                            <b-icon-download />
                        </button>
                        <b-dropdown
                            class="actions-menu"
                            variant="icon"
                            right
                            no-caret
                        >
                            <template v-slot:button-content>
                                <button class="btn btn-icon btn-round">
                                    <Icon icon="dot-menu-h " />
                                </button>
                            </template>
                            <b-dropdown-item>
                                Go to Beat
                            </b-dropdown-item>
                            <b-dropdown-item>
                                Save
                            </b-dropdown-item>
                            <b-dropdown-item>
                                Share
                            </b-dropdown-item>
                            <b-dropdown-item>
                                Free Download
                            </b-dropdown-item>
                        </b-dropdown>
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
                                    <small>
                                        {{ license.descripcion }}
                                    </small>
                                </div>
                                <basic-button size="sm" class="btn-buy">
                                    <img src="@/assets/img/ico/basket.svg" />
                                    Buy
                                </basic-button>
                            </div>
                        </div>
                    </div>
                    <basic-button variant="link" class="float-right text-black">
                        Negotiate Price
                    </basic-button>
                </div>
                <div class="more-artist">
                    <div class="section-title">
                        More from this artist
                    </div>
                    <b-form-row>
                        <b-col
                            cols="12"
                            sm="6"
                            md="4"
                            lg="3"
                            v-for="(artist, index) in moreArtists"
                            :key="index"
                        >
                            <div class="artist">
                                <div class="img-container">
                                    <img :src="artist.img" />
                                </div>
                                <h4 class="title">
                                    {{ artist.title }}
                                </h4>
                                <div class="desc">
                                    {{ artist.BPM }} BPM •
                                    {{ artist.plays }} plays
                                </div>
                            </div>
                        </b-col>
                    </b-form-row>
                </div>
            </div>
        </div>
        <ArtPlayer />
    </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { api } from '~/services'
import { appConstants } from '~/constants'
import { MiniAudioPlayer } from '~/components/Player'
import ArtPlayer from '@/components/Profile/ArtPlayer'
export default {
    name: 'PublicBeatDetails',
    props: ['id', 'beatId'],
    components: {
        MiniAudioPlayer,
        ArtPlayer,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            packs: 'me/relatedBeatPacks',
        }),
    },
    data: () => ({
        isLoading: false,
        form: {},
        beat: {},
        licenses: [],
        moreArtists: [
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Name Extra L...',
                BPM: 134,
                plays: 1326,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Vamos Pero Lento',
                BPM: 134,
                plays: 120,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Name Extra L...',
                BPM: 134,
                plays: 1326,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Vamos Pero Lento',
                BPM: 134,
                plays: 120,
            },
        ],
    }),
    async created() {
        this.isLoading = true

        const beatResponse = await api.audios.getBeat(this.beatId, this.user.id)

        if (beatResponse.status !== 'success' || !beatResponse.data.length) {
            this.$router.push({ name: 'profileBeats' })
            this.$toast.error('Beat not found.')
            return
        }

        const beat = beatResponse.data[0]
        console.log(beat)

        // await this.$store.dispatch('me/loadRelatedBeatPacks')
        await this.$store.dispatch('me/loadLicenses')
        const licenses = this.$store.getters['me/licenses']

        if (!licenses.length) {
            this.$router.push({ name: 'profileBeats' })
            this.$toast.error('Licenses not found.')
            return
        }
        const form = {
            title: beat.title,
            coverArtBase64: beat.data_image,
            tags: beat.tags
                ? beat.tags.split(', ').map(tag => ({
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
            files: {
                stems: beat.data_track_stems
                    ? {
                          name: beat.track_stems_name,
                          base64: beat.data_track_stems,
                      }
                    : {},
                tagged: beat.data_tagged_file
                    ? {
                          name: beat.tagged_file_name,
                          base64: beat.data_tagged_file,
                      }
                    : {},
                untaggedMp3: beat.data_untagged_mp3
                    ? {
                          name: beat.untagged_mp3_name,
                          base64: beat.data_untagged_mp3,
                      }
                    : {},
                untaggedWav: beat.data_untagged_wav
                    ? {
                          name: beat.untagged_wav_name,
                          base64: beat.data_untagged_wav,
                      }
                    : {},
            },
            trackPack: [],
        }

        if (Array.isArray(beat.beat_packs)) {
            beat.beat_packs.forEach(({ id_album }) => {
                const pack = this.packs.find(({ id }) => id == id_album)
                pack && form.trackPack.push(pack)
            })
        }
        this.form = form
        this.beat = beat
        this.licenses = licenses

        // Merge beat licenses into licenses
        if (Array.isArray(beat.licenses) && beat.licenses.length) {
            this.licenses = licenses.map(license => {
                const beatLicense = beat.licenses.find(
                    ({ license_id }) => license_id == license.id
                )
                beatLicense &&
                    form.selectedLicenseIds.push(beatLicense.license_id)
                return {
                    ...license,
                    price: beatLicense ? beatLicense.price : license.price,
                }
            })
        }

        this.isLoading = false
    },
}
</script>
