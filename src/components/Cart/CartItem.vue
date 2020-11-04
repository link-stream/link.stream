<template>
    <div>
        <b-card class="cart-item" no-body>
            <b-card-sub-title class="ml-3">
                <b-avatar variant="dark" :src="avatarSrc"></b-avatar>
                <span class="name-artist ml-2">{{ artistName }}</span>
            </b-card-sub-title>
            <div class="py-0" v-for="(item, index) in elements" :key="index">
                <ElementArt
                    class="py-0"
                    :imgSrc="item.imgSrc"
                    :name="item.name"
                    :type="item.type"
                    :price="item.price"
                    :index="item.index"
                    :id="item.id"
					:url_profile="url_profile"
                ></ElementArt>
                <div class="divider"></div>
            </div>
        </b-card>
    </div>
</template>

<script>
import ElementArt from '@/components/Cart/ElementArt'
export default {
    name: 'CartItem',
    components: {
        ElementArt,
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
		url_profile: {
            type: String,
        },
    },
}
</script>
