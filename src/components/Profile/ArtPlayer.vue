<template>
    <b-container class="art-player" v-if="playerItem">
        <div class="player-progress">
            <div class="current-progress" style="width:30%"></div>
        </div>
        <div class="player-container">
            <div class="img-thumb">
                <img :src="playerItem.coverart" />
            </div>
            <div class="control-container">
                <div class="art-info">
                    <div class="title">
                        {{ playerItem.title }}
                    </div>
                    <div class="art-user">
                        {{ profile.display_name }}
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
                        @click="handlePlayClick"
                        :disabled="playerItem.type === 'pack' || loading"
                    />
                    <IconButton
                        class="btn-next"
                        icon="player-next"
                        :disabled="isLast"
                        @click="goNext"
                    />
                </div>
                <div class="right-control">
                    <IconButton
                        class="btn-volume d-none d-md-block"
                        icon="volume"
                    />
                    <b-dropdown class="actions-menu" variant="icon" dropleft no-caret>
                        <template v-slot:button-content>
                            <Icon icon="dot-menu-v-w" />
                        </template>
                    </b-dropdown>
                    <IconButton
                        class="btn-pause d-md-none"
                        icon="player-pause"
                    />
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { api } from '@/services/api'

const STATE_PAUSED = 'paused'
const STATE_PLAYING = 'playing'
const STATE_LOADING = 'loading'

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
    },
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
        }),
        src() {
            let srcAudio = null
            if (this.playerItem.type === 'beat') {
                if (this.playerItem.tagged_file) {
                    srcAudio = this.playerItem.tagged_file
                } else if (this.playerItem.untagged_mp3) {
                    srcAudio = this.playerItem.untagged_mp3
                } else if (this.playerItem.untagged_wav) {
                    srcAudio = this.playerItem.untagged_wav
                }
            }
            return srcAudio
        },
        playing() {
            return this.state === STATE_PLAYING
        },
        loading() {
            return this.state === STATE_LOADING
        },
    },
    data: () => ({
        state: STATE_PAUSED,
        audioObj: null,
    }),
    watch: {
        playerItem() {
            if (this.playerItem.type === 'pack') {
                this.playStatus = false
            }
        },
        playing(value) {
            this.$emit('setStatus', value)
        }
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
                console.log(this.src)
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
            }
        },
        goPrev() {
            this.$emit('prev')
        },
        goNext() {
            this.$emit('next')
        },
        handlePlaying() {
            this.state = STATE_PLAYING
        },
        handlePause() {
            this.state = STATE_PAUSED
        },
        handleEnded() {
            this.state = STATE_PAUSED
        },
        handleError() {
            this.audioObj = null
            this.state = STATE_PAUSED
        },
    }
}
</script>