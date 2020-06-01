<template>
    <div class="FileUploadBlock">
        <DropAudio
            title="Untagged .WAV (or .MP3)"
            :src="files.untagged && files.untagged.base64"
            :filename="files.untagged && files.untagged.name"
            @file-add="handleUntaggedFileAdded"
            @file-remove="handleUntaggedFileRemoved"
        />
        <DropFile
            title="Track Stems .ZIP (or .RAR)"
            :acceptTypes="['.rar', '.zip']"
            :src="files.stems && files.stems.base64"
            :filename="files.stems && files.stems.name"
            @file-add="handleStemsFileAdded"
            @file-remove="handleStemsFileRemoved"
        />
        <DropAudio
            title="Tagged Streaming File (.MP3 or .WAV)"
            :src="files.tagged && files.tagged.base64"
            :filename="files.tagged && files.tagged.name"
            @file-add="handleTaggedFileAdded"
            @file-remove="handleTaggedFileRemoved"
        />
    </div>
</template>

<script>
import { DropAudio, DropFile } from '~/components/Uploader'

export default {
    name: 'FileUploadBlock',
    components: {
        DropAudio,
        DropFile,
    },
    props: {
        isEditMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            files: { ...this.$store.getters['trackAddWizard/form'].files },
        }
    },
    watch: {
        files() {
            !this.isEditMode && this.updateWizardForm()
        },
    },
    created() {
        this.$bus.$on('wz.validateBlock.files', this.handleBlockValidate)
    },
    destroyed() {
        this.$bus.$off('wz.validateBlock.files')
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                files: { ...this.files },
            })
        },
        handleBlockValidate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
        handleUntaggedFileAdded({ name, base64 }) {
            this.files.untagged = {
                name,
                base64,
            }
        },
        handleUntaggedFileRemoved() {
            this.files.untagged = null
        },
        handleStemsFileAdded({ name, base64 }) {
            this.files.stems = {
                name,
                base64,
            }
        },
        handleStemsFileRemoved() {
            this.files.stems = null
        },
        handleTaggedFileAdded({ name, base64 }) {
            this.files.tagged = {
                name,
                base64,
            }
        },
        handleTaggedFileRemoved() {
            this.files.tagged = null
        },
    },
}
</script>