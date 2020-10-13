<template>
    <div>
        <b-card class="cart-item-dark">
            <b-card-sub-title>
                <b-avatar variant="dark" :src="avatarSrc"></b-avatar>
                <span class="name-artist-dark ml-2">{{ artistName }}</span>
            </b-card-sub-title>
            <div class="py-0" v-for="(item, index) in elements" :key="index">
                <ElementArtDark
                    class="py-0"
                    :imgSrc="item.imgSrc"
                    :name="item.name"
                    :type="item.type"
                    :price="item.price"
                    :index="item.index"
                ></ElementArtDark>
                <div class="divider"></div>
            </div>
        </b-card>
    </div>
</template>

<script>
import ElementArtDark from '@/components/Cart/ElementArtDark'
export default {
    name: 'CartItemDark',
    components: {
        ElementArtDark,
    },
    props: {
        avatarSrc: {
            type: String,
        },
        artistName: {
            type: String,
        },
        elements: {
            type: Array,
        },
        index: {
            type: Number,
        },
    },
}
</script>
