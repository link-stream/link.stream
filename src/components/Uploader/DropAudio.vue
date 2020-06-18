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
        <section class="preview-container" v-if="isFileAdded">
            <div class="player-controls">
                <LsButton
                    variant="icon-bg"
                    class="play-btn"
                    @click="handlePlayClick"
                />
            </div>
            <div class="preview-body">
                <slot name="preview-body">
                    <div class="preview-title" v-html="title"></div>
                    <div class="preview-subtitle">{{ file.name }}</div>
                </slot>
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
        </section>
        <section
            v-else
            class="upload-container"
            :class="{ highlight: isDraggingFile }"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <slot name="upload-container">
                <div class="upload-body">
                    <div class="upload-title" v-html="title"></div>
                    <div class="upload-subtitle">No File Added</div>
                </div>
                <i class="upload-icon"></i>
            </slot>
        </section>
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
            this.isFileAdded ? this.loadPlayer() : this.pause()
        },
    },
    mounted() {
        this.initPlayer()
        this.isFileAdded && this.loadPlayer()
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
