<template>
    <div class="drop-img">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <section class="df-preview" v-if="isFileAdded">
            <div class="p-box">
                <img :src="file.src" @click="showFileDialog" />
                <LsIconButton
                    class="p-close-btn"
                    icon="dropimg-remove"
                    @click="handleRemoveClick"
                />
                <LsIconButton
                    class="p-cam-btn"
                    icon="dropimg-cam"
                    @click="showFileDialog"
                />
            </div>
            <ls-button
                class="p-rm-btn"
                variant="link"
                @click="handleRemoveClick"
            >
                Remove artwork
            </ls-button>
        </section>

        <section v-else class="df-upload">
            <div
                class="u-box"
                :class="{ '--highlight': isDraggingFile }"
                @drop="handleDrop"
                @dragleave="handleDragLeave"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @click="showFileDialog"
            >
                <i class="u-ico"></i>
                <div class="u-msg">
                    <div class="u-msg-sm" v-html="msgShort"></div>
                    <div class="u-msg-lg" v-html="msgLong"></div>
                </div>
            </div>
            <ls-button class="u-add-btn" variant="link" @click="showFileDialog">
                Add artwork
            </ls-button>
        </section>

        <DokaModal
            v-if="isFileSelected"
            :src="tmpFile"
            :crop-aspect-ratio="aspectRatio"
            @confirm="handleDokaConfirm"
            @cancel="handleDokaCancel"
        />
    </div>
</template>

<script>
import { uploaderMixin } from '~/mixins/uploader'
import { toUrl } from '~/utils'
import { Doka, DokaModal } from 'vue-doka'
import { blobToBase64 } from 'base64-blob'

export default {
    name: 'DropImage',
    mixins: [uploaderMixin],
    components: { DokaModal },
    props: {
        aspectRatio: {
            type: String,
            default: '1',
        },
        acceptTypes: {
            type: String,
            default: 'image/*',
        },
        msgShort: {
            type: String,
            default: '<u>Upload</u><br>an image',
        },
        msgLong: {
            type: String,
            default: 'Drag image here<br>&nbsp;or&nbsp;<u>browse</u>',
        },
    },
    data() {
        return {
            tmpFile: null,
        }
    },
    computed: {
        isFileSelected() {
            return this.tmpFile ? true : false
        },
    },
    methods: {
        async addFile(file) {
            const base64 = await blobToBase64(file)
            this.tmpFile = null
            if (base64) {
                this.file = {
                    src: toUrl(base64),
                }
                this.$emit('file-add', {
                    base64,
                })
            } else {
                this.$toast.error('Something went wrong, please try again.')
            }
        },
        handleRemoveClick() {
            this.tmpFile = null
            this.removeFile()
        },
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            this.tmpFile = e.dataTransfer.files[0]
            this.isDraggingFile = false
        },
        handleFileSelected(e) {
            this.tmpFile = e.target.files[0]
        },
        handleDokaCancel() {
            this.tmpFile = null
        },
        handleDokaConfirm(output) {
            this.addFile(output.file)
        },
    },
}
</script>
