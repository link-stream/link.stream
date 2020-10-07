<template>
    <div
        class="email-preview-release"
        :style="viewType === 'desktop' ? emailBackStyle : ''"
    >
        <div class="message-content" :class="viewType">
            <b-row>
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
                                <img :src="`${mediaURL}${emailData.logo}`" alt="Logo" />
                            </div>
                            <div class="new-release">
                                New release
                            </div>
                        </div>
                        <div class="message-body">
                            <div class="artwork-container">
                                <img :src="`${mediaURL}${emailData.artwork}`" alt="Artwork" />
                            </div>
                            <h1 class="message-title">
                                {{ emailData.headline }}
                            </h1>
                            <div class="more-info">
                                {{ emailData.body }}
                            </div>
                            <basic-button
                                class="btn-listen"
                                :style="{
                                    backgroundColor: emailData.button_color,
                                }"
                            >
                                Listen Now
                            </basic-button>
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
    }),
    computed: {
        emailBackStyle() {
            return {
                backgroundColor: this.emailData.background_color,
                backgroundImage: `url(${this.mediaURL}${this.emailData.background_image})`,
            }
        },
    }
}
</script>
