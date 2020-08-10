<template>
    <b-modal
        modal-class="ShareArtModal"
        v-model="open"
        centered
        size="lg"
        hide-footer
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h2>Share this Beat</h2>
        </template>
        <template v-slot:default>
            <div class="Card">
                <div class="item-cover">
                    <img :src="beat.coverart" :alt="beat.title" />
                </div>
                <MiniAudioPlayer :src="beat.src" />
                <div class="item-body">
                    <h4 class="item-title">
                        {{ beat.title }}
                    </h4>
                    <small class="item-subtitle">
                        {{ beat.type }}
                        from
                        {{ beat.user_name }}
                    </small>
                </div>
            </div>
            <div class="social-share-links">
                <a href="#">
                    <i class="fab fa-instagram-square"></i>
                </a>
                <a href="#">
                    <i class="fab fa-facebook-square"></i>
                </a>
                <a href="#">
                    <i class="fab fa-twitter-square"></i>
                </a>
                <a href="#">
                    <i class="fas fa-paper-plane"></i>
                    <!-- <img src="@/assets/img/ico/mail.svg" /> -->
                </a>
            </div>
            <b-input-group>
                <template v-slot:append>
                    <b-input-group-text>
                        <img src="@/assets/img/ico/link.svg" />
                    </b-input-group-text>
                </template>
                <b-form-input v-model="beat.url" />
            </b-input-group>
        </template>
    </b-modal>
</template>

<script>
import { MiniAudioPlayer } from '~/components/Player'
export default {
    name: 'ShareArtModal',
    components: {
        MiniAudioPlayer,
    },
    data() {
        return {
            open: false,
            beat: {
                id: 1,
                title: 'Beat Title',
                type: 'Beat',
                user_name: 'Alyssa Tucker',
                coverart: '/static/img/profile/Spaceman-Bitmap.jpg',
                src: '',
                url: 'https://link.stream/alyssa-tucker/beat-title',
            },
        }
    },
    created() {
        this.$bus.$on('modal.shareArt.open', this.handleOpen)
        this.$bus.$on('modal.shareArt.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
    },
}
</script>
