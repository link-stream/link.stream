<template>
    <b-container class="page-pack-details">
        <LoadingSpinner class="page-loader" v-if="isLoading" />
        <div v-else class="page-body">
            <div class="main-info">
                <div class="left-col">
                    <div class="img-container">
                        <img :src="kit.coverart" />
                    </div>
                </div>
                <div class="right-col">
                    <div class="title-container">
                        <MiniAudioPlayer :src="kit.src" />
                        <div class="title-desc">
                            <div class="title">
                                {{ kit.title }}
                            </div>
                            <div class="sub-title">
                                Sound Kit from {{ profile.display_name }}
                            </div>
                        </div>
                    </div>
                    <div class="actions d-sm-none">
                        <basic-button class="btn-buy" @click="handleBuyClick()">
                            {{ kit.price | currencyFormat }} - Buy Kit
                        </basic-button>
                    </div>
                    <div class="desc" v-if="kit.description && !readMore">
                        <div class="d-none d-sm-block">
                            {{ kit.description | truncate(270) }}
                            <a
                                v-if="kit.description.length > 270"
                                href="#"
                                class="read-more"
                                @click.prevent="readMore = true"
                            >
                                Read More
                            </a>
                        </div>
                        <div class="d-sm-none">
                            {{ kit.description | truncate(100) }}
                            <a
                                v-if="kit.description.length > 100"
                                href="#"
                                class="read-more"
                                @click.prevent="readMore = true"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                    <div class="desc" v-if="kit.description && readMore">
                        {{ kit.description }}
                        <a
                            href="#"
                            class="read-more"
                            @click.prevent="readMore = false"
                        >
                            Less
                        </a>
                    </div>
                    <div class="actions d-none d-sm-block">
                        <basic-button class="btn-buy" @click="handleBuyClick()">
                            {{ kit.price | currencyFormat }} - Buy Kit
                        </basic-button>
                        <basic-button variant="outline-black" class="btn-share" @click="handleShareClick()">
                            <font-awesome-icon
                                :icon="['fas', 'share-alt-square']"
                                size="lg"
                                class="mr-2"
                            />
                            Share
                        </basic-button>
                    </div>
                </div>
            </div>
            <div class="beat-container">
                <div class="header">
                    <div class="float-left">
                        {{ this.samples.length }} SAMPLES
                    </div>
                </div>
                <div
                    v-for="(sample, index) in samples"
                    :key="index"
                    class="beat-info"
                >
                    <ListAudioPlayer :src="sample.src" />
                    <div class="beat-title">
                        {{ sample.title }}
                    </div>
                    <b-icon-three-dots-vertical class="btn-menu" />
                </div>
                <basic-button variant="outline-light" size="sm" class="btn-show-more">
                    Load More Samples
                </basic-button>
            </div>
            <div class="actions d-sm-none">
                <basic-button variant="outline-black" class="btn-share" @click="handleShareClick()">
                    <font-awesome-icon
                        :icon="['fas', 'share-alt-square']"
                        size="lg"
                        class="mr-2"
                    />
                    Share
                </basic-button>
            </div>
            <div class="more-artist">
                <div class="section-title separator">
                    More Sound Kits
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
    name: 'PublicKitDetails',
    props: ['url', 'kitId'],
    components: {
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
    }),
    async created() {
        this.isLoading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        this.profile = this.$store.getters['profile/profile']

        const kitResponse = await api.profiles.getProfileKitById(
            this.profile.id,
            this.kitId
        )
        if (kitResponse.status !== 'success' || !kitResponse.data.length) {
            this.$router.push({ name: 'profileSoundKits' })
            this.$toast.error('Sound kit not found.')
            return
        }
        const kit = kitResponse.data[0]
        this.kit = {
            ...kit,
            coverart: kit.data_image || appConstants.defaultCoverArt,
            src: kit.data_tagged_file,
        }
        this.samples = []
        for (const item of kit.kit_files_name) {
            const response = await api.profiles.getProfileKitFileByName(
                this.profile.id,
                kit.id,
                item
            )
            if (response.status === 'success') {
                this.samples.push({
                    title: item,
                    src: response.data.audio,
                })
            }
        }
        const moreArtists = await api.profiles.getProfileMoreKits(this.profile.id)
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
                ...this.kit,
            })
            this.$bus.$emit('modal.addedCart.open')
        },
        handleShareClick() {},
    },
}
</script>
