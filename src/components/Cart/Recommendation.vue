<template>
    <b-col cols="12" xl="2" lg="3" md="4" sm="6">
        <b-row class="ml-1 py-2 px-2">
            <b-img :src="imgSrc" fluid></b-img>
        </b-row>
        <b-row class="ml-3">
            <span class="details-recommendation mb-1">{{ name }}</span>
        </b-row>
        <b-row class="ml-3">
            <span class="details-recommendation">{{ type }}</span>
        </b-row>
    </b-col>
</template>

<script>
export default {
    name: 'Recommendation',
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
        id: {
            type: String,
        },
    },
    methods: {},
}
</script>
