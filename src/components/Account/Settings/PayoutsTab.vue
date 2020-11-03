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
            <div v-if="!loading && !payoutsEnabled">
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
            <StripeItem
                v-else-if="payoutsEnabled"
                :user="userInfo"
                :url="loginUrl"
                :accountId="accountId"
                @delete="deleteStripeAccount"
            />
        </div>
        <div class="paypal">
            <LoadingSpinner class="page-loader" v-if="loadingPaypal" />
            <div v-if="!loadingPaypal && !paypalInfo.paypal_email">
                <h6 class="sub-title">PayPal</h6>
                <ul class="desc-list">
                    <li>Connect using your existing PayPal account</li>
                    <li>
                        Paypal is required to split the profit share of sales from
                        collaborations.
                    </li>
                    <li>May include fees</li>
                </ul>
                <span id='paypal_container'></span>
                
            </div>
            <div v-else-if="paypalInfo.paypal_email">
                <bank-item :bankInfo="paypalInfo" type="paypal" @delete="deletePaypalAccount" />
            </div>
        </div>
        <AddBankModal />
    </div>
</template>

<script>
import { api } from '~/services'
import StripeItem from './StripeItem'
import AddBankModal from '~/components/Modal/AddBankModal'
import BankItem from './BankItem'
import { mapGetters } from 'vuex'
export default {
    name: 'PayoutsTab',
    data: () => ({
        loading: false,
        paypalInfo: {},
        payoutsEnabled: false,
        state: 3,
        loginUrl: '#',
        connectUrl: '',
        accountId: '',
        loadingPaypal: false,
    }),
    computed: {
        ...mapGetters({
            bankInfo: 'me/bankInfo',
            userInfo: 'me/user',
        }),
    },
    components: {
        AddBankModal,
        BankItem,
        StripeItem,
    },
    async created() {
        this.loading = true
        this.loadingPaypal = true
        const stripeAccount = await api.account.getStripeAccount(
            this.userInfo.id
        )
        if (stripeAccount.status === 'success' && stripeAccount.data) {
            switch (stripeAccount.data.status) {
                case 'ACTIVE':
                    this.state = 1
                    this.accountId = stripeAccount.data.account_id
                    this.payoutsEnabled = true
                    this.loginUrl = stripeAccount.data.login_url
                    break
                case 'APPROVED':
                    this.state = 2
                    this.accountId = stripeAccount.data.account_id
                    this.payoutsEnabled = false
                    this.connectUrl = stripeAccount.data.login_url
                    this.$toast.error(
                        'You still have pending information to fill out. Go to -Connect Bank Account-.'
                    )
                    break
                case 'PENDING':
                    this.state = 3
                    this.payoutsEnabled = false
                    this.connectUrl = stripeAccount.data.login_url
                    break
            }
        }
        this.loading = false
        await this.getPaypalInfo()
        this.initPaypalButton()
        localStorage.setItem('paypal_type', 'payout')
        this.loadingPaypal = false
    },
    methods: {
        initPaypalButton() {
            // eslint-disable-next-line
            paypal.use(['login'], function(login) {
                login.render({
                    'appid': process.env.VUE_APP_PAYPAL_CLIENT_ID,
                    'authend':'sandbox',
                    'scopes': 'openid email',
                    'containerid': 'paypal_container',
                    'responseType': 'code id_Token',
                    'locale': 'en-us',
                    'buttonType': 'CWP',
                    'buttonShape': 'pill',
                    'buttonSize': 'lg',
                    'fullPage': 'true',
                    'returnurl': 'https://dev-link-vue.link.stream/app/account/payments/paypal_confirm'
                })
            })
        },
        async handleAddClick() {
            if (this.state === 3) {
                const response = await api.account.connectStripeAccount({
                    debug: false,
                    user_id: this.userInfo.id,
                })
                if (response.status === 'success') {
                    this.accountId = response.account_id
                    localStorage.setItem(
                        'user_id',
                        JSON.stringify(this.userInfo.id)
                    )
                    localStorage.setItem(
                        'account_id',
                        JSON.stringify(response.account_id)
                    )
                    window.open(response.account_url, '_self')
                    return
                }
                this.$toast.error('Could not connect to stripe.')
            } else {
                window.open(this.connectUrl, '_self')
            }
        },
        deleteStripeAccount() {
            this.payoutsEnabled = false
            this.state = 3
        },
        async getPaypalInfo() {
            const response = await api.account.getPaypalAccount(this.userInfo.id, 'payout')
            if (response.status === 'success') {
                this.paypalInfo = {
                    payouts_enabled: response.payouts_enabled,
                    paypal_email: response.paypal_email
                }
            } else {
                this.paypalInfo = {}
            } 
        },
        deletePaypalAccount() {
            this.paypalInfo = {}
            this.initPaypalButton()
        },
    },
}
</script>
