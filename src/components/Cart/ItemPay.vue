<template>
    <div class="py-0">
        <b-card class="cart-item" no-body>
            <b-row class="px-0 py-0 text-center">
                <b-col cols="5" xl="1" lg="1" md="2" sm="2">
                    <b-img :src="itemPay.imgSrc" fluid></b-img>
                </b-col>
                <b-col cols="7" xl="8" lg="6" md="4" sm="4" class="center">
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
                            :to="{
                                name: 'publicProfile',
                                params: { url: itemPay.artist_url },
                            }"
                            >{{ itemPay.artistName }}</b-button
                        >
                        <span class="details-items-pay">
                            - {{ itemPay.price | currencyFormat }}</span
                        >
                    </b-row>
                </b-col>
                <b-col cols="12" xl="3" lg="5" md="6" sm="6" class="center">
                    <basic-button
                        pill
                        block
                        size="md"
                        :disabled="status_loading_pay"
                        class="continue-to-payment"
                        @click="handleDownloadClick"
                    >
                        <div v-if="status_loading_pay">
                            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
                            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
                            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
                        </div>
                        <div v-else>
                            <img class="img-icon" src="@/assets/img/ico/download-wh.svg" />
                            Download
                        </div>
                    </basic-button>
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
            status_loading_pay: false,
        }
    },
    mounted() {},
    methods: {
        handleDownloadClick() {
            this.status_loading_pay = true
            window.open(this.itemPay.downloadUrl.url, '_self')
            this.status_loading_pay = false
        },
    },
}
</script>
