<template>
    <div class="dropfoto">
        <input
            type="file"
            v-show="false"
            :accept="allowedTypes"
            ref="fileinput"
            @change="handleFileInputChange"
        />
        <section v-if="isPreview">
            <div class="dropfoto__preview">
                <img class="dropfoto__img" :src="image.src" alt />
                <IconButton class="dropfoto__removebtn" icon="drop-foto-remove" @click="reset" />
                <IconButton class="dropfoto__addbtn" icon="drop-foto-add" @click="openFileDialog" />
            </div>
            <basic-button class="dropfoto__removelink" variant="link" @click="reset">Remove artwork</basic-button>
        </section>
        <section
            v-else
            class="dropfoto__dropbox"
            :class="{'is-highlight': isDraggingOver}"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="openFileDialog"
        >
            <div>
                <Icon icon="drop-foto-add-lg" />
                <div class="dropfoto__droptxt">
                    Drag thumbnail image here or
                    <span class="text-primary-underline">browse</span>
                </div>
            </div>
        </section>

        <DokaModal
            crop-aspect-ratio="1"
            :src="tmp.src"
            v-if="isEdit"
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
    data() {
        return {
            allowedTypes: 'image/*',
            isDraggingOver: false,
            image: {
                file: null,
                src: null,
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
            return !this.image.file
        },
        isEdit() {
            return this.tmp.file
        },
        isPreview() {
            return this.image.file
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
        openFileDialog() {
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