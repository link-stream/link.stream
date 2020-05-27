import { toUrl } from '~/utils'
import { blobToBase64 } from 'base64-blob'

export const uploaderMixin = {
    props: {
        title: {
            type: String,
        },
        src: {
            type: String,
        },
        filename: {
            type: String,
        },
        acceptTypes: {
            type: String,
        },
    },
    data() {
        return {
            isDraggingFile: false,
            file: {
                name: this.filename,
                src: this.src,
            },
        }
    },
    computed: {
        isFileAdded() {
            return this.file.src ? true : false
        },
    },
    watch: {
        src() {
            this.file.src = this.src
        },
        filename() {
            this.file.name = this.filename
        },
    },
    methods: {
        showFileDialog() {
            this.$refs.fileInput.value = null
            this.$refs.fileInput.click()
        },
        async addFile(file) {
            const base64 = await blobToBase64(file)
            if (base64) {
                this.file = {
                    name: file.name,
                    src: toUrl(base64),
                }
                this.$emit('file-add', {
                    name: file.name,
                    base64,
                })
            } else {
                this.$toast.error('Something went wrong, please try again.')
            }
        },
        removeFile() {
            this.file = {
                src: null,
                name: null,
            }
            this.$emit('file-remove')
        },
        handleRemoveClick() {
            this.removeFile()
        },
        handleFileSelected(e) {
            this.addFile(e.target.files[0])
        },
        handleDragEnter(e) {
            e.preventDefault()
            e.stopPropagation()
            this.isDraggingFile = true
        },
        handleDragOver(e) {
            e.preventDefault()
            e.stopPropagation()
            this.isDraggingFile = true
        },
        handleDragLeave(e) {
            e.preventDefault()
            e.stopPropagation()
            this.isDraggingFile = false
        },
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            this.isDraggingFile = false
            this.addFile(e.dataTransfer.files[0])
        },
    },
}