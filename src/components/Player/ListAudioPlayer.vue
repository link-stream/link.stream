<template>
    <div
        class="MiniAudioPlayer list-player"
        :class="{
            'is-playing': playing,
            'is-loading': loading,
        }"
    >
        <span class="player-spinner spinner-border"></span>
        <LoadingSpinner v-if="src === null" class="center-img mt-4" animation="bounce-small" />
        <b-icon
            v-else
            :icon="playing ? 'pause-fill' : 'play-fill'"
            font-scale="2"
            class="btn-play"
            :disabled="loading"
            @click="handlePlayClick"
        />
    </div>
</template>

<script>
import { api } from '~/services/api'

const STATE_PAUSED = 'paused'
const STATE_PLAYING = 'playing'
const STATE_LOADING = 'loading'

export default {
    name: 'ListAudioPlayer',
    props: {
        src: {
            type: String,
        },
        type: {
            type: String,
        },
        id: {
            type: String,
        },
    },
    data() {
        return {
            audioObj: null,
            state: STATE_PAUSED,
            pause: false,
        }
    },
    computed: {
        playing() {
            return this.state === STATE_PLAYING
        },
        loading() {
            return this.state === STATE_LOADING
        },
    },
    beforeDestroy() {
        this.audioObj && this.audioObj.pause()
    },
    methods: {
        load(src) {
            this.audioObj = new Audio()
            this.audioObj.addEventListener('playing', this.handlePlaying)
            this.audioObj.addEventListener('pause', this.handlePause)
            this.audioObj.addEventListener('error', this.handleError)
            this.audioObj.addEventListener('ended', this.handleEnded)
            this.audioObj.src = src
            this.audioObj.load()
        },
        async handlePlayClick() {
            if (!this.src) {
                this.$toast.error('No source provided.')
                return
            }

            if (!this.audioObj) {
                if (this.src.charAt(0) === '/') {
                    this.state = STATE_LOADING
                    const { status, data } = await api.call({
                        endpoint: this.src,
                        showProgress: false,
                    })
                    if (status === 'success') {
                        this.load(data.audio)
                    } else {
                        this.state = STATE_PAUSED
                        this.$toast.error('Failed to fetch audio.')
                        return
                    }
                } else {
                    // Base64 audio
                    this.load(this.src)
                }
            }

            if (this.playing) {
                this.audioObj.pause()
            } else {
                this.audioObj
                    .play()
                    .then(() => {})
                    .catch(e => {
                        this.$toast.error(e.message)
                    })
                if (!this.pause) {
                    const params = {
                        id: this.id,
                        type: this.type,
                        action: 'play',
                    }
                    await api.profiles.insertAction(params)
                }
            }
        },
        handlePlaying() {
            this.state = STATE_PLAYING
        },
        handlePause() {
            this.state = STATE_PAUSED
            this.pause = true
        },
        handleEnded() {
            this.state = STATE_PAUSED
            this.pause = false
        },
        handleError() {
            this.audioObj = null
            this.state = STATE_PAUSED
        },
    },
}
</script>
