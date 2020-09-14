<template>
    <b-modal
        modal-class="CreateMessageModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <a href="#" class="modal-back" @click.prevent="back">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Create an email</h4>
        </template>
        <template v-slot:default>
            <b-form-group
                label="Give this campaign a name"
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
        </template>
        <template v-slot:modal-footer>
            <div class="right-col">
                <basic-button
                    class="action-btn cancel-btn text-black"
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
    name: 'CreateMessageModal',
    data() {
        return {
            open: false,
            campaignName: '',
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
        },
    },
    created() {
        this.$bus.$on('modal.createMessage.open', this.handleOpen)
        this.$bus.$on('modal.createMessage.close', this.handleClose)
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
        back() {
            this.$bus.$emit('modal.selectMessageType.open')
            this.close()
        },
        async handleNextClick() {
            if (!this.campaignName) {
                this.$toast.error('Please enter a campaign name.')
                return
            }
            const params = {
                ...this.smsData,
                campaing_name: this.campaignName,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$router.push({ name: 'editMessage' })
            this.close()
        },
    },
}
</script>
