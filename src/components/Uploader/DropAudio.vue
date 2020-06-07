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
            player: null,
            playing: false,
        }
    },
    watch: {
        file() {
            if (this.fileAdded) {
                this.loadPlayer()
            } else {
                this.pause()
            }
        },
    },
    created() {
        this.initPlayer()
        this.fileAdded && this.loadPlayer()
    },
    destroyed() {
        this.pause()
    },
    methods: {
        initPlayer() {
            this.player = new Audio()
            this.player.addEventListener('loadstart', this.handleAudioPause)
            this.player.addEventListener('playing', this.handleAudioPlaying)
            this.player.addEventListener('pause', this.handleAudioPause)
            this.player.addEventListener('ended', this.handleAudioPause)
        },
        loadPlayer() {
            this.player.src = this.file.src
            this.player.load()
        },
        play() {
            this.player.play()
        },
        pause() {
            this.playing && this.player.pause()
        },
        handlePlayClick() {
            if (this.playing) {
                this.pause()
            } else {
                this.play()
            }
        },
        handleRemoveClick() {
            this.pause()
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
