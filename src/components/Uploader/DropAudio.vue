<template>
    <div class="dropaud">
        <input
            type="file"
            v-show="false"
            :accept="allowedTypes"
            ref="fileinput"
            @change="handleFileSelected"
        />

        <div
            class="da-upload"
            :class="{ '--highlight': draggingOver }"
            v-if="!fileAdded"
            @drop="handleDrop"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @click="showFileDialog"
        >
            <div class="flx-item">
                <div class="da-title" v-html="title"></div>
                <div class="da-filename">No File Added</div>
            </div>
            <LsIcon class="flx-item" icon="cloud-upload-lg" />
        </div>

        <div class="da-preview" v-else>
            <div class="flx-item">
                <ls-button-icon @click="playPause">
                    <i
                        class="fa fa-3x"
                        :class="playing ? 'fa-pause' : 'fa-play'"
                    ></i>
                </ls-button-icon>
            </div>
            <div class="flx-item">
                <div class="da-title" v-html="title"></div>
                <div class="da-filename">{{ fileName }}</div>
                <audio
                    controls
                    controlsList="nodownload"
                    ref="player"
                    @playing="handlePlayerPlaying"
                    @pause="handlePlayerPause"
                >
                    <source :src="fileSrc" :type="fileType" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div class="flx-item">
                <ls-button variant="link" @click="removeFile">
                    Remove File
                </ls-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropAudio',
    props: {
        title: {
            type: String,
            default: '',
        },
        allowedTypes: {
            type: String,
            default: 'audio/wav,audio/mpeg',
        },
    },
    data() {
        return {
            file: null,
            draggingOver: false,
            playing: false,
        }
    },
    computed: {
        fileAdded() {
            return this.file ? true : false
        },
        fileName() {
            return this.file ? this.file.name : null
        },
        fileType() {
            return this.file ? this.file.type : null
        },
        fileSrc() {
            return this.file ? URL.createObjectURL(this.file) : null
        },
    },
    methods: {
        showFileDialog() {
            this.$refs.fileinput.value = null
            this.$refs.fileinput.click()
        },
        removeFile() {
            this.file = null
            this.playing = false
        },
        playPause() {
            const player = this.$refs.player
            this.playing ? player.pause() : player.play()
        },
        handlePlayerPlaying() {
            this.playing = true
        },
        handlePlayerPause() {
            this.playing = false
        },
        handleDragEnter(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = true
        },
        handleDragOver(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = true
        },
        handleDragLeave(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = false
        },
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            this.draggingOver = false
            this.file = e.dataTransfer.files[0]
        },
        handleFileSelected(e) {
            this.file = e.target.files[0]
        },
    },
}
</script>
