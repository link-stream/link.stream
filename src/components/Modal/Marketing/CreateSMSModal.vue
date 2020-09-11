<template>
    <b-modal
        modal-class="CreateSMSModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <h4 class="title">Send an SMS message</h4>
        </template>
        <template v-slot:default>
            <b-form-group
                label="Give this SMS campaign a name"
                label-for="campaign-name"
            >
                <b-form-input
                    id="campaign-name"
                    v-model="campaignName"
                    required
                    placeholder="Campaign Name"
                >
                </b-form-input>
            </b-form-group>
            <b-form-group label="Sending options">
                <b-form-radio-group v-model="scheduled" name="sending-option">
                    <b-form-radio :value="false">Send now</b-form-radio>
                    <b-form-radio :value="true">Schedule</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </template>
        <template v-slot:modal-footer>
            <div class="right-col">
                <basic-button
                    class="action-btn text-black"
                    variant="link"
                    @click="close"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    class="action-btn"
                    @click="handleNextClick"
                >
                    Next
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'CreateSMSModal',
    data() {
        return {
            open: false,
            campaignName: '',
            scheduled: false,
        }
    },
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    watch: {
        smsData(value) {
            this.campaignName = value.campaing_name
            this.scheduled = value.scheduled
        },
    },
    created() {
        this.$bus.$on('modal.createSMS.open', this.handleOpen)
        this.$bus.$on('modal.createSMS.close', this.handleClose)
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
        async handleNextClick() {
            if (!this.campaignName) {
                this.$toast.error('Please enter a campaign name.')
                return
            }
            const params = {
                ...this.smsData,
                campaing_name: this.campaignName,
                scheduled: this.scheduled,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$bus.$emit('modal.editSMS.open')
            this.close()
        },
    },
}
</script>
