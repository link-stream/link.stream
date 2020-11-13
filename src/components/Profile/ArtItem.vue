<template>
    <div class="art-item">
        <a href="#" class="img-container" @click.prevent="selectImage">
            <img :src="artItem.coverart" />
            <LoadingSpinner
                v-if="selected && individualLoading && artItem.type === 'beat'"
                class="center-img"
                animation="bounce"
            />
            <img
                v-if="selected && !individualLoading && status && artItem.type === 'beat'"
                src="@/assets/img/ico/pause-red.svg"
                class="center-img"
            />
            <img
                v-if="!individualLoading && (!selected || !status) && artItem.type === 'beat'"
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
            target="_blank"
        >
            <div class="title">{{ artItem.title }}</div>
            <div v-if="artItem.type === 'beat'" class="price">{{
                minPrice | currencyFormat
            }}</div>
            <div v-else class="price">{{ artItem.price | currencyFormat }}</div>
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
                >{{
                    artItem.type === 'beat' ? 'Go to Beat' : 'Go to Beat Pack'
                }}</b-dropdown-item
            >
            <b-dropdown-item v-show="false">Save</b-dropdown-item>
            <b-dropdown-item @click="handleShareClick">Share</b-dropdown-item>
            <b-dropdown-item v-show="false">Free Download</b-dropdown-item>
        </b-dropdown>
        <div class="action">
            <spinner-button
                v-if="artItem.type === 'pack' && artItem.price == 0"
                size="sm"
                class="btn-buy"
                :loading="loadingDownload"
                @click="handleDownloadClick"
            >
                Download
            </spinner-button>
            <basic-button
                v-else
                size="sm"
                class="btn-buy"
                @click="handleBuyClick"
                >Add to cart</basic-button
            >
            <IconButton 
                class="btn-download" 
                icon="download" 
                v-if="showDownload" 
                @click="handleDownloadClick" 
            />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getCartCookie } from '~/utils/cart'
import { setCartCookie } from '~/utils/cart'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
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
            individualLoading: 'profile/individualLoading',
            profile: 'profile/profile',
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
        curItem() {
            return {
                ...this.artItem,
                artistName: this.profile.first_name.concat(
                    ' ',
                    this.profile.last_name
                ),
                avatar_url: this.profile.avatar_url,
                artist_url: this.profile.url,
            }
        },
    },
    data() {
        return {
            loadingDownload: false,
            showDownload: false,
        }
    },
    created() {
        this.showDownload =
            this.artItem.type === 'beat' &&
            this.artItem.licenses.find(license => license.price === '0.00')
    },
    methods: {
        handleBuyClick() {
			var name_url = this.profile.url
		
            var listItems = []
            if (this.artItem.type === 'beat') {
                this.$bus.$emit('modal.buyLicense.open', this.curItem)
            } else {
                /*listItems =
                    Cookies.getJSON(appConstants.cookies.cartItem.name) ===
                    undefined
                        ? []
                        : Cookies.getJSON(appConstants.cookies.cartItem.name)*/						
						
				listItems =
                    Cookies.getJSON(name_url) ===
                    undefined
                        ? []
                        : Cookies.getJSON(name_url)
                
				var cartItem = {
                    type: this.curItem.type,
                    price: this.curItem.price,
                    id: this.curItem.id,
                    license_id: '',
                    user_id: this.curItem.user_id,
                }
				
				var temp_item = listItems.find(aux => aux.id === cartItem.id)
                if (temp_item === undefined) {
                    listItems.push(cartItem)
					
                    /*Cookies.set(appConstants.cookies.cartItem.name, listItems)
                    this.$bus.$emit('modal.addedCart.open')*/
					
					Cookies.set(name_url, listItems)
                    this.$bus.$emit('modal.addedCart.open', name_url)
					
                } else this.$toast.info('The element is already added')
                
                //this.$store.dispatch('profile/addCartItem', { ...this.artItem })
            }
        },
        handleDownloadClick() {
            this.loadingDownload = true
            let downloadUrl = ''
            if (this.artItem.type === 'pack') {
                downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.artItem.id}/${this.artItem.type}`
            } else {
                const license = this.artItem.licenses.find(
                    license => license.price === '0.00'
                )
                downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.artItem.id}/${this.artItem.type}/${license.license_id}`
            }
            window.open(downloadUrl, '_self')
            this.loadingDownload = false
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
