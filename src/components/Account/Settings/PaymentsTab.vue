<template>
    <div class="tab PaymentsTab">
        <div class="my-5">
            <h2 class="my-2">Payment Method</h2>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-else>
                <p class="mb-3" v-if="paymentMethods.length === 0">
                    Add a payment method to be used for purchases you make on LinkStream including subscriptions
                </p>
                <p v-else class="mb-3">
                    Add and manage payment methods
                </p>
                <payment-method-item
                    v-for="paymentMethod in paymentMethods"
                    :key="paymentMethod.id"
                    :paymentMethod="paymentMethod"
                >
                </payment-method-item>
                <basic-button @click="handleAddClick" class="mt-3" >
                    Add Payment Method
                </basic-button>
            </div>
        </div>
        <div class="my-5">
            <h2 class="my-3">Subscriptions</h2>
            <h5 class="my-1">Standard Plan</h5>
            <span>No monthly fee - </span>
            <basic-button variant="link">
                Change Plan
            </basic-button>
        </div>
        <b-row>
            <b-col class="upgrade-pro p-4">
                <div class="float-left">
                    <h5 class="mb-2">Upgrade to Pro</h5>
                    <p>
                        Get the most out of LinkStream with advanced features for producers.
                    </p>
                </div>
                <div class="float-right mt-3">
                    <b-button 
                        pill
                        class="bg-transparent text-white"
                        size="md"
                    >
                        Upgrade Now
                    </b-button>
                </div>
            </b-col>
        </b-row>
        <AddPaymentModal />
    </div>
</template>

<script>
import AddPaymentModal from '~/components/Modal/AddPaymentModal'
import PaymentMethodItem from './PaymentMethodItem'
import { mapGetters } from 'vuex'
export default {
    name: 'PaymentsTab',
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters({
            paymentMethods: 'me/paymentMethods',
        }),
    },
    components: {
        AddPaymentModal,
        PaymentMethodItem,
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadPaymentMethods')
        this.loading = false
    },
    methods: {
        handleAddClick() {
            this.$bus.$emit('modal.addPayment.open')
        },
    }
}
</script>