<template>
    <div class="drop-audio">
        <input
            type="file"
            v-show="false"
            :accept="acceptTypes"
            ref="fileInput"
            @change="handleFileSelected"
        />

        <div class="d__prv" v-if="isFileAdded">
            <div class="flex-item">
                <ls-icon-button @click="handlePlayClick">
                    <i
                        class="fa fa-3x"
                        :class="isPlaying ? 'fa-pause' : 'fa-play'"
                    ></i>
                </ls-icon-button>
            </div>
            <div class="flex-item">
                <div class="d__title" v-html="title"></div>
                <div class="d__filename">{{ file.name }}</div>
                <audio
                    controls
                    controlsList="nodownload"
                    ref="player"
                    @playing="handlePlayerPlaying"
                    @pause="handlePlayerPause"
                >
                    <source :src="file.src" />
                    Your browser does not support the audio element.
                </audio>
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
    name: 'DropAudio',
    mixins: [uploaderMixin],
    props: {
        acceptTypes: {
            type: String,
            default: 'audio/wav,audio/mpeg',
        },
    },
    data() {
        return {
            isPlaying: false,
        }
    },
    methods: {
        handlePlayClick() {
            const player = this.$refs.player
            this.isPlaying ? player.pause() : player.play()
        },
        handleRemoveClick() {
            this.isPlaying = false
            this.removeFile()
        },
        handlePlayerPlaying() {
            this.isPlaying = true
        },
        handlePlayerPause() {
            this.isPlaying = false
        },
    },
}
</script>
