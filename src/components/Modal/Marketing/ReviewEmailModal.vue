<template>
    <b-modal modal-class="ReviewEmailModal" centered v-model="open" size="lg">
        <template v-slot:modal-header>
            <h4 class="title">Review your email</h4>
        </template>
        <template v-slot:default>
            <p>
                You're about to send this message to
                <span class="font-weight-bold">
                    {{ cntSubscribers | thousandCNumber }}
                </span>
                subscribers from the audience
                <span class="font-weight-bold">
                    {{ smsData.user_name }}
                </span>
            </p>
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
                    :loading="saving"
                    @click="handleSendClick"
                >
                    Send Now
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ReviewEmailModal',
    data() {
        return {
            open: false,
            cntSubscribers: 5748,
            saving: false,
        }
    },
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    created() {
        this.$bus.$on('modal.reviewEmail.open', this.handleOpen)
        this.$bus.$on('modal.reviewEmail.close', this.handleClose)
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
        async handleSendClick() {
            this.saving = true
            const params = {
                ...this.smsData,
                status: 'Pending',
            }
            if (this.smsData.id) {
                const { status, message, error } = await this.$store.dispatch(
                    'marketing/updateMessage',
                    {
                        id: this.smsData.id,
                        params: params,
                    }
                )
                status === 'success'
                    ? this.$toast.success(message)
                    : this.$toast.error(error)
            } else {
                const { status, message, error } = await this.$store.dispatch(
                    'marketing/insertMessage',
                    params
                )
                status === 'success'
                    ? this.$toast.success(message)
                    : this.$toast.error(error)
            }
            this.saving == false
            this.close()
        },
    },
}
</script>
