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
                <EmailPreviewPlain :email-data="form" />
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
                    <b-form-group label="Body">
                        <Editor
                            :initial-content="form.body"
                            :active-buttons="[
                                'bold',
                                'italic',
                                'underline',
                                'bullet_list',
                                'link',
                            ]"
                            @update="updateContent"
                        />
                    </b-form-group>
                    <b-form-row>
                        <b-col>
                            <div ref="buttonColorPicker">
                                <b-form-group
                                    label="Link Color"
                                    class="color-picker-container"
                                >
                                    <b-input-group>
                                        <template v-slot:prepend>
                                            <a
                                                class="current-color"
                                                :class="{
                                                    nocolor: !form.button_color,
                                                }"
                                                :style="{
                                                    backgroundColor:
                                                        form.button_color,
                                                }"
                                            ></a>
                                        </template>
                                        <b-form-input
                                            v-model="form.button_color"
                                            class="txt-color-value"
                                        ></b-form-input>
                                    </b-input-group>
                                    <color-picker
                                        v-model="buttonColor"
                                        v-if="isButtonColorPicker"
                                        @input="onChangeButtonColor"
                                    >
                                    </color-picker>
                                </b-form-group>
                            </div>
                        </b-col>
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
                        <basic-button class="btn-next" @click="handleNextClick">
                            Next
                        </basic-button>
                    </div>
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>
import { Chrome } from 'vue-color'
import EmailPreviewPlain from '@/components/Marketing/Messages/EmailPreviewPlain'
import Editor from '@/components/Form/Editor/Editor.vue'
import { mapGetters } from 'vuex'
import { appConstants, emailTemplates } from '~/constants'
export default {
    name: 'CustomizeMessagePlain',
    components: {
        'color-picker': Chrome,
        EmailPreviewPlain,
        Editor,
    },
    data: () => ({
        isButtonColorPicker: false,
        buttonColor: {
            hex: '#DC2EA6',
        },
        isBackColorPicker: false,
        backColor: {
            hex: '',
        },
        form: {
            body: '',
            logo: '',
            artwork: '',
            button_color: '#DC2EA6',
            background_color: '',
            background_image: '',
            content: '',
        },
    }),
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    created() {
        this.form = {
            ...this.form,
            ...this.smsData,
        }
    },
    mounted() {
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
        onChangeButtonColor(val) {
            this.buttonColor = val
            this.form.button_color = val.hex
        },
        onChangeBackColor(val) {
            this.backColor = val
            this.form.background_color = val.hex
        },
        handleDocumentClick(e) {
            const el = this.$refs.buttonColorPicker
            if (!el) return
            if (!el.contains(e.target)) {
                this.isButtonColorPicker = false
            } else {
                this.isButtonColorPicker = true
            }
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
        updateContent(content) {
            this.form.body = content
        },
        complieContent() {
            let mailContent = emailTemplates.plain

            mailContent = mailContent.replace(
                'EMAIL_CUSTOM_BACK_COLOR',
                this.form.background_color
            )

            let logoUrl = `${appConstants.baseAppUrl}${appConstants.emailDefaultLogo}`
            mailContent = mailContent.replace('EMAIL_LOGO_URL', logoUrl)

            mailContent = mailContent.replace(
                'EMAIL_CUSTOM_BODY',
                this.form.body
            )
            mailContent = mailContent.replace(
                'EMAIL_CUSTOM_BUTTON_COLOR',
                this.form.button_color
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
    },
}
</script>
