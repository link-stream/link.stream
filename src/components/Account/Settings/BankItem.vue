<template>
    <div class="payout-item">
        <div class="item-cover">
            <font-awesome-icon
                v-if="bankInfo.is_default == 1"
                :icon="['fas', 'key']"
                class="mr-2"
                color="warning"
            />
            <img v-if="cardImage" :src="cardImage" />
            <b-icon-credit-card v-else class="mr-2" />
        </div>
        <div class="item-body">
            <div v-if="type === 'bank'">
                <h4 class="item-title">
                    <span>Bank Account</span>
                </h4>
                <small class="item-subtitle">
                    <span>{{ bankInfo.holder_name }},</span>
                    <span>{{ bankInfo.status }}</span>
                    <span> .... </span>
                    <span> {{ bankInfo.number }}</span>
                    <span>(USD)</span>
                </small>
            </div>
            <div v-else>
                <h4 class="item-title">
                    <span>PayPal</span>
                </h4>
                <small class="item-subtitle">
                    <span>{{ bankInfo.paypal_email }},</span>
                </small>
            </div>
        </div>
        <b-dropdown class="actions-menu" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-h" />
            </template>
            <b-dropdown-item @click.prevent="setPrimary">
                Make Primary
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="deletePaymentMethod">
                Remove
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { appConstants } from '~/constants'
import { api } from '~/services'
import { mapGetters } from 'vuex'
export default {
    name: 'BankItem',
    props: {
        bankInfo: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            default: 'bank',
        },
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            auth: 'auth/user',
        }),
        cardImage() {
            const findIndex = appConstants.cardImages.findIndex(
                item => item.type === this.type
            )
            if (findIndex > -1) {
                return appConstants.cardImages[findIndex].url
            } else {
                return ''
            }
        },
    },
    methods: {
        async deletePaymentMethod() {
            if (this.type === 'paypal') {
                // const response = await api.account.deletePaypalAccount(
                //     this.user.id,
                //     localStorage.getItem('paypal_type')
                // )
                const params = { user_token: this.auth.user_token }
                const response = await api.account.deletePaypalAccountNew(
                    this.auth.user_id,                    
                    localStorage.getItem('paypal_type'),
                    params,
                )
                if (response.status !== 'success') {
                    this.$toast.error(
                        'An error occurred while deleting the paypal account.'
                    )
                } else {
                    this.$toast.success('The account was deleted successfully.')
                    this.$emit('delete')
                }
            }
        },
        async setPrimary() {
            // const { status, message, error } = await this.$store.dispatch(
            //     'me/updatePaymentMethod',
            //     {
            //         payment_id: this.paymentMethod.id,
            //         params: {
            //             is_default: 1
            //         }
            //     }
            // )
            // if (status === 'success') {
            //     this.$toast.success(message)
            // } else {
            //     this.$toast.error(error)
            // }
        },
    },
}
</script>
