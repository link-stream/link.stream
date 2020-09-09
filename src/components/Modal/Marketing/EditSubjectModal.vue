<template>
    <b-modal
        modal-class="EditSubjectModal"
        centered
        v-model="open"
        size="lg"
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
export default {
    name: 'EditSubjectModal',
    data() {
        return {
            open: false,
            subjectLine: '',
        }
    },
    created() {
        this.$bus.$on('modal.editSubject.open', this.handleOpen)
        this.$bus.$on('modal.editSubject.close', this.handleClose)
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
        handleSaveClick() {
            if (!this.subjectLine) {
                this.$toast.error('Please enter a subject line.')
                return
            }
            this.$router.push({ name: 'editMessage' })
            this.close()
        },
    },
}
</script>
