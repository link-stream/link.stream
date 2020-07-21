<template>
    <div class="tab PurchasesTab">
        <h2 class="section-title">Your Purchases</h2>
        <div class="tab-body">
            <base-card
                class="Card purchases-card"
                v-for="(purchases, index) in purchaseData"
                :key="index"
            >
                <b-form-row class="border-bottom pb-3">
                    <b-col>
                        <span>
                            <span class="font-weight-bold">Invoice # </span>
                            <span>{{ purchases.number }}</span>
                        </span>
                        <span class="float-right">
                            <span class="font-weight-bold">Date: </span>
                            <span class="mr-3">{{ purchases.date | normalDate }}</span>
                            <span class="font-weight-bold">Amount: </span>
                            <span class="mr-3">{{ purchases.amount | currencyFormat }}</span>
                            <span class="font-weight-bold">Status: </span>
                            <span class="mr-3">{{ purchases.status }}</span>
                        </span>
                    </b-col>
                </b-form-row>
                <h4 class="my-3">Items purchased</h4>
                <purchase-item
                    v-for="(item, index) in purchases.items"
                    :key="`purchase-item-${index}`"
                    :purchase="item"
                >
                </purchase-item>
            </base-card>
        </div>
    </div>
</template>

<script>
import PurchaseItem from './PurchaseItem'
export default {
    name: 'PurchasesTab',
    components: {
        PurchaseItem,
    },
    data: () => ({
        purchaseData: [
            {
                number: 'LS1628106_0326323001591054432',
                date: '2020/05/30',
                amount: 17.95,
                status: 'Completed',
                items: [
                    {
                        image: '/static/img/no-coverart.jpg',
                        title: 'Beat Title',
                        type: 'Beat',
                        user: 'Alyssa Tucker',
                        price: 15,
                    },
                    {
                        image: '/static/img/no-coverart.jpg',
                        title: 'Kit Title',
                        type: 'Sound Kit',
                        user: 'Alyssa Tucker',
                        price: 2.95,
                    },
                ],
            },
            {
                number: 'LS1628106_0326323001591054431',
                date: '2020/05/12',
                amount: 15,
                status: 'Completed',
                items: [
                    {
                        image: '/static/img/no-coverart.jpg',
                        title: 'Beat Title',
                        type: 'Beat',
                        user: 'Alyssa Tucker',
                        price: 15,
                    },
                ],
            },
        ],
    }),
}
</script>
