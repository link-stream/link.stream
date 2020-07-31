<template>
    <div class="tab PayoutsTab">
        <div class="pb-3 border-bottom">
            <h2 class="my-2">Payouts</h2>
            <p class="mb-3">
                Connect your bank account and PayPal to make the most from your music.
            </p>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-if="!loading && !bankInfo.number">
                <h6 class="font-weight-bold">Deposit into bank account</h6>
                <ul class="desc-list my-2">
                    <li>Get paid faster</li>
                    <li>No fees</li>
                </ul>
                <basic-button class="mt-3" @click="handleAddClick">
                    <img src="@/assets/img/ico/bank.svg" class="mr-2" />
                    Connect Bank Account
                </basic-button>
                <small class="d-block my-2">
                    You will be directed to Stripe to connect to your bank account.
                </small>
            </div>
            <bank-item v-else :bankInfo="bankInfo" />
        </div>
        <div class="py-3">
            <h6 class="my-3 font-weight-bold">PayPal</h6>
            <ul class="desc-list my-2">
                <li>Connect using your existing PayPal account</li>
                <li>Paypal is required to split the profit share of sales from collaborations.</li>
                <li>May include fees</li>
            </ul>
            <basic-button variant="warning" class="mt-3 btn-paypal">
                <img src="@/assets/img/ico/paypal.png" class="mr-2" />
                <span class="text-capitalize">Connect</span>
            </basic-button>
        </div>
        <AddBankModal />
    </div>
</template>

<script>
import AddBankModal from '~/components/Modal/AddBankModal'
import BankItem from './BankItem'
import { mapGetters } from 'vuex'
export default {
    name: 'PayoutsTab',
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters({
            bankInfo: 'me/bankInfo',
        }),
    },
    components: {
        AddBankModal,
        BankItem,
    },
    async created() {
        this.loading = true
        // await this.$store.dispatch('me/loadPaymentMethods')
        this.loading = false
    },
    methods: {
        handleAddClick() {
            this.$bus.$emit('modal.addBank.open')
        },
    }
}
</script>