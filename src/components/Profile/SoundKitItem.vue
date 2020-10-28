<template>
    <div class="art-item">
        <a
            href="#"
            class="img-container"
            @click.prevent="$emit('select', index)"
        >
            <img :src="artItem.coverart" />
            <LoadingSpinner
                v-if="selected && individualLoading"
                class="center-img"
                animation="bounce"
            />
            <img
                v-if="selected && !individualLoading && status"
                src="@/assets/img/ico/pause-red.svg"
                class="center-img"
            />
            <img
                v-if="selected && !individualLoading && !status"
                src="@/assets/img/ico/play-red.svg"
                class="center-img"
            />
        </a>
        <router-link
            class="art-desc"
            :to="{
                name: 'profileKitDetails',
                params: { kitId: artItem.id },
            }"
            target="_blank"
        >
            <div class="title">{{ artItem.title }}</div>
            <div class="price">{{ artItem.price | currencyFormat }}</div>
            <div v-if="artItem.bogo" class="bogo">BOGO</div>
        </router-link>
        <b-dropdown
            class="actions-menu d-none d-md-block"
            variant="icon"
            right
            no-caret
        >
            <template v-slot:button-content>
                <Icon icon="dot-menu-v-s" />
            </template>
            <b-dropdown-item
                :to="{
                    name: 'profileKitDetails',
                    params: { kitId: artItem.id },
                }"
                target="_blank"
                >Go to Sound Kit</b-dropdown-item
            >
            <b-dropdown-item v-show="false">Save</b-dropdown-item>
            <b-dropdown-item @click="handleShareClick">Share</b-dropdown-item>
            <b-dropdown-item v-show="false">Free Download</b-dropdown-item>
        </b-dropdown>
        <div class="action">
            <basic-button
                v-if="artItem.price > 0"
                size="sm"
                class="btn-buy"
                @click="handleBuyClick"
                >Add to cart</basic-button
            >
            <spinner-button
                v-else
                size="sm"
                class="btn-buy"
                :loading="loadingDownload"
                @click="handleDownloadClick"
            >
                Download
            </spinner-button>
            <IconButton class="btn-download" icon="download" v-show="false" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
export default {
    name: 'SoundKitItemm',
    props: {
        artItem: {
            type: Object,
        },
        selected: {
            type: Boolean,
        },
        status: {
            type: Boolean,
        },
        index: {
            type: Number,
        },
        loading: {
            type: Boolean,
        },
    },
    data: () => ({
        isShowShare: false,
        loadingDownload: false,
    }),
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
            soundKits: 'profile/soundKits',
            individualLoading: 'profile/individualLoading',
        }),
        curItem() {
            return {
                ...this.artItem,
                type: 'kit',
            }
        },
    },
    methods: {
        handleBuyClick() {
            var listItems = []
            listItems =
                Cookies.getJSON(appConstants.cookies.cartItem.name) ===
                undefined
                    ? []
                    : Cookies.getJSON(appConstants.cookies.cartItem.name)
            var cartItem = {
                type: this.curItem.type,
                price: this.curItem.price,
                id: this.curItem.id,
                license_id: this.curItem.license_id,
                user_id: this.curItem.user_id,
            }
			
			var temp_item = listItems.find(aux => aux.id === cartItem.id)
            if (temp_item === undefined) {
                listItems.push(cartItem)
                Cookies.set(appConstants.cookies.cartItem.name, listItems)
                this.$bus.$emit('modal.addedCart.open')
            } else this.$toast.info('The element is added')            
            
            //this.$store.dispatch('profile/addCartItem', { ...this.curItem })
            
        },
        handleDownloadClick() {
            this.loadingDownload = true
            const downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.artItem.id}/kit`
            window.open(downloadUrl, '_self')
            this.loadingDownload = false
        },
        handleShareClick() {
            this.$bus.$emit('modal.share.open', this.curItem)
        },
    },
}
</script>
