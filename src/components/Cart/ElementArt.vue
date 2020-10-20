<template>
    <div class="py-0">
        <b-card class="cart-item">
            <b-row class="px-0 py-0 text-center">
                <b-col cols="4" xl="2" lg="2" md="2" sm="3">
                    <b-img :src="imgSrc" fluid></b-img>
                </b-col>
                <b-col cols="5" xl="7" lg="6" md="5" sm="5" class="center">
                    <b-row class="d-block d-md-none" align="left">
                        <span class="price-item">{{
                            price | currencyFormat
                        }}</span>
                    </b-row>
                    <b-row>
                        <span class="name-item mb-1">{{ name }}</span>
                    </b-row>
                    <b-row>
                        <span class="type-item">{{ type }}</span>
                    </b-row>
                </b-col>
                <b-col
                    cols="3"
                    xl="3"
                    lg="4"
                    md="5"
                    sm="4"
                    class="center"
                    style="overflow: hidden;"
                >
                    <span
                        class="price-item mr-4 d-none d-md-block"
                        style="float: left;"
                        >{{ price | currencyFormat }}</span
                    >
                    <IconButton
                        style="float: left;"
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
    mounted() {
        console.log('id', this.id)
    },
    methods: {
        removeItem() {
            console.log('id', this.id)
            var cartItems = Cookies.getJSON(appConstants.cookies.cartItem.name)
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
                Cookies.set(appConstants.cookies.cartItem.name, cartItems)
                this.$bus.$emit('cart.deleteItems')
            }

            //this.$store.dispatch('profile/removeCartItem', this.cartItem)
        },
    },
}
</script>
