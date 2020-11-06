<template>
    <div class="email-preview-release">
        <div class="message-content mobile">
            <div class="message-frame" :style="emailBackStyle">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'EmailPreviewReleaseMobile',
    props: {
        emailData: {
            type: Object,
        },
    },
    data: () => ({
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
