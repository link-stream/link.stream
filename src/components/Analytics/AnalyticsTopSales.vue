<template>
    <b-container class="AnalyticsList">
        <b-card class="analytics-list-card" no-body>
            <b-card-text class="d-flex align-items-center text-card">
                <span>{{ topSales.item_title }}</span>
                <span class="ml-auto">{{ topSales.Count }}</span>
            </b-card-text>
        </b-card>
    </b-container>
</template>

<script>
export default {
    name: 'AnalyticsTopSales',
    props: {
        topSales: {
            type: Object,
        },
    },
}
</script>
