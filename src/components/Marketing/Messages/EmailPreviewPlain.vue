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
                    <div class="message-container plain">
                        <div class="message-header">
                            <div class="message-logo">
                                <img
                                    v-if="emailData.logo"
                                    :src="`${mediaURL}${emailData.logo}`"
                                    alt="Logo"
                                />
                                <img v-else :src="defaultLogo" alt="Logo" />
                            </div>
                        </div>
                        <div class="message-body">
                            <div
                                class="more-info"
                                v-html="emailData.body"
                                :style="linkStyle"
                            />
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
    name: 'EmailPreviewPlain',
    props: {
        emailData: {
            type: Object,
        },
    },
    data: () => ({
        viewType: 'desktop',
        defaultLogo: appConstants.emailDefaultLogo,
    }),
    computed: {
        emailBackStyle() {
            return {
                backgroundColor: this.emailData.background_color,
            }
        },
        linkStyle() {
            return {
                '--user-link-color': this.emailData.button_color,
            }
        },
    },
}
</script>
<style>
.message-container.plain .message-body .more-info a {
    color: var(--user-link-color);
}
</style>
