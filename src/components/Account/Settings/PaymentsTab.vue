<template>
    <div class="tab PaymentsTab">
        <div class="my-5">
            <h2 class="my-2">Payment Method</h2>
            <p class="mb-3">
                Add a payment method to be used for purchases you make on LinkStream including subscriptions
            </p>
            <basic-button
                @click="handleAddClick"
            >
                Add Payment Method
            </basic-button>
        </div>
        <div class="my-5">
            <h2 class="my-3">Subscriptions</h2>
            <h5 class="my-1">Standard Plan</h5>
            <span>No monthly fee - </span>
            <basic-button
                variant="link"
            >
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
export default {
    name: 'PaymentsTab',
    data: () => ({
        loading: false,
    }),
    components: {
        AddPaymentModal
    },
    methods: {
        handleAddClick() {
            this.$bus.$emit('modal.addPayment.open')
        },
    }
}
</script>