<template>
    <div class="payout-item">
        <div class="item-cover">
            <font-awesome-icon
                v-if="bankInfo.is_default == 1"
                :icon="['fas', 'key']"
                class="mr-2"
                color="warning"
            />
            <img 
                v-if="cardImage"
                :src="cardImage" 
                :alt="bankInfo.holder_name" />
            <b-icon-credit-card v-else class="mr-2"/>    
        </div>
        <div class="item-body">
            <h4 class="item-title">
                <span>Bank Account</span>
            </h4>
            <small class="item-subtitle">
                <span>{{ bankInfo.holder_name }},  </span>
                <span> {{ bankInfo.status }} </span>
                <span> .... </span>
                <span> {{ bankInfo.number }}</span>
                <span>(USD)</span>
            </small>
        </div>
        
        <b-dropdown class="actions-menu" variant="icon" dropleft no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-h" />
            </template>
            <b-dropdown-item @click.prevent="setPrimary">
                Make Primary
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="deleteBank">
                Remove
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { appConstants } from '~/constants'
export default {
    name: 'BankItem',
    props: {
        bankInfo: {
            type: Object,
            required: true,
        },
    },
    computed: {
        cardImage() {
            const findIndex = appConstants.cardImages.findIndex(item => item.type === 'Bank')
            if (findIndex > -1) {
                return appConstants.cardImages[findIndex].url
            } else {
                return
            }
        },
    },
    methods: {    
        async deletePaymentMethod() {
            // const { status, message, error } = await this.$store.dispatch('me/deletePaymentMethod', { ...this.paymentMethod })
            // if (status === 'success') {
            //     this.$toast.success(message)
            // } else {
            //     this.$toast.error(error)
            // }
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
        }
    }
}
</script>
