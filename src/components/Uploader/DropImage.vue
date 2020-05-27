<template>
    <div class="drop-img">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <section class="d__prv" v-if="isFileAdded">
            <div class="d__prv__box">
                <img :src="file.src" @click="showFileDialog" />
                <LsIconButton
                    class="d__prv__close"
                    icon="dropimg-remove"
                    @click="handleRemoveClick"
                />
                <LsIconButton
                    class="d__prv__cam"
                    icon="dropimg-cam"
                    @click="showFileDialog"
                />
            </div>
            <ls-button
                class="d__prv__rm"
                variant="link"
                @click="handleRemoveClick"
            >
                Remove artwork
            </ls-button>
        </section>

        <section v-else class="d__upl">
            <div
                class="d__upl__box"
                :class="{ '--highlight': isDraggingFile }"
                @drop="handleDrop"
                @dragleave="handleDragLeave"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @click="showFileDialog"
            >
                <i class="d__upl__i"></i>
                <div class="d__upl__msg">
                    <div class="d__upl__msg__sm" v-html="msgShort"></div>
                    <div class="d__upl__msg__lg" v-html="msgLong"></div>
                </div>
            </div>
            <ls-button
                class="d__upl__add"
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
