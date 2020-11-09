<template>
    <div
        class="landing-preview-lead"
        :style="landingBackStyle"
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
                <div class="real-body">
                    <b-row>
                        <b-col
                            cols="12"
                            md="9"
                            xl="6"
                            class="text-content"
                        >
                            <h1 class="title">
                                {{ landingData.headline }}
                            </h1>
                            <div class="description">
                                {{ landingData.body }}
                            </div>
                            <b-form-group class="email-form">
                                <template v-slot:label>
                                    <span class="font-weight-bold">Email Address</span>
                                </template>
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
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'LandingPreviewLead',
    props: {
        landingData: {
            type: Object,
        },
    },
    data: () => ({
        mediaURL: appConstants.mediaURL,
        defaultLogo: appConstants.emailDefaultLogo,
    }),
    computed: {
        landingBackStyle() {
            return {
                backgroundImage: `url(${this.mediaURL}${this.landingData.background_image})`,
            }
        },
    },
}
</script>