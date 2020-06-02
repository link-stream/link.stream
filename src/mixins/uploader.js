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
            type: Array,
            default() {
                return []
            },
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
        fileAdded() {
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
        showInvalidFileAlert() {
            this.$alert.oops(
               `Only ${this.acceptTypes
                    .slice(0, -1)
                    .join(', ')} and ${this.acceptTypes
                    .slice(-1)
                    .join(', ')} files allowed`,
            )
        },
        showFileDialog() {
            this.$refs.fileInput.value = null
            this.$refs.fileInput.click()
        },
        validateFile(file) {
            const acceptTypes = this.acceptTypes
            if (acceptTypes.indexOf(file.type) !== -1) {
                return true
            }
            const extIndex = file.name.lastIndexOf('.')
            if (extIndex === -1) {
                return false
            }
            const ext = file.name.substr(extIndex)
            return acceptTypes.indexOf(ext) !== -1
        },
        async addFile(file) {
            if (!this.validateFile(file)) {
                this.showInvalidFileAlert()
                return
            }
            const base64 = await blobToBase64(file)
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
