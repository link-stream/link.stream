<template>
    <div class="DropImage">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <section class="DropImage-p" v-if="isFileAdded">
            <div class="DropImage-p-box">
                <img :src="file.src" @click="showFileDialog" />
                <LsIconButton
                    class="DropImage-p-remove-i"
                    icon="dropimg-remove"
                    @click="handleRemoveClick"
                />
                <LsIconButton
                    class="DropImage-p-add-i"
                    icon="dropimg-cam"
                    @click="showFileDialog"
                />
            </div>
            <ls-button
                class="DropImage-p-remove-btn"
                variant="link"
                @click="handleRemoveClick"
            >
                Remove artwork
            </ls-button>
        </section>

        <section v-else class="DropImage-u">
            <div
                class="DropImage-u-box"
                :class="{ '--highlight': isDraggingFile }"
                @drop="handleDrop"
                @dragleave="handleDragLeave"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @click="showFileDialog"
            >
                <i class="DropImage-u-i"></i>
                <div class="DropImage-u-msg --sm" v-html="msgShort"></div>
                <div class="DropImage-u-msg --lg" v-html="msgLong"></div>
            </div>
            <ls-button
                class="DropImage-u-add-btn"
                variant="link"
                @click="showFileDialog"
            >
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
                    name: file.name,
                    src: base64,
                }
                this.$emit('file-add', {
                    name: file.name,
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
