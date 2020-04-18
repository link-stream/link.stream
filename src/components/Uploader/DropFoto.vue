<template>
    <div class="dropfoto">
        <input
            type="file"
            v-show="false"
            :accept="allowedTypes"
            ref="fileinput"
            @change="handleFileInputChange"
        />
        <section class="dropfoto__preview" v-if="isPreview">
            <div class="dropfoto__imgwrap">
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
                <div class="dropfoto__dropmsg">
                    Drag thumbnail image here or
                    <basic-button variant="link">browse</basic-button>
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
import { DokaModal, toURL } from 'vue-doka'
import { IconButton, BasicButton } from '~/components/Button'
import { Icon } from '~/components/Icon'

export default {
    name: 'DropFoto',
    components: { DokaModal, BasicButton, Icon, IconButton },
    data() {
        return {
            isDraggingOver: false,
            allowedTypes: 'image/*',
            image: {
                file: null,
                src: null,
            },
            tmp: {
                file: null,
                src: null,
            },
        }
    },
    computed: {
        isInitial() {
            return !this.image.file && !this.image.src
        },
        isEdit() {
            return this.tmp.file && this.tmp.src
        },
        isPreview() {
            return this.image.file && this.image.src
        },
    },
    methods: {
        reset() {
            this.image = {
                file: null,
                src: null,
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
                this.tmp.file = file
                this.tmp.src = toURL(file)
                this.isDraggingOver = false
            }
        },
        handleFileInputChange(e) {
            const file = e.target.files[0]
            this.tmp.file = file
            this.tmp.src = toURL(file)
        },
        handleDokaConfirm(output) {
            const file = output.file
            this.image.file = file
            this.image.src = toURL(file)
            this.tmp.file = null
            this.tmp.src = null
            this.$emit('change', { image: this.image })
        },
        handleDokaCancel() {
            this.tmp.file = null
            this.tmp.src = null
        },
    },
}
</script>