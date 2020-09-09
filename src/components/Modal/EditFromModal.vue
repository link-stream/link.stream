<template>
    <b-modal
        modal-class="EditSendtoModal"
        centered
        v-model="open"
        size="lg"
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
                    <b-form-group
                        label="Name"
                        label-for="from-name"
                    >
                        <b-form-input
                            id="from-name"
                            v-model="fromName"
                            required
                            placeholder="Name"
                        >
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" sm="6">
                    <b-form-group
                        label="Email"
                        label-for="from-email"
                    >
                        <b-form-input
                            id="from-email"
                            v-model="fromEmail"
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
    name: 'EditSendtoModal',
    data() {
        return {
            open: false,
            fromName: null,
            fromEmail: null
        }
    },
    async created() {
        this.$bus.$on('modal.editFrom.open', this.handleOpen)
        this.$bus.$on('modal.editFrom.close', this.handleClose)
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
            this.$router.push({ name: 'editMessage' })
            this.close()
        },
    },
}
</script>
