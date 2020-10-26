<template>
    <div class="DashboardSales">
        <b-button class="sales-btn" :to="{ name: 'accountSales' }">
            <b-row no-gutters>
                <b-col cols="2" sm="1" xs="2">
                    <img src="@/assets/img/ico/dollar-sign-solid.svg" />
                </b-col>
                <b-col cols="8" sm="10" xs="8">
                    <p>
                        <b>{{ sales }}</b> sales this week
                    </p>
                </b-col>
                <b-col cols="2" sm="1" xs="2">
                    <img src="@/assets/img/ico/chevron-right.svg" />
                </b-col>
            </b-row>
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'DashboardSales',
    props: {
        sales: {
            type: Number,
        },
    },
}
</script>
