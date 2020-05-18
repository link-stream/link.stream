<template>
    <div class="drop-img">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileinput"
            @change="handleFileSelected"
        />

        <section class="df-preview" v-if="isStateAdded">
            <div class="p-box" @click="showFileDialog">
                <img :src="image.src" />
                <LsIconButton
                    class="p-close-btn"
                    icon="dropimg-remove"
                    @click="removeImage"
                />
                <LsIconButton class="p-cam-btn" icon="dropimg-cam" />
            </div>
            <ls-button class="p-rm-btn" variant="link" @click="removeImage">
                Remove artwork
            </ls-button>
        </section>

        <section
            v-else
            class="df-upload"
            :class="{ '--highlight': draggingOver }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <div class="u-box">
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
            v-if="isStateEdit"
            :src="tmp.src"
            :crop-aspect-ratio="aspectRatio"
            @confirm="handleDokaConfirm"
            @cancel="handleDokaCancel"
        />
    </div>
</template>

<script>
import { Doka, DokaModal, toURL } from 'vue-doka'
import { blobToBase64 } from 'base64-blob'

export default {
    name: 'DropImage',
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
        src: {
            type: String,
            default: null,
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
            draggingOver: false,
            image: {
                file: null,
                src: this.src,
                base64: null,
            },
            tmp: {
                file: null,
                src: null,
            },
        }
    },
    computed: {
        isStateEdit() {
            return this.tmp.file ? true : false
        },
        isStateAdded() {
            return this.image.src ? true : false
        },
    },
    methods: {
        removeImage() {
            this.image = {
                file: null,
                src: null,
                base64: null,
            }
            this.tmp = {
                file: null,
                src: null,
            }
            this.$emit('image-removed')
        },
        showFileDialog() {
            this.$refs.fileinput.value = null
            this.$refs.fileinput.click()
        },
        handleDragEnter(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = true
        },
        handleDragOver(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = true
        },
        handleDragLeave(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = false
        },
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            const file = e.dataTransfer.files[0]
            this.tmp = {
                file,
                src: toURL(file),
            }
            this.draggingOver = false
        },
        handleFileSelected(e) {
            const file = e.target.files[0]
            this.tmp = {
                file,
                src: toURL(file),
            }
        },
        async handleDokaConfirm(output) {
            const file = output.file
            const base64 = await blobToBase64(file)
            if (base64) {
                this.image = {
                    file,
                    src: toURL(file),
                    base64,
                }
                this.$emit('image-added', this.image)
            } else {
                this.$toast.error('Something went wrong, please try again.')
            }
            this.tmp = {
                file: null,
                src: null,
            }
        },
        handleDokaCancel() {
            this.tmp = {
                file: null,
                src: null,
            }
        },
    },
}
</script>
