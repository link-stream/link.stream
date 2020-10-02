<template>
    <div class="AddedCartItem">
        <div class="item-cover">
            <img :src="cartItem.coverart" :alt="cartItem.title" />
        </div>
        <div class="item-body">
            <h4 class="item-title">
                {{ cartItem.title }}
            </h4>
            <small class="item-subtitle" v-if="cartItem.track_type == 2">
                {{ cartItem.type === 'pack' ? 'Beat Pack' : 'Beat' }} |
            </small>
            <small class="item-subtitle" v-else-if="cartItem.track_type == 3">
                Sound Kit |
            </small>
            <basic-button variant="link" class="btn-remove" @click="removeItem">
                <small>Remove</small>
            </basic-button>
        </div>
        <div class="item-price">
            {{ cartItem.price | currencyFormat }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddedCartItem',
    props: {
        cartItem: {
            type: Object,
        },
    },
    methods: {
        removeItem() {
            this.$store.dispatch('profile/removeCartItem', this.cartItem)
        },
    },
}
</script>
