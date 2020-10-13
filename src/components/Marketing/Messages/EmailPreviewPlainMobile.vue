<template>
    <div class="email-preview-release">
        <div class="message-content mobile">
            <div class="message-frame" :style="emailBackStyle">
                <div class="message-container plain">
                    <div class="message-header">
                        <div class="message-logo">
                            <img :src="defaultLogo" alt="Logo" />
                        </div>
                    </div>
                    <div class="message-body">
                        <div
                            class="more-info"
                            v-html="emailData.body"
                            :style="linkStyle"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'EmailPreviewPlainMobile',
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
