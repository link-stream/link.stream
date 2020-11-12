<template>
    <b-container fluid class="customize-message">
        <div class="page-header">
            <a href="#" class="btn-back" @click.prevent="back">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <h4 class="title">Customize</h4>
            <b-button
                pill
                class="btn-send-test"
                size="md"
                @click="handleTestClick"
            >
                Send Test
            </b-button>
        </div>
        <div class="page-body">
            <div class="left-col">
                <EmailPreviewVideo :email-data="form" />
            </div>
            <div class="right-col">
                <div class="customize-panel">
                    <h1 class="title">
                        Customize your email
                    </h1>
                    <b-form-group label="Name this message">
                        <b-form-input
                            v-model="form.campaing_name"
                            required
                            placeholder="Email Name"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Paste Video URL">
                        <b-form-input
                            v-model="form.artwork"
                            required
                            placeholder="Video URL"
                        >
                        </b-form-input>
                    </b-form-group>
                    <small>
                        Your video preview image will link to this URL. Preview
                        images are generated automatically for
                        <a href="https://www.youtube.com/" target="_blank">
                            YouTube
                        </a>
                        and
                        <a href="https://vimeo.com/" target="_blank">Vimeo</a>
                        URLs.
                    </small>
                    <b-form-group label="Headline">
                        <b-form-input
                            v-model="form.headline"
                            required
                            placeholder="Headline"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Body">
                        <b-form-textarea
                            v-model="form.body"
                            placeholder="Please enter message content"
                            rows="3"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-row>
                        <b-col>
                            <div ref="backColorPicker">
                                <b-form-group
                                    label="Background Color"
                                    class="color-picker-container right-align"
                                >
                                    <b-input-group>
                                        <template v-slot:prepend>
                                            <a
                                                class="current-color"
                                                :class="{
                                                    nocolor: !form.background_color,
                                                }"
                                                :style="{
                                                    backgroundColor:
                                                        form.background_color,
                                                }"
                                            ></a>
                                        </template>
                                        <b-form-input
                                            v-model="form.background_color"
                                            class="txt-color-value"
                                        ></b-form-input>
                                    </b-input-group>
                                    <color-picker
                                        v-model="backColor"
                                        v-if="isBackColorPicker"
                                        @input="onChangeBackColor"
                                    >
                                    </color-picker>
                                </b-form-group>
                            </div>
                        </b-col>
                    </b-form-row>
                    <div class="actions">
                        <basic-button
                            class="btn-preview"
                            variant="outline-black"
                            @click="handlePreviewClick"
                        >
                            Preview
                        </basic-button>
                        <basic-button class="btn-next" @click="handleNextClick">
                            Next
                        </basic-button>
                    </div>
                </div>
            </div>
        </div>
        <SendTestModal />
        <PreviewEmailModal />
    </b-container>
</template>
<script>
import { Chrome } from 'vue-color'
import SendTestModal from '@/components/Modal/Marketing/SendTestModal'
import EmailPreviewVideo from '@/components/Marketing/Messages/EmailPreviewVideo'
import PreviewEmailModal from '@/components/Modal/Marketing/PreviewEmailModal'
import { mapGetters } from 'vuex'
import { appConstants, templates } from '~/constants'
import { getYtVideoThumbUrl } from '~/utils'
export default {
    name: 'CustomizeMessageVideo',
    components: {
        'color-picker': Chrome,
        SendTestModal,
        EmailPreviewVideo,
        PreviewEmailModal,
    },
    data: () => ({
        isBackColorPicker: false,
        backColor: {
            hex: '',
        },
        form: {
            campaing_name: '',
            headline: '',
            body: '',
            artwork: '',
            background_color: '',
            content: '',
        },
    }),
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
        thumbUrl() {
            return getYtVideoThumbUrl(
                this.$youtube.getIdFromUrl(this.form.artwork)
            )
        },
    },
    mounted() {
        this.form = {
            ...this.form,
            ...this.smsData,
        }
        document.addEventListener('click', this.handleDocumentClick)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick)
    },
    methods: {
        back() {
            this.$router.push({
                name: 'editMessage',
            })
        },
        onChangeBackColor(val) {
            this.backColor = val
            this.form.background_color = val.hex
        },
        handleDocumentClick(e) {
            const elBack = this.$refs.backColorPicker
            if (!elBack) return
            if (!elBack.contains(e.target)) {
                this.isBackColorPicker = false
            } else {
                this.isBackColorPicker = true
            }
        },
        async handleNextClick() {
            const params = {
                ...this.smsData,
                ...this.form,
                content: this.complieContent(),
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$router.push({
                name: 'editMessage',
            })
        },
        handleTestClick() {
            this.$bus.$emit('modal.sendTest.open')
        },
        complieContent() {
            let mailContent = templates.emails.video

            mailContent = mailContent.replace(
                'EMAIL_CUSTOM_BACK_COLOR',
                this.form.background_color
            )

            let logoUrl = `${appConstants.baseAppUrl}${appConstants.emailDefaultLogo}`
            mailContent = mailContent.replace('EMAIL_LOGO_URL', logoUrl)

            mailContent = mailContent.replaceAll(
                'EMAIL_ARTWORK_URL',
                this.thumbUrl
            )
            mailContent = mailContent.replaceAll(
                'EMAIL_VIDEO_URL',
                this.form.artwork
            )

            mailContent = mailContent.replace(
                'EMAIL_CUSTOM_HEADLINE',
                this.form.headline
            )
            mailContent = mailContent.replace(
                'EMAIL_CUSTOM_BODY',
                this.form.body
            )
            mailContent = mailContent.replace(
                'EMAIL_API_URL',
                process.env.VUE_APP_API_URL
            )
            mailContent = mailContent.replace(
                'EMAIL_FOOTER_LOGO_URL',
                `${appConstants.baseAppUrl}${appConstants.emailFooterLogo}`
            )
            return mailContent
        },
        async handlePreviewClick() {
            const params = {
                ...this.smsData,
                ...this.form,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$bus.$emit('modal.previewEmail.open')
        },
    },
}
</script>
