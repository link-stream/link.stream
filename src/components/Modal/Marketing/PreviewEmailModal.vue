<template>
    <b-modal
        modal-class="PreviewEmailModal"
        centered
        v-model="open"
        size="lg"
        hide-footer
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Preview</h4>
        </template>
        <template v-slot:default>
            <EmailPreviewReleaseMobile
                v-if="emailData.template_type === 'release'"
                :emailData="emailData"
            />
            <EmailPreviewPlainMobile
                v-if="emailData.template_type === 'plain'"
                :emailData="emailData"
            />
            <EmailPreviewVideoMobile
                v-if="emailData.template_type === 'video'"
                :emailData="emailData"
            />
        </template>
    </b-modal>
</template>
<script>
import { mapGetters } from 'vuex'
import EmailPreviewReleaseMobile from '~/components/Marketing/Messages/EmailPreviewReleaseMobile'
import EmailPreviewPlainMobile from '~/components/Marketing/Messages/EmailPreviewPlainMobile'
import EmailPreviewVideoMobile from '~/components/Marketing/Messages/EmailPreviewVideoMobile'
export default {
    name: 'PreviewEmailModal',
    components: {
        EmailPreviewReleaseMobile,
        EmailPreviewPlainMobile,
        EmailPreviewVideoMobile,
    },
    data() {
        return {
            open: false,
        }
    },
    computed: {
        ...mapGetters({
            emailData: 'marketing/smsData',
        }),
    },
    created() {
        this.$bus.$on('modal.previewEmail.open', this.handleOpen)
        this.$bus.$on('modal.previewEmail.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
    },
}
</script>
