<template>
    <b-modal modal-class="ShareArtModal" v-model="open" centered size="lg" hide-footer>
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="$emit('close')" />
            <h2>Share this {{ shareData.type }}</h2>
        </template>
        <template v-slot:default>
            <div class="Card">
                <div class="item-cover">
                    <img :src="shareData.coverart" :alt="shareData.title" />
                </div>
                <div class="item-body ml-4">
                    <h4 class="item-title">{{ shareData.title }}</h4>
                    <small class="item-subtitle">
                        {{ shareData.type }}
                        from
                        {{ shareData.user_name }}
                    </small>
                </div>
            </div>
            <div class="social-share-links">
                <a href="#" v-show="false">
                    <i class="fab fa-instagram-square"></i>
                </a>
                <ShareNetwork
                    network="facebook"
                    :url="shareData.shareUrl"
                    :title="shareData.title"
                    :description="
                        `${shareData.type} from ${shareData.user_name}`
                    "
                    quote
                    hashtags
                >
                    <i class="fab fa-facebook-square"></i>
                </ShareNetwork>
                <ShareNetwork
                    network="twitter"
                    :url="shareData.shareUrl"
                    :title="shareData.title"
                    :twitter-user="`${shareData.user_name}`"
                    hashtags
                >
                    <i class="fab fa-twitter-square"></i>
                </ShareNetwork>
                <ShareNetwork
                    network="telegram"
                    :url="shareData.shareUrl"
                    :title="shareData.title"
                    description
                >
                    <i class="fas fa-paper-plane"></i>
                </ShareNetwork>
            </div>
            <b-input-group>
                <template v-slot:append>
                    <b-button
                        squared
                        class="share-copy-btn float-right"
                        variant="grey"
                        @click="copyToClipboard"
                    >
                        <img src="@/assets/img/ico/link.svg" />
                    </b-button>
                </template>
                <b-form-input v-model="shareData.shareUrl" id="share-link" readonly />
            </b-input-group>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ShareArtModal',
    data: () => ({
        open: false,
        curItem: null,
        baseUrl: '',
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
                    subTypeURL = 'beat-packs'
                    break
                case 'kit':
                    typeString = 'Sounf Kit'
                    subTypeURL = 'kits'
                    break
                case 'video':
                    typeString = 'Video'
                    subTypeURL = this.curItem.url
            }
            return {
                ...this.curItem,
                type: typeString,
                user_name: this.profile
                    ? this.profile.display_name
                    : this.curItem.display_name,
                shareUrl:
                    this.curItem.type !== 'video'
                        ? `${this.baseUrl}/${
                              this.profile ? this.profile.url : this.curItem.url
                          }/${subTypeURL}/${this.curItem.id}`
                        : subTypeURL,
            }
        },
    },
    created() {
        const getUrl = window.location
        this.baseUrl = getUrl.protocol + '//' + getUrl.host
        this.$bus.$on('modal.share.open', payload => {
            this.curItem = payload
            this.open = true
        })
        this.$bus.$on('modal.share.close', this.close)
    },
    methods: {
        copyToClipboard() {
            const toCopy = document.querySelector('#share-link')
            toCopy.setAttribute('type', 'text')
            toCopy.select()
            document.execCommand('copy')
        },
        close() {
            this.open = false
        },
    },
}
</script>
