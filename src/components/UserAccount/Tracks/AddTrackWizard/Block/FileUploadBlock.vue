<template>
    <div>
        <DropAudio
            title="Untagged .WAV (or .MP3)"
            :src="files.untagged && files.untagged.base64"
            :filename="files.untagged && files.untagged.name"
            @file-add="handleUntaggedFileAdded"
            @file-remove="handleUntaggedFileRemoved"
        />
        <DropFile
            title="Track Stems .ZIP (or .RAR)"
            acceptTypes=".zip,.rar"
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
        active: {
            type: Boolean,
            default: false,
        },
        initialFiles: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            files: {
                tagged: null,
                untagged: null,
                stems: null,
                ...this.initialFiles,
            },
        }
    },
    watch: {
        initialFiles() {
            this.files = { ...this.initialFiles }
        },
    },
    created() {
        this.$bus.$on('wz.validate.files', this.handleValidate)
    },
    methods: {
        handleValidate({ onSuccess }) {
            if (!this.active) {
                return
            }
            this.$bus.$emit('wz.updateForm', {
                files: { ...this.files },
            })
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