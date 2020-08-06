<template>
    <b-modal
        modal-class="AddedCartModal"
        v-model="open"
        hide-backdrop
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h2>Added to cart</h2>
        </template>

        <template v-slot:default>
            <AddedCartItem
                v-for="cartItem in addedCarts"
                :key="cartItem.id"
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
import { appConstants } from '~/constants'
import AddedCartItem from '@/components/Profile/AddedCartItem'
export default {
    name: 'AddedCartModal',
    components: {
        AddedCartItem,
    },
    data() {
        return {
            open: false,
            addedCarts: [
                {
                    id: 1,
                    title: 'New Cart Item',
                    type: 'Beat',
                    price: 29.95,
                    coverart: appConstants.defaultCoverArt,
                },
                {
                    id: 2,
                    title: 'Ambient Sounds',
                    type: 'Sound Kit',
                    price: 29.95,
                    coverart: appConstants.defaultCoverArt,
                }
            ]
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
