<template>
    <div class="art-item">
        <a href="#" class="img-container" @click.prevent="selectImage">
            <img :src="artItem.coverart" />
            <LoadingSpinner v-if="selected && loading" class="center-img" animation="bounce" />
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
            :to="
                artItem.type === 'beat'
                    ? {
                          name: 'profileBeatDetails',
                          params: { beatId: artItem.id },
                      }
                    : {
                          name: 'profilePackDetails',
                          params: { packId: artItem.id },
                      }
            "
        >
            <div class="title">{{ artItem.title }}</div>
            <div v-if="artItem.type === 'beat'" class="price">
                {{
                minPrice | currencyFormat
                }}
            </div>
            <div v-else class="price">{{ artItem.price | currencyFormat }}</div>
            <div v-if="artItem.bogo" class="bogo">BOGO</div>
        </router-link>
        <b-dropdown class="actions-menu d-none d-md-block" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-v-s" />
            </template>
            <b-dropdown-item
                :to="
                    artItem.type === 'beat'
                        ? {
                              name: 'profileBeatDetails',
                              params: { beatId: artItem.id },
                          }
                        : {
                              name: 'profilePackDetails',
                              params: { packId: artItem.id },
                          }
                "
                target="_blank"
            >
                {{
                artItem.type === 'beat' ? 'Go to Beat' : 'Go to Beat Pack'
                }}
            </b-dropdown-item>
            <b-dropdown-item v-show="false">Save</b-dropdown-item>
            <b-dropdown-item @click="handleShareClick">Share</b-dropdown-item>
            <b-dropdown-item v-show="false">Free Download</b-dropdown-item>
        </b-dropdown>
        <div class="action">
            <basic-button size="sm" class="btn-buy" @click="handleBuyClick">Buy</basic-button>
            <IconButton class="btn-download" icon="download" v-show="false" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ArtItemm',
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
    computed: {
        ...mapGetters({
            licenses: 'profile/licenses',
        }),
        minPrice() {
            return Math.min.apply(
                Math,
                this.artItem.licenses.map(({ price }) => price)
            )
        },
        maxPrice() {
            return Math.max.apply(
                Math,
                this.artItem.licenses.map(({ price }) => price)
            )
        },
    },
    methods: {
        handleBuyClick() {
            if (this.artItem.type === 'beat') {
                this.$bus.$emit('modal.buyLicense.open', this.artItem)
            } else {
                this.$store.dispatch('profile/addCartItem', { ...this.artItem })
                this.$bus.$emit('modal.addedCart.open')
            }
        },
        handleShareClick() {
            this.$bus.$emit('modal.share.open', this.artItem)
        },
        selectImage() {
            if (this.artItem.type === 'beat') {
                this.$emit('select', this.index)
            } else {
                let routeData = this.$router.resolve({
                    name: 'profilePackDetails',
                    params: { packId: this.artItem.id },
                })
                window.open(routeData.href, '_blank')
            }
        },
    },
}
</script>
