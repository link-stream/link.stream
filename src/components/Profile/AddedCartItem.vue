<template>
    <div class="AddedCartItem">
        <div class="item-cover">
            <img :src="cartItem.coverart" :alt="cartItem.title" />
        </div>
        <div class="item-body">
            <h4 class="item-title">
                {{ cartItem.title }}
            </h4>
            <small class="item-subtitle">
                {{ cartItem.type }} |
            </small>
            <basic-button
                variant="link"
                class="btn-remove"
            >
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
}
</script>
