<template>
    <div class="art-item">
        <a
            href="#"
            class="img-container"
            @click.prevent="$emit('select', index)"
        >
            <img :src="artItem.coverart" />
            <LoadingSpinner
                v-if="selected && loading"
                class="center-img"
                animation="bounce"
            />
            <img
                v-if="selected && !loading && status"
                src="@/assets/img/ico/pause-red.svg"
                class="center-img"
            />
            <img
                v-if="selected && !loading && !status"
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
            <div class="title">
                {{ artItem.title }}
            </div>
            <div class="price">
                {{ artItem.price | currencyFormat }}
            </div>
            <div v-if="artItem.bogo" class="bogo">
                BOGO
            </div>
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
            >
                Go to Sound Kit
            </b-dropdown-item>
            <b-dropdown-item>
                Save
            </b-dropdown-item>
            <b-dropdown-item @click="handleShareClick">
                Share
            </b-dropdown-item>
            <b-dropdown-item>
                Free Download
            </b-dropdown-item>
        </b-dropdown>
        <div class="action">
            <basic-button size="sm" class="btn-buy" @click="handleBuyClick">
                Buy
            </basic-button>
            <IconButton class="btn-download" icon="download" />
        </div>
        <ShareArtModal
            v-if="isShowShare"
            :curItem="curItem"
            @close="isShowShare = false"
        />
    </div>
</template>
<script>
import ShareArtModal from '@/components/Modal/ShareArtModal'
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
    components: {
        ShareArtModal,
    },
    data: () => ({
        isShowShare: false,
    }),
    computed: {
        curItem() {
            return {
                ...this.artItem,
                type: 'kit',
            }
        },
    },
    methods: {
        handleBuyClick() {
            this.$store.dispatch('profile/addCartItem', { ...this.artItem })
            this.$bus.$emit('modal.addedCart.open')
        },
        handleShareClick() {
            this.isShowShare = true
        },
    },
}
</script>
