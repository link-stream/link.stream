<template>
    <div class="DropImage">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes.join(',')"
            ref="fileInput"
            @change="handleFileSelected"
        />
        <basic-button size="sm" @click="showFileDialog">
            Upload
        </basic-button>
        <DokaModal
            v-if="isFileSelected"
            :src="tmpFile"
            @confirm="handleDokaConfirm"
            @cancel="handleDokaCancel"
        />
    </div>
</template>

<script>
import { uploaderMixin } from '~/mixins/uploader'
import { DokaModal } from 'vue-doka'
import { blobToBase64 } from 'base64-blob'

export default {
    name: 'DropImage',
    mixins: [uploaderMixin],
    components: { DokaModal },
    props: {
        acceptTypes: {
            type: Array,
            default: () => ['.png', '.jpg', '.jpeg'],
        },
    },
    data() {
        return {
            tmpFile: null,
        }
    },
    computed: {
        isFileSelected() {
            return !!this.tmpFile
        },
    },
    methods: {
        showInvalidFileAlert() {
            this.$toast.error(
                `Only ${this.acceptTypes
                    .slice(0, -1)
                    .join(', ')} and ${this.acceptTypes
                    .slice(-1)
                    .join(', ')} images allowed`
            )
        },
        async addFile(file) {
            if (!this.validateFile(file)) {
                this.showInvalidFileAlert()
                return
            }
            const base64 = await blobToBase64(file)
            this.tmpFile = null
            if (base64) {
                this.$emit('add-file', {
                    name: file.name,
                    blob: file,
                    base64,
                })
            } else {
                this.$toast.error('Something went wrong, please try again.')
            }
        },
        handleFileSelected(e) {
            const file = e.target.files[0]
            if (!this.validateFile(file)) {
                this.showInvalidFileAlert()
                return
            }
            this.tmpFile = file
        },
        handleDokaCancel() {
            this.tmpFile = null
        },
        handleDokaConfirm(output) {
            this.addFile(output.file)
        },
    },
}
</script>
