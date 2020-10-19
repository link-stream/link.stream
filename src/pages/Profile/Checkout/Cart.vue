<template>
    <div class="pt-4 cart ckeckout-pay px-4">
        <b-form-row
            class="mt-4"
            style="display: flex; justify-content: center;"
        >
            <b-col cols="12" xl="7" lg="7" md="7" sm="7" class="mr-4 pr-4">
                <div class="left-col">
                    <h1 class="pl-2 ml-3 pb-3 title-page">Your cart</h1>
                </div>
                <div
                    v-for="(item, index) in itemsCart"
                    :key="index"
                    class="mt-3 mb-5 ml-3"
                >
                    <CartItem
                        :artistName="item.artistName"
                        :avatarSrc="item.avatarSrc"
                        :elements="item.elements"
                        :index="item.index"
                    ></CartItem>
                </div>
            </b-col>
            <b-col cols="12" xl="3" lg="4" md="4" sm="4">
                <b-card class="card-summary">
                    <b-row>
                        <b-col cols="12">
                            <span class="card-summary-title"
                                >Order Summary</span
                            >
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="pt-2">
                            <span class="card-summary-details">Subtotal</span>
                        </b-col>
                        <b-col cols="5" sm="6" class="pt-2 text-right">
                            <span class="summary-details-price mr-2">$</span>
                            <span class="summary-details-price">{{
                                subTotal.toFixed(2)
                            }}</span>
                        </b-col>
                    </b-row>
                    <b-row v-for="(item, index) in fees" :key="index">
                        <b-col
                            cols="6"
                            v-show="item.value != 0 && item.type != 'Percent'"
                            class="pt-2"
                        >
                            <span class="card-summary-details">{{
                                item.name
                            }}</span>
                        </b-col>
                        <b-col
                            cols="5"
                            sm="6"
                            v-show="item.value != 0 && item.type != 'Percent'"
                            class="pt-2 text-right"
                        >
                            <span class="summary-details-price mr-2">$</span>
                            <span class="summary-details-price text-right">{{
                                parseFloat(item.value).toFixed(2)
                            }}</span>
                        </b-col>
                    </b-row>
                    <b-row v-show="fees_percent.value != 0">
                        <b-col cols="6" class="pt-2">
                            <span class="card-summary-details">{{
                                fees_percent.name
                            }}</span>
                        </b-col>
                        <b-col cols="5" sm="6" class="pt-2 text-right">
                            <span class="summary-details-price mr-2">$</span>
                            <span class="summary-details-price">{{
                                percent
                            }}</span>
                        </b-col>
                    </b-row>

                    <b-row class="mt-2">
                        <b-col cols="6" class="pt-2">
                            <span class="card-summary-total">Order Total</span>
                        </b-col>
                        <b-col cols="5" sm="6" class="pt-2 text-right">
                            <span class="summary-total-price">$ </span>
                            <span class="summary-total-price">{{ total }}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col
                            cols="12"
                            xl="10"
                            lg="11"
                            md="11"
                            sm="12"
                            class="center"
                        >
                            <b-button
                                pill
                                block
                                class="mt-4 px-0 btn-summary-total"
                                :to="
                                    session === undefined
                                        ? { name: 'checkoutSignin' }
                                        : { name: 'payWithCard' }
                                "
                            >
                                Checkout
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row
                        class="my-2"
                        align="center"
                        style="justify-content:center;"
                    >
                        <b-col
                            cols="12"
                            xl="10"
                            lg="11"
                            md="11"
                            sm="10"
                            class="mt-3"
                        >
                            <b-link
                                :to="{ name: 'publicProfile' }"
                                class="return-links"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'chevron-left']"
                                    size="1x"
                                />
                                Return to profile
                            </b-link>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
import { api } from '~/services'
import CartItem from '@/components/Cart/CartItem'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

export default {
    name: 'Cart',
    components: {
        CartItem,
    },
    data() {
        return {
            subTotal: 0,
            total: 0,
            percent: 0,
            itemsCart: [],
            fees: [],
            session: [],
            fees_percent: '',
        }
    },
    created() {
        this.$bus.$on('cart.deleteItems', this.deleteItems)
    },
    watch: {
        itemsCart() {
            if (this.itemsCart.length === 0) {
                this.$router.push({
                    name: 'publicProfile',
                })
            }
        },
    },
    async mounted() {
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        this.createItems()
        if (this.itemsCart.length === 0) {
            this.$router.push({
                name: 'publicProfile',
            })
        } else {
            const response = await api.cart.getConfigFees()
            this.fees = response.data.fees
            this.fees_percent = this.fees.find(aux => aux.type === 'Percent')
            this.sum()
        }
    },

    methods: {
        createItems() {
            var items = Cookies.getJSON(appConstants.cookies.cartItem.name)
            if (items) {
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
        },
        sum() {
            for (var j in this.itemsCart) {
                var elem = this.itemsCart[j].elements
                for (var i in elem) {
                    this.subTotal += elem[i].price
                }
            }
            var subTotFees = 0
            for (var k in this.fees) {
                if (this.fees[k].type !== 'Percent') {
                    subTotFees += parseFloat(this.fees[k].value)
                }
            }
            var itemPercent = this.fees.find(aux => aux.type === 'Percent')
            this.percent = (
                ((this.subTotal + subTotFees) * itemPercent.value) /
                100
            ).toFixed(2)
            this.total = (
                this.subTotal +
                subTotFees +
                parseFloat(this.percent)
            ).toFixed(2)

            var payDetails = {
                sub_total: this.subTotal,
                percent: this.percent,
                fees: this.fees,
                total: this.total,
            }
            var informationPay = [this.itemsCart, payDetails]

            Cookies.set(
                appConstants.cookies.informationPay.name,
                informationPay
            )
        },
        deleteItems() {
            this.itemsCart = []
            this.createItems()
            this.subTotal = 0
            this.sum()
        },
    },
}
</script>
