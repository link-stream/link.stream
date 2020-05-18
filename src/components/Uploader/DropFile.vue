<template>
    <div class="drop-file">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileinput"
            @change="handleFileSelected"
        />

        <div
            class="df-upload"
            :class="{ '--highlight': draggingOver }"
            v-if="!fileAdded"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <div class="flx-item">
                <div class="df-title" v-html="title"></div>
                <div class="df-filename">No File Added</div>
            </div>
            <LsIcon class="flx-item" icon="cloud-upload-lg" />
        </div>

        <div class="df-preview" v-else>
            <div class="flx-item">
                <div class="df-title" v-html="title"></div>
                <div class="df-filename">{{ fileName }}</div>
            </div>
            <div class="flx-item">
                <ls-button variant="link" @click="removeFile">
                    Remove File
                </ls-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropFile',
    props: {
        title: {
            type: String,
            default: '',
        },
        acceptTypes: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            file: null,
            draggingOver: false,
        }
    },
    computed: {
        fileAdded() {
            return this.file ? true : false
        },
        fileName() {
            return this.file ? this.file.name : null
        },
    },
    methods: {
        showFileDialog() {
            this.$refs.fileinput.value = null
            this.$refs.fileinput.click()
        },
        removeFile() {
            this.file = null
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
            this.draggingOver = false
            this.file = e.dataTransfer.files[0]
        },
        handleFileSelected(e) {
            this.file = e.target.files[0]
        },
    },
}
</script>
