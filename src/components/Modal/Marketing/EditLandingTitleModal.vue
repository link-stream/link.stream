<template>
    <b-modal
        modal-class="EditLandingTitleModal"
        centered
        v-model="open"
        size="lg"
        @hide="$emit('close')"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Edit Landing Page Title</h4>
        </template>
        <template v-slot:default>
            <b-form-group
                label="What's the title of this landing page?"
                label-for="subject-line"
            >
                <b-form-input
                    id="subject-line"
                    v-model="subjectLine"
                    required
                    placeholder="Title"
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
    name: 'EditLandingTitleModal',
    data() {
        return {
            open: true,
            subjectLine: '',
        }
    },
    computed: {
        ...mapGetters({
            landingData: 'marketing/landingData',
        }),
    },
    created() {
        this.subjectLine = this.landingData.campaing_name ? this.landingData.campaing_name : ''
    },
    methods: {
        close() {
            this.$emit('close')
        },
        async handleSaveClick() {
            if (!this.subjectLine) {
                this.$toast.error('Please enter a title.')
                return
            }
            const params = {
                ...this.landingData,
                campaing_name: this.subjectLine,
            }
            await this.$store.dispatch('marketing/setLandingData', params)
            this.close()
        },
    },
}
</script>
