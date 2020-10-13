<template>
    <div class="cart ckeckout-pay pt-5 px-3 mx-3">
        <b-col cols="12" xl="12" lg="12" md="12" class="center">
            <b-row>
                <span class="thank-you">Thank you, {{ user.first_name }}!</span>
            </b-row>
            <b-row class="mt-3">
                <span your-files-are-now-a
                    >Your files are now available to download below</span
                >
            </b-row>
            <b-card class="card-summacry mt-4" no-body>
                <b-row class="px-4 py-4">
                    <b-col cols="6" xl="11" lg="9" md="10" sm="8">
                        <span class="items-purchased"> Items purchased</span>
                    </b-col>
                    <b-col cols="6" xl="1" lg="3" md="2" sm="4">
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
            <b-card class="card-summacry mt-4" no-body>
                <b-row class="px-4 py-4">
                    <b-col cols="12" xl="12" lg="12" md="12">
                        <span class="customer-information">
                            Customer Information</span
                        >
                    </b-col>
                    <b-col
                        cols="12"
                        xl="4"
                        lg="4"
                        md="4"
                        sm="6"
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
                        xl="4"
                        lg="4"
                        md="4"
                        sm="5"
                        class="mt-3 ml-3"
                    >
                        <b-row>
                            <span class="payment-method"> Payment Method</span>
                        </b-row>
                        <b-row>
                            <span class="customer-information-details">
                                {{ receipt.cc_type }}</span
                            >
                            <span class="customer-information-details ml-2">
                                ending in</span
                            >
                            <span class="customer-information-details ml-2">
                                {{ receipt.billingCC }}</span
                            >
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
            <b-row class="mt-4 ml-2">
                <span class="you-might-also-like">You might also like</span>
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
                <b-button
                    pill
                    class="continue-shopping"
                    :to="{ name: 'checkoutReceipt' }"
                    >Continue Shopping</b-button
                >
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
        }
    },
    watch: {},
    async mounted() {
        console.log('user', this.user)
        this.data_user = this.user.first_name.concat(
            ' ',
            this.user.last_name,
            ' (',
            this.user.email,
            ')'
        )
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        var infoPay = Cookies.getJSON(appConstants.cookies.informationPay.name)
        this.createItemsPay(infoPay[0])
        this.receipt = Cookies.getJSON('receipt')

        const response = await api.cart.getRecommendations(this.user.id)
        if (response.status === 'success') {
            this.recommendation = response.data.extra
        }

        Cookies.remove(appConstants.cookies.informationPay.name)
        Cookies.remove('receipt')
    },
    methods: {
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
                    })
                }
            }
        },
    },
}
</script>
