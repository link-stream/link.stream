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
                    View cart
                </basic-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
//import { mapGetters } from 'vuex'
import AddedCartItem from '@/components/Profile/AddedCartItem'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
import router from '~/router'
export default {
    name: 'AddedCartModal',
    components: {
        AddedCartItem,
    },
    computed: {
        /*...mapGetters({
            addedCarts: 'profile/cartItems',
        }),
        addedCarts: {
            get() {
                return Cookies.getJSON('appConstants.cookies.cartItem.name')
            },
        },*/
    },
    data() {
        return {
            open: false,
            addedCarts: '',
        }
    },
    created() {
        this.$bus.$on('modal.addedCart.open', this.handleOpen)
        this.$bus.$on('modal.addedCart.close', this.handleClose)
    },
    mounted() {},
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.addedCarts = Cookies.getJSON(
                'appConstants.cookies.cartItem.name'
            )
            console.log('addedCarts', this.addedCarts)
            this.open = true
        },
        async handleCheckoutClick() {
            if (this.addedCarts !== undefined && this.addedCarts.length !== 0) router.push({ name: 'cart' })
            this.close()
        },
    },
}
</script>
