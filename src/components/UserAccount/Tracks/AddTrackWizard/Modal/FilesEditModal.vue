<template>
    <b-modal size="lg" centered v-model="shown">
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Files</h2>
        </template>

        <template v-slot:default>
            <FileUploadBlock :active="shown" :initial-files="files" />
        </template>

        <template v-slot:modal-footer>
            <ls-button
                class="modal-action modal-cancel"
                variant="secondary"
                @click="close"
            >
                Cancel
            </ls-button>
            <ls-button class="modal-action" @click="handleSaveClick">
                Save
            </ls-button>
        </template>
    </b-modal>
</template>

<script>
import { FileUploadBlock } from '../'

export default {
    name: 'FilesEditModal',
    components: {
        FileUploadBlock,
    },
    data() {
        return {
            shown: false,
            files: {},
        }
    },
    created() {
        this.$bus.$on('modal.filesEdit.show', this.handleShow)
        this.$bus.$on('modal.filesEdit.hide', this.close)
    },
    methods: {
        close() {
            this.shown = false
        },
        handleShow({ files }) {
            this.files = files
            this.shown = true
        },
        handleSaveClick() {
            this.$bus.$emit('wz.validate.files', {
                onSuccess: this.close,
            })
        },
    },
}
</script>
