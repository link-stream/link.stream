<template>
    <div class="AddedCartItem">
        <div class="item-cover">
            <img :src="cartItem.coverart" :alt="cartItem.title" />
        </div>
        <div class="item-body">
            <h4 class="item-title">
                {{ cartItem.title }}
            </h4>
            <small class="item-subtitle" v-if="cartItem.track_type == 2">
                {{ cartItem.type === 'pack' ? 'Beat Pack' : 'Beat' }} |
            </small>
            <small class="item-subtitle" v-else-if="cartItem.track_type == 3">
                Sound Kit |
            </small>
            <basic-button variant="link" class="btn-remove" @click="removeItem">
                <small>Remove</small>
            </basic-button>
        </div>
        <div class="item-price">
            {{ cartItem.price | currencyFormat }}
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import Cookies from 'js-cookie'

export default {
    name: 'AddedCartItem',
    props: {
        cartItem: {
            type: Object,
        },
    },
    methods: {
        removeItem() {
            var cartItems = Cookies.getJSON(
                'appConstants.cookies.cartItem.name'
            )
            const findIndex = cartItems.findIndex(item => {
                if (
                    this.cartItem.track_type === appConstants.tracks.types.beat
                ) {
                    if (item.type === 'beat') {
                        return (
                            item.id === this.cartItem.id &&
                            item.license_id === this.cartItem.license_id
                        )
                    } else {
                        return (
                            item.type === this.cartItem.type &&
                            item.id === this.cartItem.id
                        )
                    }
                } else {
                    return (
                        item.track_type === this.cartItem.track_type &&
                        item.id === this.cartItem.id
                    )
                }
            })
            cartItems.splice(findIndex, 1)
            Cookies.set('appConstants.cookies.cartItem.name', cartItems)
            this.$bus.$emit('modal.addedCart.open')

            //this.$store.dispatch('profile/removeCartItem', this.cartItem)
        },
    },
}
</script>
