<template>
    <div class="DropFile">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes.join(',')"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <div class="preview-container" v-if="isFileAdded">
            <div class="preview-body">
                <div class="preview-title" v-html="title"></div>
                <div class="preview-subtitle">{{
                    file.name | truncate(200)
                }}</div>
            </div>
            <div class="preview-controls">
                <ls-button
                    class="file-remove-btn"
                    variant="link"
                    @click="handleRemoveClick"
                >
                    Remove File
                </ls-button>
                <b-dropdown
                    class="preview-dropdown"
                    variant="icon"
                    dropleft
                    no-caret
                >
                    <template v-slot:button-content>
                        <LsIcon icon="dot-menu-v" />
                    </template>
                    <b-dropdown-item @click="showFileDialog">
                        Replace File
                    </b-dropdown-item>
                    <b-dropdown-item @click="handleRemoveClick">
                        Remove File
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>

        <div
            v-else
            class="upload-container"
            :class="{ highlight: isDraggingFile }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <slot name="upload-container" :showFileDialog="showFileDialog">
                <div class="upload-body">
                    <div class="upload-title" v-html="title"></div>
                    <div class="upload-subtitle">No File Added</div>
                </div>
                <i class="upload-icon"></i>
            </slot>
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
