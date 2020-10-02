<template>
    <div class="email-preview-release" :style="emailBackStyle">
        <div class="message-content">
            <div class="phone-frame">
                <div class="message-frame">
                    <div class="message-container">
                        <div class="message-header">
                            <div class="message-logo">
                                <img src="/static/media/logo1.png" alt="Logo" />
                            </div>
                            <div class="new-release">
                                New video
                            </div>
                        </div>
                        <div class="message-body video">
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
                                <img src="@/assets/img/logo/logo-h-lg.png" />
                            </div>
                            <div class="text">
                                <p>
                                    You are receiving this email because you
                                    opted in via our website.
                                </p>
                                <p>
                                    You can
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
// import { getYtVideoThumbUrl } from '~/utils'
export default {
    name: 'EmailPreviewVideo',
    props: {
        emailData: {
            type: Object,
        },
    },
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
