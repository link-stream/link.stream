<template>
    <div class="tab PurchasesTab">
        <h2 class="section-title">Your Purchases</h2>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div class="page-empty" v-if="!loading && !purchaseData.length">
            <div class="empty-text">
                Your purchases will appear here.
            </div>
        </div>    
        <div class="tab-body" v-else>
            <base-card
                class="Card purchases-card"
                v-for="purchases in purchaseData"
                :key="purchases.id"
            >
                <b-form-row class="border-bottom pb-3">
                    <b-col>
                        <span>
                            <span class="font-weight-bold">Invoice # </span>
                            <span>{{ purchases.invoice_number }}</span>
                        </span>
                        <span class="float-right">
                            <span class="font-weight-bold">Date: </span>
                            <span class="mr-3">{{ purchases.created_at | normalDate }}</span>
                            <span class="font-weight-bold">Amount: </span>
                            <span class="mr-3">{{ purchases.amount | currencyFormat }}</span>
                            <span class="font-weight-bold">Status: </span>
                            <span class="mr-3">{{ purchases.status }}</span>
                        </span>
                    </b-col>
                </b-form-row>
                <h4 class="my-3">Items purchased</h4>
                <purchase-item
                    v-for="item in purchases.details"
                    :key="`purchase-item-${item.id}`"
                    :purchase="item"
                >
                </purchase-item>
            </base-card>
        </div>
    </div>
</template>

<script>
import PurchaseItem from './PurchaseItem'
import { mapGetters } from 'vuex'
export default {
    name: 'PurchasesTab',
    components: {
        PurchaseItem,
    },
    computed: {
        ...mapGetters({
            purchaseData: 'me/purchases'
        })
    }, 
    data: () => ({
        loading: false,
    }),
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadPurchases')
        this.loading = false
    },
}
</script>
