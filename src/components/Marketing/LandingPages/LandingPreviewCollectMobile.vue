<template>
    <div class="landing-preview-email collect">
        <div class="landing-content mobile">
            <div class="landing-frame" :style="landingBackStyle">
                <div class="landing-container">
                    <div class="landing-header">
                        <img :src="user.banner" />
                        <div class="landing-logo">
                            <img
                                v-if="landingData.logo"
                                :src="`${mediaURL}${landingData.logo}`"
                                alt="Logo"
                            />
                            <img v-else :src="defaultLogo" alt="Logo" />
                        </div>
                    </div>
                    <div class="landing-body">
                        <b-row>
                            <b-col cols="12" class="artwork-container">
                                <img
                                    v-if="landingData.artwork"
                                    :src="`${mediaURL}${landingData.artwork}`"
                                    alt="Artwork"
                                />
                                <img v-else :src="defaultCoverArt" />
                            </b-col>
                            <b-col cols="12" class="text-content">
                                <h1 class="title">
                                    {{ landingData.headline }}
                                </h1>
                                <h3 class="price-title">
                                    {{ landingData.price | currencyFormat }}
                                </h3>
                                <div class="description">
                                    {{ landingData.body }}
                                </div>
                                <BasicButton
                                    class="btn-signup"
                                    :style="{
                                        backgroundColor: landingData.button_color,
                                        borderColor: landingData.button_color,
                                    }"
                                >
                                    Buy Now
                                </BasicButton>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="landing-footer">
                        <div class="social-share-links">
                            <a href="#">
                                <i class="fab fa-instagram-square"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-facebook-square"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter-square"></i>
                            </a>
                            <a href="#">
                                <i class="fas fa-paper-plane"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
export default {
    name: 'LandingPreviewEmail',
    props: {
        landingData: {
            type: Object,
        },
    },
    data: () => ({
        mediaURL: appConstants.mediaURL,
        defaultLogo: appConstants.emailDefaultLogo,
        defaultCoverArt: appConstants.defaultCoverArt,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
        landingBackStyle() {
            return {
                backgroundColor: this.landingData.background_color,
                backgroundImage: `url(${this.mediaURL}${this.landingData.background_image})`,
            }
        },
    },
}
</script>