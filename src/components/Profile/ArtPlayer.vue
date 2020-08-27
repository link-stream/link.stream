<template>
    <b-container class="art-player" v-if="playerItem">
        <div class="player-progress" @click="seek">
            <div
                class="current-progress"
                :style="`width: ${percentComplete}%`"
            ></div>
        </div>
        <div class="player-container">
            <div class="img-thumb">
                <img :src="playerItem.coverart" />
            </div>
            <div class="control-container">
                <div class="art-info">
                    <div class="title">
                        {{ loading ? 'Loading...' : playerItem.title }}
                    </div>
                    <div class="art-user">
                        {{ playerItem.producer_name }}
                    </div>
                </div>
                <div class="center-control d-none d-md-block">
                    <IconButton
                        class="btn-back"
                        icon="player-back"
                        :disabled="isFirst"
                        @click="goPrev"
                    />
                    <IconButton
                        class="btn-pause"
                        :icon="playing ? 'player-pause' : 'player-play'"
                        @click="playing = !playing"
                        :disabled="playerItem.type === 'pack' || !loaded"
                    />
                    <IconButton
                        class="btn-next"
                        icon="player-next"
                        :disabled="isLast"
                        @click="goNext"
                    />
                </div>
                <div class="right-control">
                    <vue-slider
                        v-if="showVolume"
                        v-model="volume"
                        class="slider-volume"
                        :min="0"
                        :max="100"
                    />
                    <IconButton
                        class="btn-volume d-none d-md-block"
                        icon="volume"
                        @click="showVolume = !showVolume"
                    />
                    <b-dropdown class="actions-menu" variant="icon" dropleft no-caret>
                        <template v-slot:button-content>
                            <Icon icon="dot-menu-v-w" />
                        </template>
                    </b-dropdown>
                    <IconButton
                        class="btn-pause d-md-none"
                        :icon="playing ? 'player-pause' : 'player-play'"
                        @click="playing = !playing"
                        :disabled="playerItem.type === 'pack' || !loaded"
                    />
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>
export default {
    name: 'ArtPlayer',
    props: {
        playerItem: {
            type: Object,
        },
        isFirst: {
            type: Boolean,
        },
        isLast: {
            type: Boolean,
        },
        status: {
            type: Boolean,
        },
        loading: {
            type: Boolean,
        },
    },
    computed: {
        percentComplete() {
            return parseInt(this.currentSeconds / this.durationSeconds * 100)
        },
        muted() {
            return this.volume / 100 === 0
        },
    },
    data: () => ({
        audioObj: null,
        currentSeconds: 0,
        durationSeconds: 0,
        loaded: false,
        playing: false,
        previousVolume: 35,
        showVolume: false,
        volume: 100,
    }),
    watch: {
        playerItem(value) {
            this.playing = false
            if (this.audioObj) {
                this.audioObj.src = value.src
                this.audioObj.load()
            } else {
                this.load(value.src)
            }
        },
        playing(value) {
            if (value) {
                this.audioObj.play()
            } else {
                this.audioObj.pause()
            }
            this.$emit('setStatus', value)
        },
        volume(value) {
            this.audioObj.volume = value / 100
        },
        status(value) {
            this.playing = value
        },
    },
    beforeDestroy() {
        this.audioObj && this.audioObj.pause()
    },
    methods: {
        load(src) {
            this.audioObj = new Audio()
            this.audioObj.addEventListener('timeupdate', this.handleUpdate)
            this.audioObj.addEventListener('loadeddata', this.handleLoaded)
            this.audioObj.addEventListener('playing', this.handlePlaying)
            this.audioObj.addEventListener('pause', this.handlePause)
            this.audioObj.addEventListener('error', this.handleError)
            this.audioObj.addEventListener('ended', this.handleEnded)
            this.audioObj.src = src
            this.audioObj.load()
        },
        goPrev() {
            this.playing = false
            this.$emit('prev')
        },
        goNext() {
            this.playing = false
            this.$emit('next')
        },
        handlePlaying() {
            this.playing = true
        },
        handlePause() {
            this.playing = false
        },
        handleEnded() {
            this.playing = false
        },
        handleError() {
            this.audioObj = null
            this.state = false
        },
        handleLoaded() {
            if (this.audioObj.readyState >= 2) {
                this.loaded = true
                this.durationSeconds = parseInt(this.audioObj.duration)
                this.currentSeconds = 0
            } else {
                this.$toast.error('Failed to fetch audio.')
            }
        },
        handleUpdate() {
            this.currentSeconds = this.audioObj.currentTime
        },
        mute() {
            if (this.muted) {
                this.volume = this.previousVolume
            } else {
                this.previousVolume = this.volume
                this.volume = 0
            }
        },
        seek(e) {
            if (!this.playing || e.target.tagName === 'SPAN') {
                return
            }
            const el = e.target.getBoundingClientRect()
            const seekPos = (e.clientX - el.left) / el.width
            this.audioObj.currentTime = this.audioObj.duration * seekPos
        },
    },
}
</script>
