<template>
    <b-modal
        modal-class="ShareArtModal"
        v-model="open"
        centered
        size="lg"
        hide-footer
    >
        <template v-slot:modal-header>
            <BasicButton
                variant="icon"
                class="modal-close"
                @click="$emit('close')"
            />
            <h2>Share this {{ shareData.type }}</h2>
        </template>
        <template v-slot:default>
            <div class="Card">
                <div class="item-cover">
                    <img :src="shareData.coverart" :alt="shareData.title" />
                </div>
                <MiniAudioPlayer :src="shareData.src" />
                <div class="item-body">
                    <h4 class="item-title">
                        {{ shareData.title }}
                    </h4>
                    <small class="item-subtitle">
                        {{ shareData.type }}
                        from
                        {{ shareData.user_name }}
                    </small>
                </div>
            </div>
            <div class="social-share-links">
                <a href="#">
                   <i class="fab fa-instagram-square"></i> 
                </a>
                <ShareNetwork
                    network="facebook"
                    :url="shareData.shareUrl"
                    :title="shareData.title"
                    :description="`${shareData.type} from ${shareData.user_name}`"
                    quote=""
                    hashtags=""
                >
                    <i class="fab fa-facebook-square"></i>
                </ShareNetwork>
                
                <ShareNetwork
                    network="twitter"
                    :url="shareData.shareUrl"
                    :title="shareData.title"
                    :twitter-user="`${shareData.user_name}`"
                    hashtags=""
                >
                    <i class="fab fa-twitter-square"></i>
                </ShareNetwork>
                <ShareNetwork
                    network="telegram"
                    :url="shareData.shareUrl"
                    :title="shareData.title"
                    description=""
                >
                    <i class="fas fa-paper-plane"></i>
                    <!-- <img src="@/assets/img/ico/mail.svg" /> -->
                </ShareNetwork>
            </div>
            <b-input-group>
                <template v-slot:append>
                    <b-input-group-text>
                        <img src="@/assets/img/ico/link.svg" />
                    </b-input-group-text>
                </template>
                <b-form-input v-model="shareData.shareUrl" />
            </b-input-group>
        </template>
    </b-modal>
</template>

<script>
import { MiniAudioPlayer } from '~/components/Player'
import { mapGetters } from 'vuex'
import { appConstants } from '~/constants'
export default {
    name: 'ShareArtModal',
    components: {
        MiniAudioPlayer,
    },
    props: {
        curItem: {
            type: Object,
        },
    },
    data: () => ({
        open: true,
    }),
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
        }),
        shareData() {
            let typeString = null
            let subTypeURL = null
            switch (this.curItem.type) {
                case 'beat':
                    typeString = 'Beat'
                    subTypeURL = 'beats'
                    break
                case 'pack':
                    typeString = 'Beat Pack'
                    subTypeURL = 'beats'
                    break
                case 'kit':
                    typeString = 'Sounf Kit'
                    subTypeURL = 'kits'
                    break
                case 'video':
                    typeString = "Video"
                    subTypeURL = 'videos'
            }
            console.log(this.curItem)
            return {
                ...this.curItem,
                type: typeString,
                user_name: this.profile.display_name,
                shareUrl: `${appConstants.baseAppUrl}${this.profile.url}/${subTypeURL}/${this.curItem.id}`,
            }
        },
    },
    created() {},
    methods: {
        close() {
            this.$emit('close')
        },
    },
}
</script>
