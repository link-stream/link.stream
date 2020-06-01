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
            playing: false,
            player: new Audio(this.src || null),
        }
    },
    watch: {
        file() {
            if (this.file.src) {
                this.player.src = this.file.src
            }
        },
    },
    created() {
        this.player.addEventListener('playing', this.handlePlayerPlaying)
        this.player.addEventListener('pause', this.handlePlayerPause)
        this.player.addEventListener('ended', this.handlePlayerPause)
    },
    destroyed() {
        this.player.pause()
    },
    methods: {
        handlePlayClick() {
            if (this.playing) {
                this.player.pause()
            } else {
                this.player.play()
            }
        },
        handleRemoveClick() {
            this.player.pause()
            this.removeFile()
        },
        handlePlayerPlaying() {
            this.playing = true
        },
        handlePlayerPause() {
            this.playing = false
        },
    },
}
</script>
