<template>
    <div class="dropfoto">
        <input
            type="file"
            v-show="false"
            :accept="allowedTypes"
            ref="fileinput"
            @change="handleFileInputChange"
        />
        <section class="dropfoto-prv" v-if="isPreview">
            <main class="dropfoto-img-box">
                <img class="dropfoto-img" :src="image.src" alt />
                <IconButton
                    class="dropfoto-rm-btn"
                    icon="dropfoto-remove"
                    @click="reset"
                />
                <IconButton
                    class="dropfoto-add-btn"
                    icon="dropfoto-cam"
                    @click="showFileDialog"
                />
            </main>
            <basic-button class="dropfoto-rm-lnk" variant="link" @click="reset"
                >Remove artwork</basic-button
            >
        </section>
        <section
            v-else
            class="dropfoto-upl"
            :class="{ '--highlight': isDraggingOver }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <main class="dropfoto-upl-box">
                <i class="dropfoto-upl-i"></i>
                <div class="dropfoto-upl-msg">
                    <div class="msg-short" v-html="msgShort"></div>
                    <div class="msg-long" v-html="msgLong"></div>
                </div>
            </main>
            <basic-button
                class="dropfoto-add-lnk"
                variant="link"
                @click="showFileDialog"
                >Add artwork</basic-button
            >
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
    name: 'DropFoto',
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
            this.$emit('change', { image: null })
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
            } else {
                this.$toast.error(
                    'Aw snap! Something went wrong, please try again.'
                )
            }
            this.tmp = {
                file: null,
                src: null,
            }
            this.$emit('change', { image: this.image })
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
