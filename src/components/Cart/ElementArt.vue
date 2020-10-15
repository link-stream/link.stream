<template>
    <div class="py-0">
        <b-card class="cart-item">
            <b-row class="px-0 py-0 text-center">
                <b-col cols="4" xl="2" lg="2" md="2" sm="3">
                    <b-img :src="imgSrc" fluid></b-img>
                </b-col>
                <b-col cols="4" xl="8" lg="8" md="6" sm="5" class="center">
                    <!--b-row-- class="d-block d-sm-none para ocultar lo otro d-none d-sm-block" align-h="start">
                        <span class="price-item">$ {{ price }}</span>
                    </!--b-row-->
                    <b-row>
                        <span class="name-item mb-1">{{ name }}</span>
                    </b-row>
                    <b-row>
                        <span class="type-item">{{ type }}</span>
                    </b-row>
                </b-col>
                <b-col cols="4" xl="2" lg="2" md="4" sm="4" class="center">
                    <span class="price-item mr-4">{{
                        price | currencyFormat
                    }}</span>
                    <IconButton
                        class="ml-4 pb-1"
                        icon="close"
                        @click="removeItem"
                    />
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { appConstants } from '~/constants'
import Cookies from 'js-cookie'
export default {
    name: 'ElementArt',
    props: {
        imgSrc: {
            type: String,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        price: {
            type: Number,
        },
        index: {
            type: Number,
        },
        id: {
            type: String,
        },
    },
    methods: {
        removeItem() {
            var cartItems = Cookies.getJSON(
                'appConstants.cookies.cartItem.name'
            )
            var cartItem = cartItems.find(aux => aux.id === this.id)
            if (cartItem !== undefined) {
                const findIndex = cartItems.findIndex(item => {
                    if (
                        cartItem.track_type === appConstants.tracks.types.beat
                    ) {
                        if (item.type === 'beat') {
                            return (
                                item.id === cartItem.id &&
                                item.license_id === cartItem.license_id
                            )
                        } else {
                            return (
                                item.type === cartItem.type &&
                                item.id === cartItem.id
                            )
                        }
                    } else {
                        return (
                            item.track_type === cartItem.track_type &&
                            item.id === cartItem.id
                        )
                    }
                })
                cartItems.splice(findIndex, 1)
                Cookies.set('appConstants.cookies.cartItem.name', cartItems)
                this.$bus.$emit('cart.deleteItems')
            }

            //this.$store.dispatch('profile/removeCartItem', this.cartItem)
        },
    },
}
</script>
