<template>
    <div class="FileUploadBlock">
        <DropAudio
            title="Untagged .WAV (or .MP3)"
            :class="{ 'is-invalid': $v.files.untagged.$error }"
            :src="files.untagged && files.untagged.base64"
            :filename="files.untagged && files.untagged.name"
            @file-added="handleUntaggedFileAdded"
            @file-removed="handleUntaggedFileRemoved"
        />

        <DropFile
            title="Track Stems .ZIP (or .RAR)"
            class="stems-file"
            :class="{ 'is-invalid': $v.files.stems.$error }"
            :acceptTypes="['.rar', '.zip']"
            :src="files.stems && files.stems.base64"
            :filename="files.stems && files.stems.name"
            @file-added="handleStemsFileAdded"
            @file-removed="handleStemsFileRemoved"
        />

        <DropAudio
            title="Tagged Streaming File (.MP3 or .WAV)"
            class="tagged-file"
            :class="{ 'is-invalid': $v.files.tagged.$error }"
            :src="files.tagged && files.tagged.base64"
            :filename="files.tagged && files.tagged.name"
            @file-added="handleTaggedFileAdded"
            @file-removed="handleTaggedFileRemoved"
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
    validations() {
        return {
            files: this.$store.getters['trackAddWizard/filesValidationRules'],
        }
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
            this.$v.files.$touch()
            if (this.$v.files.$invalid) {
                this.$toast.error('Please add required files.')
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
        handleUntaggedFileAdded({ name, base64 }) {
            this.files = {
                ...this.files,
                untagged: {
                    name,
                    base64,
                },
            }
        },
        handleUntaggedFileRemoved() {
            this.files = {
                ...this.files,
                untagged: null,
            }
        },
        handleStemsFileAdded({ name, base64 }) {
            this.files = {
                ...this.files,
                stems: {
                    name,
                    base64,
                },
            }
        },
        handleStemsFileRemoved() {
            this.files = {
                ...this.files,
                stems: null,
            }
        },
        handleTaggedFileAdded({ name, base64 }) {
            this.files = {
                ...this.files,
                tagged: {
                    name,
                    base64,
                },
            }
        },
        handleTaggedFileRemoved() {
            this.files = {
                ...this.files,
                tagged: null,
            }
        },
    },
}
</script>