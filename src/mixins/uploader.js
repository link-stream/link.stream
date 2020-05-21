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
                src: this.src,
                name: this.filename,
            },
        }
    },
    computed: {
        isFileAdded() {
            return this.file && this.file.src ? true : false
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
                    src: toUrl(base64),
                    name: file.name,
                }
                this.$emit('file-added', {
                    base64,
                    name: file.name,
                })
            } else {
                this.$toast.error('Something went wrong, please try again.')
            }
        },
        removeFile() {
            this.file = null
            this.$emit('file-removed')
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
