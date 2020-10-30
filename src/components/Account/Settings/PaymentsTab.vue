<template>
    <div class="tab PaymentsTab">
        <div class="payment-method">
            <h2 class="section-title">Payment Method</h2>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-else>
                <p class="description" v-if="paymentMethods.length === 0">
                    Add a payment method to be used for purchases you make on
                    LinkStream including subscriptions
                </p>
                <p v-else class="description">
                    Add and manage payment methods
                </p>
                <div class="payment-method-content">
                    <payment-method-item
                        v-for="paymentMethod in paymentMethods"
                        :key="paymentMethod.id"
                        :paymentMethod="paymentMethod"
                    >
                    </payment-method-item>
                    <div v-if="paypalInfo.paypal_email">
                        <bank-item :bankInfo="paypalInfo" type="paypal" @delete="deletePaypalAccount" />
                    </div>
                </div>
                <basic-button @click="handleAddClick" class="btn-payment">
                    Add Payment Method
                </basic-button>
            </div>
        </div>
        <div class="subscription">
            <h2 class="section-title">Subscriptions</h2>
            <h6 class="sub-title">Standard Plan</h6>
            <span>No monthly fee - </span>
            <basic-button variant="link">
                Change Plan
            </basic-button>
        </div>
        <div class="upgrade-pro">
            <b-row>
                <b-col>
                    <div class="text">
                        <h6 class="title">Upgrade to Pro</h6>
                        <p>
                            Get the most out of LinkStream with advanced
                            features for producers.
                        </p>
                    </div>
                    <div class="action">
                        <b-button pill class="btn-upgrade" size="md">
                            Upgrade Now
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </div>
        <AddPaymentModal />
    </div>
</template>

<script>
import AddPaymentModal from '~/components/Modal/AddPaymentModal'
import PaymentMethodItem from './PaymentMethodItem'
import BankItem from './BankItem'
import { mapGetters } from 'vuex'
import { api } from '~/services'
export default {
    name: 'PaymentsTab',
    data: () => ({
        loading: false,
        paypalInfo: {},
    }),
    computed: {
        ...mapGetters({
            paymentMethods: 'me/paymentMethods',
            user: 'me/user',
        }),
    },
    components: {
        AddPaymentModal,
        PaymentMethodItem,
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadPaymentMethods')
        localStorage.setItem('paypal_type', 'payment')
        await this.getPaypalInfo()
        this.loading = false
    },
    methods: {
        handleAddClick() {
            this.$bus.$emit('modal.addPayment.open')
        },
        async getPaypalInfo() {
            const accountType = localStorage.getItem('paypal_type') 
            const response = await api.account.getPaypalAccount(this.user.id, accountType)
            if (response.status === 'success') {
                this.paypalInfo = {
                    payouts_enabled: response.payouts_enabled,
                    paypal_email: response.paypal_email
                }
            }
        },
        deletePaypalAccount() {
            this.paypalInfo = {}
        }
    },
}
</script>
