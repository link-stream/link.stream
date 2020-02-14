<template>
    <div class="home-page">
        <loading-indicator :loading="!orders"></loading-indicator>
        <template v-if="!!orders">
            <div class="wrap py-4">
                <div class="container">
                    <!-- Filter -->
                    <div class="row">
                        <div class="col-12">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Filter by worker name..."
                                v-model="searchKey"
                            />
                        </div>
                    </div>
                    <!-- Sorter -->
                    <div class="row">
                        <div class="col-12 text-center py-4">
                            <switcher
                                v-model="orderByDesc"
                                textDisabled="Earlist first"
                                textEnabled="Latest first"
                            ></switcher>
                        </div>
                    </div>
                    <!-- Orders -->
                    <div class="row">
                        <template v-for="(order, index) in sortedOrders">
                            <div class="col-md-6 col-sm-12 d-flex" :key="`work-order-${index}`">
                                <work-order-card :order="order"></work-order-card>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderBy } from 'lodash'
import { LoadingIndicator } from '~/components/Loading'
import { Switcher } from '~/components/Switcher'
import { WorkOrderCard } from '~/components/Card'

export default {
    name: 'HomePage',
    components: {
        LoadingIndicator,
        Switcher,
        WorkOrderCard,
    },
    data() {
        return {
            searchKey: '',
            orderByDesc: false,
        }
    },
    computed: {
        ...mapGetters({ orders: 'workers/orders', getWorker: 'workers/worker' }),
        sortedOrders() {
            const { orders, getWorker, searchKey, orderByDesc } = this

            // filter orders by worker name
            let filtered = []
            if (searchKey != '')
                filtered = orders.filter(order => {
                    const worker = getWorker(order.workerId)
                    return worker.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
                })
            else filtered = orders

            // reorder orders by deadline
            return orderBy(filtered, ['deadline'], [orderByDesc ? 'desc' : 'asc'])
        },
    },
    created() {
        this.$store.dispatch('workers/loadWokOrders')
    },
}
</script>
