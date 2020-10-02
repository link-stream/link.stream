<template>
    <div class="tab PayoutsTab">
        <div class="payout">
            <h2 class="section-title">Payouts</h2>
            <p class="description">
                Connect your bank account and PayPal to make the most from your
                music.
            </p>
        </div>
        <div class="bank">
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-if="!loading && !bankInfo.number">
                <h6 class="sub-title">Deposit into bank account</h6>
                <ul class="desc-list">
                    <li>Get paid faster</li>
                    <li>No fees</li>
                </ul>
                <basic-button @click="handleAddClick" class="btn-bank">
                    <img src="@/assets/img/ico/bank.svg" class="mr-2" />
                    Connect Bank Account
                </basic-button>
                <small class="d-block">
                    You will be directed to Stripe to connect to your bank
                    account.
                </small>
            </div>
            <bank-item v-else :bankInfo="bankInfo" />
        </div>
        <div class="paypal">
            <h6 class="sub-title">PayPal</h6>
            <ul class="desc-list">
                <li>Connect using your existing PayPal account</li>
                <li>
                    Paypal is required to split the profit share of sales from
                    collaborations.
                </li>
                <li>May include fees</li>
            </ul>
            <basic-button variant="warning" class="btn-paypal">
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
    },
}
</script>
