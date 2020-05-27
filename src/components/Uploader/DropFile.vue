<template>
    <div class="drop-file">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <div class="d__prv" v-if="isFileAdded">
            <div class="flex-item">
                <div class="d__title" v-html="title"></div>
                <div class="d__filename">{{ file.name }}</div>
            </div>
            <div class="flex-item">
                <ls-button variant="link" @click="handleRemoveClick">
                    Remove File
                </ls-button>
            </div>
        </div>

        <div
            v-else
            class="d__upl"
            :class="{ '--highlight': isDraggingFile }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <div class="flex-item">
                <div class="d__title" v-html="title"></div>
                <div class="d__filename">No File Added</div>
            </div>
            <LsIcon class="flex-item" icon="cloud-upload-lg" />
        </div>
    </div>
</template>

<script>
import { uploaderMixin } from '~/mixins/uploader'

export default {
    name: 'DropFile',
    mixins: [uploaderMixin],
}
</script>
