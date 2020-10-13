<template>
    <div class="email-preview-release" :style="emailBackStyle">
        <div class="message-content mobile">
            <div class="message-frame">
                <div class="message-container video">
                    <div class="message-header">
                        <div class="message-logo">
                            <img :src="defaultLogo" alt="Logo" />
                        </div>
                        <div class="new-release">
                            New video
                        </div>
                    </div>
                    <div class="message-body">
                        <div class="video-container">
                            <youtube
                                v-if="emailData.artwork"
                                class="video-wrapper"
                                :video-id="ytVidId"
                            ></youtube>
                        </div>
                        <h1 class="message-title text-left">
                            {{ emailData.headline }}
                        </h1>
                        <div class="more-info text-left">
                            {{ emailData.body }}
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
    name: 'EmailPreviewVideoMobile',
    props: {
        emailData: {
            type: Object,
        },
    },
    data: () => ({
        defaultLogo: appConstants.emailDefaultLogo,
        footerLogo: appConstants.emailFooterLogo,
    }),
    computed: {
        ytVidId() {
            return this.$youtube.getIdFromUrl(this.emailData.artwork)
        },
        emailBackStyle() {
            return {
                backgroundColor: this.emailData.background_color,
            }
        },
    },
}
</script>
