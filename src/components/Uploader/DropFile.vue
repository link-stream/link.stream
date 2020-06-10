<template>
    <div class="DropFile">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes.join(',')"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <div class="preview" v-if="isFileAdded">
            <div class="file-info">
                <div class="file-desc" v-html="title"></div>
                <div class="file-name">{{ file.name | truncate(200) }}</div>
            </div>
            <div class="file-controls">
                <ls-button
                    class="file-remove-btn"
                    variant="link"
                    @click="handleRemoveClick"
                >
                    Remove File
                </ls-button>
                <b-dropdown class="file-menu" variant="icon" dropleft no-caret>
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
            class="upload"
            :class="{ highlight: isDraggingFile }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <div class="file-info">
                <div class="file-desc" v-html="title"></div>
                <div class="file-name">No File Added</div>
            </div>
            <i class="upload-icon"></i>
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
