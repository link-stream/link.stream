<template>
    <b-modal v-model="open" size="lg" centered @hidden="handleClosed">
        <template v-slot:modal-header>
            <LsButton variant="icon-bg" class="modal-close" @click="close" />
            <h2 class="modal-title">Files</h2>
        </template>

        <template v-slot:default>
            <FileUploadBlock :is-edit-mode="true" />
        </template>

        <template v-slot:modal-footer>
            <ls-button
                class="action-btn cancel-btn"
                variant="secondary"
                @click="close"
            >
                Cancel
            </ls-button>
            <ls-button class="action-btn" @click="handleSaveClick">
                Save
            </ls-button>
        </template>
    </b-modal>
</template>

<script>
import FileUploadBlock from '../Block/FileUploadBlock'

export default {
    name: 'FilesEditModal',
    components: {
        FileUploadBlock,
    },
    data() {
        return {
            open: true,
        }
    },
    methods: {
        close() {
            this.open = false
        },
        handleSaveClick() {
            this.$bus.$emit('wz.validateBlock.files', {
                onSuccess: this.close,
            })
        },
        handleClosed() {
            this.$emit('closed', { section: 'files' })
        },
    },
}
</script>
