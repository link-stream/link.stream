<template>
    <div class="dropimg">
        <input
            type="file"
            v-show="false"
            :accept="allowedTypes"
            ref="fileinput"
            @change="handleFileInputChange"
        />
        <section class="dropimg-p" v-if="isPreview">
            <main class="dropimg-img" @click="showFileDialog">
                <img :src="image.src" />
                <IconButton
                    class="dropimg-rm-btn"
                    icon="dropimg-remove"
                    @click="reset"
                />
                <IconButton
                    class="dropimg-add-btn"
                    icon="dropimg-cam"
                    @click="showFileDialog"
                />
            </main>
            <basic-button class="dropimg-rm-lnk" variant="link" @click="reset">
                Remove artwork
            </basic-button>
        </section>
        <section
            v-else
            class="dropimg-u"
            :class="{ '--highlight': isDraggingOver }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <main class="dropimg-u-dz">
                <i class="dropimg-u-i"></i>
                <div class="dropimg-u-msg">
                    <div class="msg-short" v-html="msgShort"></div>
                    <div class="msg-long" v-html="msgLong"></div>
                </div>
            </main>
            <basic-button
                class="dropimg-add-lnk"
                variant="link"
                @click="showFileDialog"
            >
                Add artwork
            </basic-button>
        </section>

        <DokaModal
            v-if="isEdit"
            :src="tmp.src"
            :crop-aspect-ratio="aspectRatio"
            @confirm="handleDokaConfirm"
            @cancel="handleDokaCancel"
        />
    </div>
</template>

<script>
import { Doka, DokaModal, toURL } from 'vue-doka'
import { IconButton, BasicButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { blobToBase64 } from 'base64-blob'

export default {
    name: 'DropImage',
    components: { DokaModal, BasicButton, Icon, IconButton },
    props: {
        aspectRatio: {
            type: String,
            default: '1',
        },
        allowedTypes: {
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
            isDraggingOver: false,
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
        isInitial() {
            return !this.image.src
        },
        isEdit() {
            return this.tmp.file
        },
        isPreview() {
            return this.image.src
        },
    },
    methods: {
        reset() {
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
            if (this.isInitial) {
                this.isDraggingOver = true
            }
        },
        handleDragOver(e) {
            e.preventDefault()
            e.stopPropagation()
            if (this.isInitial) {
                this.isDraggingOver = true
            }
        },
        handleDragLeave(e) {
            e.preventDefault()
            e.stopPropagation()
            if (this.isInitial) {
                this.isDraggingOver = false
            }
        },
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            if (this.isInitial) {
                const file = e.dataTransfer.files[0]
                this.isDraggingOver = false
                this.tmp = {
                    file,
                    src: toURL(file),
                }
            }
        },
        handleFileInputChange(e) {
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
