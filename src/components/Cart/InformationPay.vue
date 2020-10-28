<template>
    <div class="height100">
        <b-card class="cart-item-dark height100 pt-5">
            <div v-for="(item, index) in itemsCart" :key="index">
                <CartItemDark
                    :artistName="item.artistName"
                    :avatarSrc="item.avatarSrc"
                    :elements="item.elements"
                    :index="item.index"
                ></CartItemDark>
            </div>
            <div class="mx-4">
                <b-row>
                    <b-col cols="9" xl="8" lg="8" md="7">
                        <span class="summary-details-dark">Subtotal</span>
                    </b-col>
                    <b-col cols="3" xl="4" lg="4" md="5" class="text-right">
                        <span class="details-price-dark mr-2">$</span>
                        <span class="details-price-dark">{{
                            subTotal.toFixed(2)
                        }}</span>
                    </b-col>
                </b-row>
                <b-row v-for="(item, index) in fees" :key="index">
                    <b-col
                        cols="9"
                        xl="8"
                        lg="8"
                        md="8"
                        v-show="item.value != 0 && item.type != 'Percent'"
                        class="pt-2"
                    >
                        <span class="summary-details-dark">{{
                            item.name
                        }}</span>
                    </b-col>
                    <b-col
                        cols="3"
                        xl="4"
                        lg="4"
                        md="4"
                        v-show="item.value != 0 && item.type != 'Percent'"
                        class="pt-2 text-right"
                    >
                        <span class="details-price-dark mr-2">$</span>
                        <span class="details-price-dark">{{
                            parseFloat(item.value).toFixed(2)
                        }}</span>
                    </b-col>
                </b-row>
                <b-row v-show="fees_percent.value != 0">
                    <b-col cols="9" xl="8" lg="8" md="7" class="pt-2">
                        <span class="summary-details-dark">{{
                            fees_percent.name
                        }}</span>
                    </b-col>
                    <b-col
                        cols="3"
                        xl="4"
                        lg="4"
                        md="5"
                        class="pt-2 text-right"
                    >
                        <span class="details-price-dark mr-2">$</span>
                        <span class="details-price-dark">{{ percent }}</span>
                    </b-col>
                </b-row>
                <div class="divider"></div>
                <b-row class="mt-2">
                    <b-col cols="9" xl="7" lg="7" md="7">
                        <span class="summary-total-dark">Order Total</span>
                    </b-col>
                    <b-col cols="3" xl="5" lg="5" md="5" class="text-right">
                        <span class="total-price-dark">$</span>
                        <span class="total-price-dark">{{ total }}</span>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import CartItemDark from '@/components/Cart/CartItemDark'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
import { api } from '~/services'

export default {
    name: 'InformationPay',
    components: {
        CartItemDark,
    },
    data() {
        return {
            subTotal: 0,
            total: 0,
            itemsCart: [],
            fees: [],
            percent: 0,
            fees_percent: '',
        }
    },
    async mounted() {
        var items_cart = Cookies.getJSON(appConstants.cookies.cartItem.name)
        const params = {
            data: JSON.stringify(items_cart),
        }
        const response_cart = await api.cart.cardDetails(params)

        var items =
            response_cart.status === 'success' ? response_cart.cart_details : []

        //this.itemsCart = cookiesInfoPay[0]
        this.itemsCart = await this.createItems(items)

        var itemsCookies = Cookies.getJSON(
            appConstants.cookies.informationPay.name
        )
        //this.itemsCart = itemsCookies[0]
        this.subTotal = itemsCookies[0].sub_total
        this.total = itemsCookies[0].total
        this.percent = itemsCookies[0].percent
        this.fees = itemsCookies[0].fees
        this.fees_percent = this.fees.find(aux => aux.type === 'Percent')
    },
	
	methods: {
        createItems(items) {
            if (items) {
                this.itemsCart = []
                for (var i = 0; i < items.length; i++) {
                    var temp = this.itemsCart.find(
                        aux => aux.user_id === items[i].user_id
                    )

                    if (temp === undefined) {
                        var elements = []
                        var element = {
                            imgSrc: items[i].coverart_url,
                            name: items[i].title,
                            type: items[i].type,
                            price: parseFloat(items[i].price),
                            id: items[i].id,
                            license_id:
                                items[i].type === 'beat'
                                    ? items[i].license_id
                                    : '',
                            genre_id: items[i].genre_id,
                        }
                        elements.push(element)

                        var itemCart = {
                            artistName: items[i].artistName,
                            avatarSrc: items[i].avatar_url,
                            user_id: items[i].user_id,
                            index: i,
                            artist_url: items[i].artist_url,
                            elements: elements,
                        }
                        this.itemsCart.push(itemCart)
                    } else {
                        temp.elements.push({
                            imgSrc: items[i].coverart_url,
                            name: items[i].title,
                            type: items[i].type,
                            price: parseFloat(items[i].price),
                            id: items[i].id,
                            license_id:
                                items[i].type === 'beat'
                                    ? items[i].license_id
                                    : '',
                            genre_id: items[i].genre_id,
                        })
                    }
                }
            }
            return this.itemsCart
        },
    },
}
</script>
