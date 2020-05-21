<template>
    <div class="drop-file">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <div class="df-preview" v-if="isFileAdded">
            <div class="flx-item">
                <div class="df-title" v-html="title"></div>
                <div class="df-filename">{{ file.name }}</div>
            </div>
            <div class="flx-item">
                <ls-button variant="link" @click="handleRemoveClick">
                    Remove File
                </ls-button>
            </div>
        </div>

        <div
            v-else
            class="df-upload"
            :class="{ '--highlight': isDraggingFile }"
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
    </div>
</template>

<script>
import { uploaderMixin } from '~/mixins/uploader'

export default {
    name: 'DropFile',
    mixins: [uploaderMixin],
}
</script>
