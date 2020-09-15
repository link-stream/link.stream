<template>
    <b-modal
        modal-class="EditSubjectModal"
        centered
        v-model="open"
        size="lg"
        @hide="$emit('close')"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Add a subject line</h4>
        </template>
        <template v-slot:default>
            <b-form-group
                label="What's the subject line of this email?"
                label-for="subject-line"
            >
                <b-form-input
                    id="subject-line"
                    v-model="subjectLine"
                    required
                    placeholder="Subject Line"
                >
                </b-form-input>
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
    name: 'EditSubjectModal',
    data() {
        return {
            open: true,
            subjectLine: '',
        }
    },
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    created() {
        this.subjectLine = this.smsData.subject
    },
    methods: {
        close() {
            this.$emit('close')
        },
        async handleSaveClick() {
            if (!this.subjectLine) {
                this.$toast.error('Please enter a subject line.')
                return
            }
            const params = {
                ...this.smsData,
                subject: this.subjectLine,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.close()
        },
    },
}
</script>
