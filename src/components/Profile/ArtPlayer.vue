<template>
    <b-container fluid class="art-player" v-if="playerItem">
        <div class="player-progress" @click="seek">
            <div class="current-progress" :style="`width: ${percentComplete}%`"></div>
        </div>
        <div class="player-container">
            <div class="img-thumb">
                <img :src="playerItem.coverart" />
            </div>
            <div class="control-container">
                <div class="art-info">
                    <div class="title">
                        {{
                        loading ? 'Loading...' : playerItem.title
                        }}
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
                            <b-dropdown-item @click="handleBuyClick">Buy</b-dropdown-item>
                            <b-dropdown-item @click="handleShareClick">Share</b-dropdown-item>
                        </div>
                    </b-dropdown>
                    <IconButton
                        class="btn-pause d-md-none"
                        :icon="playing ? 'player-pause' : 'player-play'"
                        @click="playing = !playing"
                        :disabled="playerItem.type === 'pack' || loading"
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
        itemId: {
            type: String,
        },
        type: {
            type: String,
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
        user_id: {
            type: String,
        }
    },
    computed: {
        ...mapGetters({
            beats: 'profile/beats',
            profile: 'profile/profile',
            soundKits: 'profile/soundKits',
            beatsLoad: 'profile/beatsLoad',
            soundKitsLoad: 'profile/soundKitsLoad',
        }),
        percentComplete() {
            if (isNaN((this.currentSeconds / this.durationSeconds) * 100)) {
                return 0
            } else {
                return (this.currentSeconds / this.durationSeconds) * 100
            }
        },
        muted() {
            return this.volume / 100 === 0
        },
    },
    data: () => ({
        playerItem: null,
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
        async itemId() {
            this.currentSeconds = 0
            this.durationSeconds = 0
            this.playing = false
            this.pause = false
            const item =
                this.type === 'beat'
                    ? this.beats.find(beats => beats.id === this.itemId)
                    : this.soundKits.find(
                          soundKits => soundKits.id === this.itemId
                      )
            this.playerItem = {
                id: item.id,
                coverart: item.data_image || appConstants.defaultCoverArt,
                title: item.title,
                producer_name: this.profile.display_name,
                src: '',
                type: this.type,
            }
        },
        async playing(value) {
            if (value) {
                if (this.playerItem.src === '') {
                    await this.load()
                }
                this.audioObj.play()
                if (!this.pause) {
                    const params = {
                        id: this.playerItem.id,
                        type: this.playerItem.type,
                        action: 'play',
                        user_id: this.user_id, 
                    }
                    await api.profiles.insertAction(params)
                }
            } else {
                this.pause = true
                this.audioObj.pause()
            }
            this.$emit('setStatus', value)
        },
        volume(value) {
            if (this.audioObj) {
                this.audioObj.volume = value / 100
            }
        },
        status(value) {
            this.playing = value
        },
    },
    beforeDestroy() {
        this.audioObj && this.audioObj.pause()
    },
    methods: {
        async load() {
            this.$store.commit('profile/SET_INDIVIDUAL_LOADING', true)
            this.pause = false
            const item =
                this.type === 'beat'
                    ? this.beatsLoad.find(
                          beatsLoad => beatsLoad.id === this.playerItem.id
                      )
                    : this.soundKitsLoad.find(
                          soundKitsLoad =>
                              soundKitsLoad.id === this.playerItem.id
                      )
            if (item === undefined) {
                const response =
                    this.type === 'beat'
                        ? await api.profiles.getProfileBeatPackById(
                              this.profile.id,
                              this.itemId,
                              this.type
                          )
                        : await api.profiles.getProfileKitById(
                              this.profile.id,
                              this.itemId
                          )
                if (response.status !== 'success' || !response.data.length) {
                    return {}
                }
                const audio = response.data[0]
                if (audio.type === 'beat') {
                    if (audio.data_tagged_file) {
                        this.playerItem.src = audio.data_tagged_file
                    } else if (audio.data_untagged_mp3) {
                        this.playerItem.src = audio.data_untagged_mp3
                    } else if (audio.data_untagged_wav) {
                        this.playerItem.src = audio.data_untagged_wav
                    }
                    this.$store.dispatch(
                        'profile/addPlayerBeat',
                        this.playerItem
                    )
                } else {
                    this.playerItem.src = audio.data_tagged_file
                    this.$store.dispatch(
                        'profile/addPlayerSoundKit',
                        this.playerItem
                    )
                }
            } else {
                this.playerItem.src = item.src
            }

            this.audioObj = new Audio()
            this.audioObj.src = this.playerItem.src
            this.audioObj.addEventListener('timeupdate', this.handleUpdate)
            this.audioObj.addEventListener('loadeddata', this.handleLoaded)
            this.audioObj.addEventListener('durationchange', this.handleDuration)
            this.audioObj.addEventListener('loadedmetadata', this.handleMetadata)
            this.audioObj.addEventListener('playing', this.handlePlaying)
            this.audioObj.addEventListener('pause', this.handlePause)
            this.audioObj.addEventListener('error', this.handleError)
            this.audioObj.addEventListener('ended', this.handleEnded)  
            this.audioObj.volume = this.volume / 100   
            this.audioObj.load()           
            this.$store.commit('profile/SET_INDIVIDUAL_LOADING', false)
        },
        goPrev() {
            this.playing = false
            this.pause = false
            this.$emit('prev')
        },
        goNext() {
            this.playing = false
            this.pause = false
            this.$emit('next')
        },
        handlePlaying() {
            this.playing = true
        },
        handlePause() {
            this.playing = false
        },
        async handleEnded() {
            if (!this.isLast) {
                await this.goNext()
                this.playing = true
            } else {
                this.playing = false
                this.pause = false
                this.$store.commit('profile/SET_STARTOVER', true)
            }
        },
        handleError() {
            this.audioObj = null
            this.state = false
        },
        handleLoaded() {
            if (this.audioObj.readyState >= 2) {
                this.loaded = true
                this.currentSeconds = 0
            } else {
                this.$toast.error('Failed to fetch audio.')
            }
        },
        handleDuration() {
            if (this.audioObj.duration !== 'Infinity') {
                this.durationSeconds = this.audioObj.duration
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
            if (this.audioObj) {
                if (!this.playing || e.target.tagName === 'SPAN') {
                    return
                }
                const el = e.target.getBoundingClientRect()
                const seekPos = (e.clientX - el.left) / el.width
                this.audioObj.currentTime = this.audioObj.duration * seekPos
            }
        },
    },
}
</script>
