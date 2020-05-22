<template>
    <div>
        <DropAudio
            title="Untagged .WAV (or .MP3)"
            :src="files.untagged.base64"
            :filename="files.untagged.name"
            @file-add="handleUntaggedFileAdded"
            @file-remove="handleUntaggedFileRemoved"
        />
        <DropFile
            title="Track Stems .ZIP (or .RAR)"
            acceptTypes=".zip,.rar"
            :src="files.stems.base64"
            :filename="files.stems.name"
            @file-add="handleStemsFileAdded"
            @file-remove="handleStemsFileRemoved"
        />
        <DropAudio
            title="Tagged Streaming File (.MP3 or .WAV)"
            :src="files.tagged.base64"
            :filename="files.tagged.name"
            @file-add="handleTaggedFileAdded"
            @file-remove="handleTaggedFileRemoved"
        />
    </div>
</template>

<script>
import { DropAudio, DropFile } from '~/components/Uploader'

export default {
    name: 'FilesPane',
    components: {
        DropAudio,
        DropFile,
    },
    props: {
        initialFiles: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            files: {
                tagged: {
                    name: null,
                    base64: null,
                },
                untagged: {
                    name: null,
                    base64: null,
                },
                stems: {
                    name: null,
                    base64: null,
                },
                ...this.initialFiles,
            },
        }
    },
    created() {
        this.$eventBus.$on('wz.nextClick', this.handleStepNextClick)
    },
    methods: {
        handleStepNextClick({ currentStep }) {
            if (currentStep !== 'files') {
                return
            }
            this.$eventBus.$emit('wz.updateForm', {
                files: this.files,
            })
            this.$eventBus.$emit('wz.goToNext')
        },
        handleUntaggedFileAdded(file) {
            this.files.untagged = {
                ...file,
            }
        },
        handleUntaggedFileRemoved() {
            this.files.untagged = {
                name: null,
                base64: null,
            }
        },
        handleStemsFileAdded(file) {
            this.files.stems = {
                ...file,
            }
        },
        handleStemsFileRemoved() {
            this.files.stems = {
                name: null,
                base64: null,
            }
        },
        handleTaggedFileAdded(file) {
            this.files.tagged = {
                ...file,
            }
        },
        handleTaggedFileRemoved() {
            this.files.tagged = {
                name: null,
                base64: null,
            }
        },
    },
}
</script>