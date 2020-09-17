<template>
    <b-modal modal-class="SendTestModal" centered v-model="open" size="lg">
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Send a test</h4>
        </template>
        <template v-slot:default>
            <b-form-group
                label="Send a test to"
                label-for="emails"
                description="Use commas to send to multiple email addresses"
            >
                <b-form-input
                    id="emails"
                    v-model="emails"
                    required
                    placeholder="Emails"
                >
                </b-form-input>
            </b-form-group>
            <b-form-group
                label="Include a personal message (optional)"
                label-for="message"
            >
                <b-form-textarea id="emails" v-model="message" rows="5" />
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
                <spinner-button lass="action-btn" @click="handleSendTestClick">
                    Send Test
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: 'SendTestModal',
    data() {
        return {
            open: false,
            emails: null,
            message: null,
        }
    },
    created() {
        this.$bus.$on('modal.sendTest.open', this.handleOpen)
        this.$bus.$on('modal.sendTest.close', this.handleClose)
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
        handleSendTestClick() {
            if (!this.emails) {
                this.$toast.error('Please enter the mails to test.')
                return
            }
            this.$router.push({ name: 'editMessage' })
            this.close()
        },
    },
}
</script>
