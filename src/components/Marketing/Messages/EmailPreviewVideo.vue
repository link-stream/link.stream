<template>
    <div
        class="email-preview-release"
        :style="viewType === 'desktop' ? emailBackStyle: ''"
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
                        <div class="message-footer">
                            <div class="logo-container">
                                <img :src="footerLogo" alt="Logo" />
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
    name: 'EmailPreviewVideo',
    props: {
        emailData: {
            type: Object,
        },
    },
    data: () => ({
        viewType: 'desktop',
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
