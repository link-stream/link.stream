<template>
    <b-modal
        modal-class="EditSendtoModal"
        centered
        v-model="open"
        size="lg"
        @hide="$emit('close')"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">From</h4>
            <p class="description">
                Who is sending this mail? You should use a name and email that your audience will recognize.
            </p>
        </template>
        <template v-slot:default>
            <b-form-row>
                <b-col cols="12" sm="6">
                    <b-form-group label="Name" label-for="from-name">
                        <b-form-input
                            id="from-name"
                            v-model="form.user_name"
                            required
                            placeholder="Name"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" sm="6">
                    <b-form-group label="Email" label-for="from-email">
                        <b-form-input
                            id="from-email"
                            type="email"
                            v-model="form.reply_to"
                            required
                            placeholder="Email"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
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
                <spinner-button class="action-btn" @click="handleSaveClick">
                    Save
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'EditFromModal',
    data() {
        return {
            open: true,
            form: {
                user_name: null,
                reply_to: null,
            },
        }
    },
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    created() {
        this.form.user_name = this.smsData.user_name
        this.form.reply_to = this.smsData.reply_to
    },
    methods: {
        close() {
            this.$emit('close')
        },
        async handleSaveClick() {
            const params = {
                ...this.smsData,
                user_name: this.form.user_name,
                reply_to: this.form.reply_to,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.close()
        },
    },
}
</script>
