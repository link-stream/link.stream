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
                class="purchases-card"
                v-for="purchases in purchaseData"
                :key="purchases.id"
            >
                <b-form-row class="border-bottom purchases-main-info">
                    <b-col>
                        <span class="individual-info">
                            <span class="font-weight-bold">Invoice # </span>
                            <span>{{ purchases.invoice_number }}</span>
                        </span>
                        <span class="individual-info float-right">
                            <span class="individual-info">
                                <span class="font-weight-bold">Date: </span>
                                <span class="mr-3">
                                    {{ purchases.created_at | normalDate }}
                                </span>
                            </span>
                            <span class="individual-info">
                                <span class="font-weight-bold">Amount: </span>
                                <span class="mr-3">
                                    {{ purchases.amount | currencyFormat }}
                                </span>
                            </span>
                            <span class="individual-info">
                                <span class="font-weight-bold">Status: </span>
                                <span class="mr-3">
                                    {{ purchases.status }}
                                </span>
                            </span>
                        </span>
                    </b-col>
                </b-form-row>
                <h2 class="section-title">Items purchased</h2>
                <purchase-item
                    v-for="item in purchases.details"
                    :key="`purchase-item-${item.id}`"
                    :purchase="item"
                >
                </purchase-item>
            </base-card>
            <ShareArtModal @close="handleCloseShare" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PurchaseItem from './PurchaseItem'
import ShareArtModal from '@/components/Modal/ShareArtModal'
export default {
    name: 'PurchasesTab',
    components: {
        PurchaseItem,
        ShareArtModal,
    },
    computed: {
        ...mapGetters({
            purchaseData: 'me/purchases',
        }),
    },
    data: () => ({
        loading: false,
    }),
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadPurchases')
        this.loading = false
    },
     methods: {
        handleCloseShare() {
            this.$bus.$emit('modal.share.close')
        },
    },
}
</script>
