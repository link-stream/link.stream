<template>
    <div class="landing-preview-email">
        <div class="landing-content mobile">
            <div class="landing-frame" :style="landingBackStyle">
                <div class="landing-container">
                    <div class="landing-header">
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
                                <div class="description">
                                    {{ landingData.body }}
                                </div>
                                <b-form-group label="Name">
                                    <b-form-input />
                                </b-form-group>
                                <b-form-group label="Email">
                                    <b-form-input />
                                </b-form-group>
                                <BasicButton
                                    class="btn-signup"
                                    :style="{
                                        backgroundColor: landingData.button_color,
                                        borderColor: landingData.button_color,
                                    }"
                                >
                                    Sign Up
                                </BasicButton>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'LandingPreviewEmailMobile',
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
        landingBackStyle() {
            return {
                backgroundColor: this.landingData.background_color,
                backgroundImage: `url(${this.mediaURL}${this.landingData.background_image})`,
            }
        },
    },
}
</script>