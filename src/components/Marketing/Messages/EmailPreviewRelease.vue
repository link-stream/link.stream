<template>
    <div
        class="email-preview-release"
        :style="viewType === 'desktop' ? emailBackStyle : ''"
    >
        <div class="message-content" :class="viewType">
            <b-row class="d-none d-sm-block">
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
                    class="message-frame"
                    :style="viewType === 'mobile' ? emailBackStyle : ''"
                >
                    <div class="message-container">
                        <div class="message-header">
                            <div class="message-logo">
                                <img
                                    v-if="emailData.logo"
                                    :src="`${mediaURL}${emailData.logo}`"
                                    alt="Logo"
                                />
                                <img v-else :src="defaultLogo" alt="Logo" />
                            </div>
                            <div class="new-release">
                                New release
                            </div>
                        </div>
                        <div class="message-body">
                            <div class="artwork-container">
                                <img
                                    :src="`${mediaURL}${emailData.artwork}`"
                                    alt="Artwork"
                                />
                            </div>
                            <h1 class="message-title">
                                {{ emailData.headline }}
                            </h1>
                            <div class="more-info">
                                {{ emailData.body }}
                            </div>
                            <div class="btn-listen-container">
                                <a
                                    class="btn-listen"
                                    :style="{
                                        backgroundColor: emailData.button_color,
                                    }"
                                    :href="emailData.promote_id"
                                    target="_blank"
                                >
                                    Listen Now
                                </a>
                            </div>
                        </div>
                        <div class="message-footer">
                            <div class="logo-container">
                                <img :src="footerLogo" />
                            </div>
                            <div class="text">
                                <p>
                                    You are receiving this email because you
                                    opted in via our website. You can
                                    <a href="#"> update your preferences </a>
                                    for this artist or
                                    <a hre="#"> unsubscribe</a>
                                </p>
                            </div>
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
    name: 'EmailPreviewRelease',
    props: {
        emailData: {
            type: Object,
        },
    },
    data: () => ({
        viewType: 'desktop',
        mediaURL: appConstants.mediaURL,
        defaultLogo: appConstants.emailDefaultLogo,
        footerLogo: appConstants.emailFooterLogo,
    }),
    computed: {
        emailBackStyle() {
            return {
                backgroundColor: this.emailData.background_color,
                backgroundImage: `url(${this.mediaURL}${this.emailData.background_image})`,
            }
        },
    },
}
</script>
