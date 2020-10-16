<template>
    <div class="cart ckeckout-pay pt-5 px-3 mx-3">
        <b-col cols="12" xl="12" lg="12" md="12" sm="12">
            <b-row>
                <span class="thank-you">Thank you, {{ user.first_name }}!</span>
            </b-row>
            <b-row class="mt-3">
                <span your-files-are-now-a
                    >Your files are now available to download below</span
                >
            </b-row>
            <b-row>
                <b-col cols="12" xl="9" lg="8" md="8" sm="12">
                    <b-card class="card-summacry mt-4" no-body>
                        <b-row class="px-4 py-4">
                            <b-col cols="6" xl="10" lg="8" md="9" sm="7">
                                <span class="items-purchased">
                                    Items purchased</span
                                >
                            </b-col>
                            <b-col cols="6" xl="2" lg="4" md="3" sm="5">
                                <span class="order">{{ receipt.id }}</span>
                            </b-col>
                        </b-row>
                        <div class="divider"></div>
                        <b-list-group flush>
                            <b-list-group-item
                                v-for="(item, index) in itemsPay"
                                :key="index"
                            >
                                <ItemPay :itemPay="item" />
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                    <b-row class="mt-4 ml-2">
                        <span class="you-might-also-like"
                            >You might also like</span
                        >
                    </b-row>
                    <b-row class="mt-4 ml-2">
                        <Recommendation
                            v-for="(item, index) in recommendation"
                            :key="index"
                            :imgSrc="item.coverart_url"
                            :name="item.title"
                            :type="item.type"
                        />
                    </b-row>
                    <b-row class="mt-4 ml-2">
                        <basic-button
                            pill
                            class="continue-shopping"
                            :to="{ name: 'publicProfile' }"
                            >Continue Shopping</basic-button
                        >
                    </b-row>
                </b-col>
                <b-col cols="12" xl="3" lg="4" md="4" sm="12" class="mt-2">
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
                                <span class="card-summary-details"
                                    >Subtotal</span
                                >
                            </b-col>
                            <b-col
                                cols="6"
                                xl="4"
                                lg="5"
                                md="6"
                                sm="4"
                                class="pt-2 text-right"
                            >
                                <span class="summary-details-price mr-2"
                                    >$</span
                                >
                                <span class="summary-details-price">{{
                                    subTotal.toFixed(2)
                                }}</span>
                            </b-col>
                        </b-row>
                        <b-row v-for="(item, index) in fees" :key="index">
                            <b-col
                                cols="6"
                                v-show="
                                    item.value != 0 && item.type != 'Percent'
                                "
                                class="pt-2"
                            >
                                <span class="card-summary-details">{{
                                    item.name
                                }}</span>
                            </b-col>
                            <b-col
                                cols="6"
                                xl="4"
                                lg="5"
                                md="6"
                                sm="4"
                                v-show="
                                    item.value != 0 && item.type != 'Percent'
                                "
                                class="pt-2 text-right"
                            >
                                <span class="summary-details-price mr-2"
                                    >$</span
                                >
                                <span
                                    class="summary-details-price text-right"
                                    >{{
                                        parseFloat(item.value).toFixed(2)
                                    }}</span
                                >
                            </b-col>
                        </b-row>
                        <b-row v-show="fees_percent.value != 0">
                            <b-col cols="6" class="pt-2">
                                <span class="card-summary-details">{{
                                    fees_percent.name
                                }}</span>
                            </b-col>
                            <b-col
                                cols="6"
                                xl="4"
                                lg="5"
                                md="6"
                                sm="4"
                                class="pt-2 text-right"
                            >
                                <span class="summary-details-price mr-2"
                                    >$</span
                                >
                                <span class="summary-details-price">{{
                                    percent
                                }}</span>
                            </b-col>
                        </b-row>

                        <b-row class="mt-2">
                            <b-col cols="6" class="pt-2">
                                <span class="card-summary-total"
                                    >Order Total</span
                                >
                            </b-col>
                            <b-col
                                cols="6"
                                xl="4"
                                lg="5"
                                md="6"
                                sm="4"
                                class="pt-2 text-right"
                            >
                                <span class="summary-total-price">$ </span>
                                <span class="summary-total-price">{{
                                    total
                                }}</span>
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-card class="card-summary mt-4" no-body>
                        <b-row class="px-4 py-4">
                            <b-col cols="12" xl="12" lg="12" md="12">
                                <span class="customer-information">
                                    Customer Information</span
                                >
                            </b-col>
                            <b-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="12"
                                sm="12"
                                class="mt-3 ml-3"
                            >
                                <b-row>
                                    <span class="email"> Email</span>
                                </b-row>
                                <b-row>
                                    <span class="customer-information-details">
                                        {{ receipt.email }}</span
                                    >
                                </b-row>
                            </b-col>
                            <b-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="12"
                                sm="12"
                                class="mt-3 ml-3"
                            >
                                <b-row>
                                    <span class="payment-method">
                                        Payment Method</span
                                    >
                                </b-row>

                                <b-row>
                                    <b-img
                                        fluid
                                        width="30px"
                                        height="30px"
                                        :src="icon_card"
                                    ></b-img>
                                    <span
                                        class="customer-information-details ml-2"
                                    >
                                        ending in</span
                                    >
                                    <span
                                        class="customer-information-details ml-2"
                                    >
                                        {{ receipt.billingCC }}</span
                                    >
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </div>
</template>

<script>
import { api } from '~/services'
import ItemPay from '@/components/Cart/ItemPay'
import Recommendation from '@/components/Cart/Recommendation'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

export default {
    name: 'CkeckoutReceipt',
    components: {
        ItemPay,
        Recommendation,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    data() {
        return {
            itemsPay: [],
            receipt: '',
            recommendation: [],
            subTotal: 0,
            total: 0,
            fees: [],
            percent: 0,
            fees_percent: '',
            icon_card: '',
        }
    },
    watch: {},
    async mounted() {
        console.log('this.user', this.user)
        this.data_user = this.user.first_name.concat(
            ' ',
            this.user.last_name,
            ' (',
            this.user.email,
            ')'
        )
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        var infoPay = Cookies.getJSON(appConstants.cookies.informationPay.name)
        console.log('infoPay', infoPay)
        this.createItemsPay(infoPay[0])
        this.subTotal = infoPay[1].sub_total
        this.total = infoPay[1].total
        this.percent = infoPay[1].percent
        this.fees = infoPay[1].fees
        this.fees_percent = this.fees.find(aux => aux.type === 'Percent')
        this.receipt = Cookies.getJSON('receipt')
        this.icon_card = this.getBrandClass(this.receipt.cc_type.toLowerCase())

        const response = await api.cart.getRecommendations(this.user.id)
        if (response.status === 'success') {
            this.recommendation = response.data.extra
        }
        //Cookies.remove(appConstants.cookies.informationPay.name)
        //Cookies.remove('receipt')
    },
    methods: {
        getBrandClass(brand) {
            let icon = ''
            let temp = appConstants.cardImages.find(aux => aux.type === brand)
            icon = temp !== undefined ? temp.url : '/static/img/credit-card.svg'

            return icon
        },
        createItemsPay(items_pay) {
            for (var i in items_pay) {
                var item = items_pay[i]
                for (var j in item.elements) {
                    this.itemsPay.push({
                        imgSrc: item.elements[j].imgSrc,
                        name: item.elements[j].name,
                        type: item.elements[j].type,
                        price: item.elements[j].price,
                        artistName: item.artistName,
                        artist_url: item.artist_url,
                    })
                }
            }
        },
    },
}
</script>
