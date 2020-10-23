<template>
    <div class="pages page-sales cart ckeckout-pay">
        <b-col cols="12" xl="12" lg="12" md="12" sm="12" class="pt-3 mt-3">
            <b-row style="display: flex; justify-content: center;">
                <b-col cols="12" xl="9" lg="9" md="11">
                    <b-link
                        :to="{
                            name: 'accountSales',
                        }"
                        class="back-sales"
                    >
                        <font-awesome-icon
                            :icon="['fas', 'chevron-left']"
                            size="1x"
                        />
                        SALES
                    </b-link>
                </b-col>
            </b-row>
            <b-row style="display: flex; justify-content: center;" class="mt-3">
                <b-col cols="12" xl="9" lg="9" md="11">
                    <span class="text-sales">{{ data.invoice_number }}</span>
                    <!--<span>Print</span>-->
                </b-col>
            </b-row>
            <b-row style="display: flex; justify-content: center;">
                <b-col cols="12" xl="7" lg="6" md="7" sm="12">
                    <b-card class="card-summary mt-4" no-body>
                        <b-row class="px-4 py-4">
                            <b-col cols="12" xl="10" lg="8" md="9" sm="7">
                                <span class="items-purchased">
                                    Items purchased ({{ total_items }})</span
                                >
                            </b-col>
                        </b-row>
                        <div class="divider"></div>
                        <b-list-group flush>
                            <b-list-group-item
                                v-for="(item, index) in data.items"
                                :key="index"
                            >
                                <ItemSale :itemSale="item" />
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                    <b-card class="card-summary mt-4">
                        <b-row>
                            <b-col cols="12">
                                <span class="customer-information">Paid</span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6" class="pt-2">
                                <span class="paid-by-customer"
                                    >Paid by customer</span
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
                                <span class="paid-by-customer-price mr-2"
                                    >$</span
                                >
                                <span class="paid-by-customer-price">{{
                                    data.total
                                }}</span>
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-card class="card-summary mt-4" no-body>
                        <b-row class="px-4 py-4">
                            <b-col cols="12" xl="12" lg="12" md="12">
                                <span class="customer-information">
                                    Payment Method</span
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
                                    <span>${{ data.total }} processed on </span>
                                    <b-img
                                        fluid
                                        width="30px"
                                        height="30px"
                                        :src="icon_card"
                                        class="ml-1"
                                    ></b-img>
                                    <!--span
                                        class="customer-information-details ml-2"
                                    >
                                        ending in</span
                                    >
                                    <span
                                        class="customer-information-details ml-2"
                                    >
                                        {{ billingCC }}</span
                                    -->
                                    <span class="ml-1">
                                        {{ date }} at {{ time }}</span
                                    >
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
                <b-col cols="12" xl="2" lg="4" md="4" sm="12">
                    <b-card class="card-summary mt-4" no-body>
                        <b-row class="px-4 py-4">
                            <b-col cols="12" xl="12" lg="12" md="12">
                                <span class="customer-information">
                                    Customer</span
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
                                    <span class="costumer-data">
                                        {{ data.customer }}</span
                                    >
                                </b-row>
                                <b-row class="mt-4">
                                    <span class="email"> Contact info</span>
                                </b-row>
                                <b-row class="mt-2">
                                    <span class="return-links">{{
                                        data.email
                                    }}</span>
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
import moment from 'moment'
import { api } from '~/services'
import ItemSale from '@/components/Account/Sales/ItemSale'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
export default {
    name: 'SalesDetails',
    components: {
        ItemSale,
    },
    props: ['id'],
    data() {
        return {
            icon_card: '',
            total: 0,
            email: '',
            icon_card: '',
            recommendation: [],
            data: [],
            total_items: 0,
            date: '',
            time: '',
        }
    },
    async mounted() {
        var session = Cookies.getJSON(appConstants.cookies.auth.name)
        console.log('id', this.id)

        const response = await api.sales.getCustomerOrders(session.id, this.id)
        console.log('response', response)
        if (response.status === 'success') {
            this.data = response.data
        }
        this.total_items = this.data.items.length
        this.icon_card = this.getBrandClass(this.data.cc_type.toLowerCase())
        this.date = moment(this.data.created_at).format('MMM DD')
        this.time = moment(this.data.created_at).format('LT')
    },
    methods: {
        getBrandClass(brand) {
            let icon = ''
            let temp = appConstants.cardImages.find(aux => aux.type === brand)
            icon = temp !== undefined ? temp.url : '/static/img/credit-card.svg'

            return icon
        },
    },
}
</script>
