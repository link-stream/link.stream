<template>
    <div class="pages page-sales">
        <b-col cols="12" class="pt-3 mt-5">
            <b-row style="display: flex; justify-content: center;">
                <b-col cols="5">
                    <span class="text-sales">Sales</span>
                </b-col>
                <b-col cols="5" align="right">
                    <b-button
                        variant="light"
                        size="sm"
                        class="btn-pagination"
                        @click="handlePreviousClick"
                        :disabled="currentPage === 1"
                    >
                        <font-awesome-icon
                            class="ml-3"
                            :icon="['fas', 'chevron-left']"
                        />
                    </b-button>
                    <b-button
                        variant="light"
                        size="sm"
                        class="btn-pagination ml-2"
                        @click="handleNextClick"
                        :disabled="
                            currentPage === items_sales.length / per_page
                        "
                    >
                        <font-awesome-icon
                            :icon="['fas', 'chevron-right']"
                            class="ml-3"
                        />
                    </b-button>
                </b-col>
            </b-row>
            <b-row style="display: flex; justify-content: center;" class="mt-4">
                <b-col cols="12" xl="10" lg="10">
                    <b-table
                        :fields="fields"
                        :items="items_sales"
                        :current-page="currentPage"
                        outlined
                        responsive
                        :per-page="per_page"
                        @row-clicked="
                            (item, index, event) => rowClick(item, index, event)
                        "
                    >
                        <template #cell(number)="data">
                            <b class="number-tables">
                                {{ data.item.name.no }}</b
                            >
                        </template>
                        <template #cell(total)="data">
                            <span> ${{ data.item.total }}</span>
                        </template>
                        <template #cell(items)="data">
                            <span> {{ data.item.items }} items</span>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-col>
    </div>
</template>

<script>
import moment from 'moment'
import { api } from '~/services'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
export default {
    name: 'Sales',
    data() {
        return {
            per_page: 10,
            currentPage: 1,
            items: [],
            fields: [
                { key: 'number', label: '#' },
                'date',
                'customer',
                'total',
                'items',
            ],
            items_sales: [],
        }
    },
    async mounted() {
        var session = Cookies.getJSON(appConstants.cookies.auth.name)
        const response = await api.sales.getCustomerOrders(session.id, '')
        if (response.status === 'success') {
            for (var i in response.data) {
                this.date = moment(response.data[i].created_at).format('MMM DD')
                this.time = moment(response.data[i].created_at).format('LT')
                this.items_sales.push({
                    name: { no: response.data[i].invoice_number },
                    date: this.date.concat(' ', 'at', ' ', this.time),
                    customer: response.data[i].first_name.concat(
                        ' ',
                        response.data[i].last_name
                    ),
                    total: response.data[i].total,
                    items: response.data[i].items,
                    id: response.data[i].id,
                })
            }
        }

        //this.items = response.data
        console.log('this.items_sales', this.items_sales)
    },
    methods: {
        handlePreviousClick() {
            if (this.currentPage > 0) {
                this.currentPage--
            }
        },
        handleNextClick() {
            if (
                this.currentPage <
                (this.items_sales.length - 1) / this.per_page
            ) {
                this.currentPage++
            }
        },
        rowClick(item, index, event) {
            this.$router.push({
                name: 'accountSalesDetails',
                params: { id: item.id },
            })
        },
    },
}
</script>
