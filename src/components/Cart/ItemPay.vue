<template>
    <div class="py-0">
        <b-card class="cart-item" no-body>
            <b-row class="px-0 py-0 text-center">
                <b-col cols="5" xl="1" lg="1" md="2" sm="2">
                    <b-img :src="itemPay.imgSrc" fluid></b-img>
                </b-col>
                <b-col cols="7" xl="8" lg="7" md="4" sm="4" class="center">
                    <b-row>
                        <span class="details-items-pay mb-1">{{
                            itemPay.name
                        }}</span>
                    </b-row>
                    <b-row>
                        <span class="details-items-pay">
                            {{ itemPay.type }} sold by
                        </span>
                        <b-button
                            variant="link"
                            class="mx-1 details-items-pay-link"
                            :to="{ name: 'legal' }"
                            >{{ itemPay.artistName }}</b-button
                        >
                        <span class="details-items-pay">
                            - $ {{ itemPay.price }}</span
                        >
                    </b-row>
                </b-col>
                <b-col cols="12" xl="3" lg="4" md="6" sm="6" class="center">
                    <b-button pill class="continue-shopping">
                        <b-icon font-scale="1" icon="download" class="mr-2" />
                        Download</b-button
                    >
                    <!--IconButton class="mx-2" icon="dot-menu-v" /-->
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { appConstants } from '~/constants'
import Cookies from 'js-cookie'
export default {
    name: 'ItemPay',
    props: {
        itemPay: {
            type: Object,
        },
    },
    data() {
        return {
            soldBy: '',
        }
    },
    mounted() {},
    methods: {},
}
</script>
