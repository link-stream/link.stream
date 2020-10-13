<template>
    <b-container fluid class="art-player" v-if="playerItem">
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
                    <div class="art-user">{{ playerItem.producer_name }}</div>
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
                    <b-dropdown
                        class="actions-menu d-none d-md-block"
                        variant="icon"
                        dropup
                        no-caret
                    >
                        <template v-slot:button-content>
                            <Icon icon="dot-menu-v-w" />
                        </template>
                        <div style="line-height: 1.5">
                            <b-dropdown-item
                                :to="
                                    playerItem.type === 'beat'
                                        ? {
                                              name: 'profileBeatDetails',
                                              params: {
                                                  beatId: playerItem.id,
                                              },
                                          }
                                        : {
                                              name: 'profileKitDetails',
                                              params: { kitId: playerItem.id },
                                          }
                                "
                                target="_blank"
                            >
                                {{
                                    playerItem.type === 'beat'
                                        ? 'Go to Beat'
                                        : 'Go to Sound Kit'
                                }}
                            </b-dropdown-item>
                            <b-dropdown-item @click="handleBuyClick"
                                >Buy</b-dropdown-item
                            >
                            <b-dropdown-item @click="handleShareClick"
                                >Share</b-dropdown-item
                            >
                        </div>
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
import { api } from '~/services'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
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
        ...mapGetters({
            beats: 'profile/beats',
            soundKits: 'profile/soundKits',
        }),
        percentComplete() {
            return parseInt((this.currentSeconds / this.durationSeconds) * 100)
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
        pause: false,
    }),
    watch: {
        playerItem(value) {
            this.playing = false
            this.pause = false
            if (this.audioObj) {
                this.audioObj.src = value.src
                this.audioObj.load()
            } else {
                this.load(value.src)
            }
        },
        async playing(value) {
            if (value) {
                this.audioObj.play()
                if (!this.pause) {
                    const params = {
                        audio_id: this.playerItem.id,
                        audio_type: this.playerItem.type,
                        action: 'play',
                    }
                    await api.profiles.insertAudioAction(params)
                }
            } else {
                this.pause = true
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
        handleBuyClick() {
            if (this.playerItem.type === 'beat') {
                let buyItem = this.beats.find(
                    beats => beats.id === this.playerItem.id
                )
                this.$bus.$emit('modal.buyLicense.open', buyItem)
            } else {
                let buyItem = this.soundKits.find(
                    soundKits => soundKits.id === this.playerItem.id
                )
                var listItems = []
                listItems =
                    Cookies.getJSON(appConstants.cookies.cartItem.name) ===
                    undefined
                        ? []
                        : Cookies.getJSON(appConstants.cookies.cartItem.name)

                listItems.push(buyItem)

                Cookies.set(appConstants.cookies.cartItem.name, listItems)
                /*this.$store.dispatch('profile/addCartItem', {
                    ...buyItem,
                })*/
                this.$bus.$emit('modal.addedCart.open')
            }
        },
        handleShareClick() {
            let shareItem = null
            if (this.playerItem.type === 'beat') {
                shareItem = this.beats.find(
                    beats => beats.id === this.playerItem.id
                )
            } else {
                shareItem = this.soundKits.find(
                    soundKits => soundKits.id === this.playerItem.id
                )
                shareItem.type = 'kit'
            }
            this.$bus.$emit('modal.share.open', shareItem)
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
