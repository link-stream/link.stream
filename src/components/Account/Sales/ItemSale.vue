<template>
    <div class="py-0">
        <b-card class="cart-item" no-body>
            <b-row class="px-0 py-0 text-center">
                <b-col cols="5" xl="1" lg="2" md="2" sm="2">
                    <b-img :src="itemSale.data_image" fluid></b-img>
                </b-col>
                <b-col cols="7" xl="6" lg="3" md="3" sm="4" class="center">
                    <b-row>
                        <span class="title-item-sale mb-1">{{
                            itemSale.item_title
                        }}</span>
                    </b-row>
                    <b-row>
                        <span class="detail-item-sale">
                            {{ itemSale.item_track_type }} - ${{
                                itemSale.item_amount
                            }}
                        </span>
                    </b-row>
                </b-col>
                <b-col
                    cols="12"
                    xl="4"
                    lg="7"
                    md="7"
                    sm="6"
                    class="center px-0"
                    v-show="itemSale.item_track_type === 'beat'"
                >
                    <b-button pill class="continue-shopping">
                        View License</b-button
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
    name: 'ItemSale',
    props: {
        itemSale: {
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
