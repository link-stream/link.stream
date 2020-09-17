<template>
    <b-modal modal-class="AddedCartModal" v-model="open" hide-backdrop>
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h2>Added to cart</h2>
        </template>

        <template v-slot:default>
            <AddedCartItem
                v-for="(cartItem, index) in addedCarts"
                :key="index"
                :cartItem="cartItem"
            />
        </template>
        <template v-slot:modal-footer class="border-top">
            <div class="mx-auto">
                <basic-button
                    class="btn-checkout"
                    variant="link"
                    @click="handleCheckoutClick"
                >
                    Checkout
                </basic-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import AddedCartItem from '@/components/Profile/AddedCartItem'
export default {
    name: 'AddedCartModal',
    components: {
        AddedCartItem,
    },
    computed: {
        ...mapGetters({
            addedCarts: 'profile/cartItems',
        }),
    },
    data() {
        return {
            open: false,
        }
    },
    created() {
        this.$bus.$on('modal.addedCart.open', this.handleOpen)
        this.$bus.$on('modal.addedCart.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        async handleCheckoutClick() {
            this.close()
        },
    },
}
</script>
