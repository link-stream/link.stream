<template>
    <div
        class="landing-preview-email"
        :style="viewType === 'desktop' ? landingBackStyle : ''"
    >
        <div class="landing-content" :class="viewType">
            <b-row class="m-0 d-none d-sm-block">
                <div class="select-view-type">
                    <a
                        href="#"
                        class="view-type left"
                        :class="{ active: viewType === 'desktop' }"
                        @click.prevent="viewType = 'desktop'"
                    >
                        Desktop
                    </a>
                    <a
                        href="#"
                        class="view-type right"
                        :class="{ active: viewType === 'mobile' }"
                        @click.prevent="viewType = 'mobile'"
                    >
                        Mobile
                    </a>
                </div>
            </b-row>
            <div class="phone-frame">
                <div
                    class="landing-frame"
                    :style="viewType === 'mobile' ? landingBackStyle : ''"
                >
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
                            <b-row class="m-0">
                                <b-col
                                    cols="12"
                                    :sm="viewType === 'desktop' ? 6 : 12"
                                    class="artwork-container p-0"
                                >
                                    <img
                                        v-if="landingData.artwork"
                                        :src="
                                            `${mediaURL}${landingData.artwork}`
                                        "
                                        alt="Artwork"
                                    />
                                    <img v-else :src="defaultCoverArt" />
                                </b-col>
                                <b-col
                                    cols="12"
                                    :sm="viewType === 'desktop' ? 6 : 12"
                                    class="text-content"
                                    :class="{
                                        'desktop-mobile': viewType === 'mobile',
                                    }"
                                >
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
    </div>
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'LandingPreviewEmail',
    props: {
        landingData: {
            type: Object,
        },
    },
    data: () => ({
        viewType: 'desktop',
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
