<template>
    <b-modal
        modal-class="PreviewLandingModal"
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
            <LandingPreviewEmailMobile
                v-if="landingData.template_type === 'email'"
                :landing-data="landingData"
            />
            <LandingPreviewCollectMobile
                v-if="landingData.template_type === 'collect'"
                :landing-data="landingData"
            />
            <LandingPreviewLead
                v-if="landingData.template_type === 'lead'"
                :landing-data="landingData"
            />
        </template>
    </b-modal>
</template>
<script>
import { mapGetters } from 'vuex'
import LandingPreviewEmailMobile from '~/components/Marketing/LandingPages/LandingPreviewEmailMobile'
import LandingPreviewCollectMobile from '~/components/Marketing/LandingPages/LandingPreviewCollectMobile'
import LandingPreviewLead from '~/components/Marketing/LandingPages/LandingPreviewLead'
export default {
    name: 'PreviewLandingModal',
    components: {
        LandingPreviewEmailMobile,
        LandingPreviewCollectMobile,
        LandingPreviewLead,
    },
    data() {
        return {
            open: false,
        }
    },
    computed: {
        ...mapGetters({
            landingData: 'marketing/landingData',
        }),
    },
    created() {
        this.$bus.$on('modal.previewLanding.open', this.handleOpen)
        this.$bus.$on('modal.previewLanding.close', this.handleClose)
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
