<template>
    <b-modal modal-class="CreateSplitModal" centered v-model="open" size="lg">
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Create a Split Test</h4>
        </template>
        <template v-slot:default>
            <b-form-group
                label="Give this split test a name"
                label-for="split-title"
            >
                <b-form-input
                    id="split-title"
                    v-model="splitTitle"
                    required
                    placeholder="Placeholder Split Test Title"
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
// import { mapGetters } from 'vuex'
export default {
    name: 'CreateSplitModal',
    data() {
        return {
            open: false,
            splitTitle: '',
        }
    },
    created() {
        this.$bus.$on('modal.createSplit.open', this.handleOpen)
        this.$bus.$on('modal.createSplit.close', this.handleClose)
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
            if (!this.splitTitle) {
                this.$toast.error('Please enter split test title.')
                return
            }
            const params = {
                title: this.splitTitle,
            }
            await this.$store.dispatch('marketing/setSplitTestData', params)
            this.$router.push({ name: 'editSplitTest' })
            this.close()
        },
    },
}
</script>
