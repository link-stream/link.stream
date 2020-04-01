<template>
    <div class="file-dropify">
        <div
            class="drop-area"
            @dragleave="handleDragleave"
            @dragover="handleDragover"
            @dragenter="handleDragenter"
            @click="handleClick"
            @drop="handleChange"
        >
            <font-awesome-icon :icon="['fas', 'cloud-upload-alt']" size="lg" />
            <span>Drag and drop here or browse</span>
            <input type="file" v-show="false" @change="handleChange" v-el:fileinput />
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileDropify',
    props: {
        field: {
            type: String,
            default: 'image',
        },
        key: {
            default: 0,
        },
        value: {
            default: true,
        },
        maxSize: {
            type: Number,
            default: 10240,
        },
        onlyImg: {
            default: true,
        },
    },
    data() {
        const lang = {
            hint: 'Click or drag the file here to upload',
            noSupported: 'Browser is not supported, please use IE10+ or other browsers',
            success: 'Upload success',
            fail: 'Upload failed',
            preview: 'Preview',
            btn: {
                off: 'Cancel',
                close: 'Close',
                back: 'Back',
                save: 'Save',
            },
            error: {
                onlyImg: 'Image only',
                outOfSize: 'Image exceeds size limit: ',
                lowestPx: "Image's size is too low. Expected at least: ",
            },
        }

        return {
            lang,
            hasError: false,
            errorMsg: '',
        }
    },
    methods: {
        handleDragleave(e) {
            e.preventDefault()
        },
        handleDragenter(e) {
            e.preventDefault()
        },
        handleDragover(e) {
            e.preventDefault()
        },
        handleClick(e) {
            if (e.target !== this.$els.fileinput) {
                e.preventDefault()
                if (document.activeElement !== this.$els) {
                    this.$els.fileinput.click()
                }
            }
        },
        handleChange(e) {
            let files = e.target.files
            this.reset()
            if (this.checkFile(files[0])) {
                // TODO: file is selected
            }
        },
        checkFile(file) {
            const that = this
            const { lang, maxSize } = that
            if (file.type.indexOf('image') === -1) {
                that.hasError = true
                that.errorMsg = lang.error.onlyImg
                return false
            }
            if (file.size / 1024 > maxSize) {
                that.hasError = true
                that.errorMsg = lang.error.outOfSize + maxSize + 'kb'
                return false
            }
            return true
        },
    },
}
</script>