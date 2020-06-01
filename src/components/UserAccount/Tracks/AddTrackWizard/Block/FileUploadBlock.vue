<template>
    <div class="FileUploadBlock">
        <DropAudio
            title="Untagged .WAV (or .MP3)"
            :src="localFiles.untagged && localFiles.untagged.base64"
            :filename="localFiles.untagged && localFiles.untagged.name"
            @file-add="handleUntaggedFileAdded"
            @file-remove="handleUntaggedFileRemoved"
        />
        <DropFile
            title="Track Stems .ZIP (or .RAR)"
            :acceptTypes="['.rar', '.zip']"
            :src="localFiles.stems && localFiles.stems.base64"
            :filename="localFiles.stems && localFiles.stems.name"
            @file-add="handleStemsFileAdded"
            @file-remove="handleStemsFileRemoved"
        />
        <DropAudio
            title="Tagged Streaming File (.MP3 or .WAV)"
            :src="localFiles.tagged && localFiles.tagged.base64"
            :filename="localFiles.tagged && localFiles.tagged.name"
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
        files: {
            type: Object,
        },
        isEditMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localFiles: { ...this.files },
        }
    },
    watch: {
        localFiles() {
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
            this.$bus.$emit('wz.updateForm', {
                files: { ...this.localFiles },
            })
        },
        handleBlockValidate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
        handleUntaggedFileAdded({ name, base64 }) {
            this.localFiles.untagged = {
                name,
                base64,
            }
        },
        handleUntaggedFileRemoved() {
            this.localFiles.untagged = null
        },
        handleStemsFileAdded({ name, base64 }) {
            this.localFiles.stems = {
                name,
                base64,
            }
        },
        handleStemsFileRemoved() {
            this.localFiles.stems = null
        },
        handleTaggedFileAdded({ name, base64 }) {
            this.localFiles.tagged = {
                name,
                base64,
            }
        },
        handleTaggedFileRemoved() {
            this.localFiles.tagged = null
        },
    },
}
</script>