<template>
    <div class="DropImage">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes.join(',')"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <section class="preview" v-if="fileAdded">
            <div class="img-box">
                <img :src="file.src" @click="showFileDialog" />
                <LsIconButton
                    class="file-remove-ibtn"
                    icon="dropimg-remove"
                    @click="handleRemoveClick"
                />
                <LsIconButton
                    class="file-replace-btn"
                    icon="dropimg-cam"
                    @click="showFileDialog"
                />
            </div>
            <ls-button
                class="file-remove-btn"
                variant="link"
                @click="handleRemoveClick"
            >
                Remove artwork
            </ls-button>
        </section>

        <section class="upload" v-else>
            <div
                class="drop-box"
                :class="{ highlight: isDraggingFile }"
                @drop="handleDrop"
                @dragleave="handleDragLeave"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @click="showFileDialog"
            >
                <i class="upload-icon"></i>
                <div class="upload-msg --sm" v-html="msgShort"></div>
                <div class="upload-msg --lg" v-html="msgLong"></div>
            </div>
            <ls-button
                class="file-add-btn"
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
            type: Array,
            default() {
                return ['.png', '.jpg', '.jpeg']
            },
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
        showInvalidFileAlert() {
            this.$alert.oops(
                `Only ${this.acceptTypes
                    .slice(0, -1)
                    .join(', ')} and ${this.acceptTypes
                    .slice(-1)
                    .join(', ')} images allowed`
            )
        },
        async addFile(file) {
            if (!this.validateFile(file)) {
                this.showInvalidFileAlert()
                return
            }
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
            this.isDraggingFile = false
            const file = e.dataTransfer.files[0]
            if (!this.validateFile(file)) {
                this.showInvalidFileAlert()
                return
            }
            this.tmpFile = file
        },
        handleFileSelected(e) {
            const file = e.target.files[0]
            if (!this.validateFile(file)) {
                this.showInvalidFileAlert()
                return
            }
            this.tmpFile = file
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
