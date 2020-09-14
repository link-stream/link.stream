<template>
    <b-modal
        modal-class="EditSendtoModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Send to</h4>
            <p class="description">
                You can send a message to all of your email subscribers or use segmentation too send this message to a select group
            </p>
        </template>
        <template v-slot:default>
            <b-form-group
                label="Segment or Tag(optional)"
                label-for="segmentTagInput"
            >
                <BasicSelect
                    v-model="segmentTag"
                    id="segmentTagInput"
                    placeholder="Select Segment or Tag"
                    :options="sentos"
                    :reduce="segmentTag => segmentTag.value"
                    label="title"
                />
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
                    @click="handleSaveClick"
                >
                    Save
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'EditSendtoModal',
    data() {
        return {
            open: false,
            segmentTag: '',
        }
    },
    computed: {
        ...mapGetters({
            sentos: 'marketing/sendtos',
            smsData: 'marketing/smsData',
        }),
    },
    watch: {
        smsData(value) {
            this.segmentTag = value.send_to
        },
    },
    async created() {
        this.$bus.$on('modal.editSendto.open', this.handleOpen)
        this.$bus.$on('modal.editSendto.close', this.handleClose)
        await this.$store.dispatch('marketing/getMessageSendto')
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
        async handleSaveClick() {
            const params = {
                ...this.smsData,
                send_to: this.segmentTag,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.close()
        },
    },
}
</script>
