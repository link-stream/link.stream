<template>
    <div class="py-0">
        <b-card class="cart-item-dark py-2" no-body>
            <b-row class="px-0 py-0 text-center">
                <b-col cols="12" xl="3" lg="3" md="3">
                    <b-img :src="imgSrc" fluid></b-img>
                </b-col>
                <b-col cols="12" xl="5" lg="3" md="4" class="center">
                    <b-row>
                        <span class="name-item-dark mb-1">{{ name }}</span>
                    </b-row>
                    <b-row>
                        <span class="type-item-dark">{{ type }}</span>
                    </b-row>
                </b-col>
                <b-col cols="12" xl="4" lg="6" md="5" class="text-right center">
                    <span class="details-price-dark mr-2">$</span>
                    <span class="details-price-dark">{{
                        price.toFixed(2)
                    }}</span>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'ElementArtDark',
    props: {
        imgSrc: {
            type: String,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        price: {
            type: Number,
        },
        index: {
            type: Number,
        },
    },
}
</script>
