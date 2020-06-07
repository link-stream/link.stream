<template>
    <div
        class="DropAudio DropFile"
        :class="{
            'is-playing': playing,
        }"
    >
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes.join(',')"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <div class="preview" v-if="fileAdded">
            <div class="player-controls">
                <LsButton
                    variant="icon-bg"
                    class="play-btn"
                    @click="handlePlayClick"
                />
            </div>
            <div class="file-info">
                <div class="file-desc" v-html="title"></div>
                <div class="file-name">{{ file.name }}</div>
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
    name: 'DropAudio',
    mixins: [uploaderMixin],
    props: {
        acceptTypes: {
            type: Array,
            default() {
                return ['.wav', '.mp3']
            },
        },
    },
    data() {
        return {
            audioObject: null,
            playing: false,
        }
    },
    watch: {
        file() {
            if (this.fileAdded) {
                this.loadAudio()
            } else {
                this.pauseAudio()
            }
        },
    },
    created() {
        this.audioObject = new Audio()
        this.audioObject.addEventListener('loadstart', this.handleAudioPause)
        this.audioObject.addEventListener('playing', this.handleAudioPlaying)
        this.audioObject.addEventListener('pause', this.handleAudioPause)
        this.audioObject.addEventListener('ended', this.handleAudioPause)
        this.fileAdded && this.loadAudio()
    },
    destroyed() {
        this.pauseAudio()
    },
    methods: {
        loadAudio() {
            this.audioObject.src = this.file.src
            this.audioObject.load()
        },
        playAudio() {
            this.audioObject.play()
        },
        pauseAudio() {
            this.playing && this.audioObject.pause()
        },
        handlePlayClick() {
            if (this.playing) {
                this.pauseAudio()
            } else {
                this.playAudio()
            }
        },
        handleRemoveClick() {
            this.pauseAudio()
            this.removeFile()
        },
        handleAudioPlaying() {
            this.playing = true
        },
        handleAudioPause() {
            this.playing = false
        },
    },
}
</script>
