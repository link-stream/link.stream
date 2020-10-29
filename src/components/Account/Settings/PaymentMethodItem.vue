<template>
    <div class="payment-method-item">
        <div class="item-cover">
            <font-awesome-icon
                v-if="paymentMethod.is_default == 1"
                :icon="['fas', 'key']"
                class="mr-2"
                color="warning"
            />
            <img
                v-if="cardImage"
                :src="cardImage"
                :alt="paymentMethod.cc_type"
            />
            <b-icon-credit-card v-else class="mr-2 h1 align-middle" />
        </div>
        <div class="item-body">
            <h4 class="item-title">
                <span>{{ paymentMethod.cc_type }}</span>
                <span class="mx-2">....</span>
                <span>{{ paymentMethod.cc_number }}</span>
            </h4>
            <small class="item-subtitle">
                Expiration: {{ paymentMethod.expiration_date }}
            </small>
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
export default {
    name: 'PaymentMethodItem',
    props: {
        paymentMethod: {
            type: Object,
            required: true,
        },
    },
    computed: {
        cardImage() {
            const findIndex = appConstants.cardImages.findIndex(
                item => item.type === this.paymentMethod.cc_type.toLowerCase()
            )
            if (findIndex > -1) {
                return appConstants.cardImages[findIndex].url
            }
            return null
        },
    },
    methods: {
        async deletePaymentMethod() {
            const { status, message, error } = await this.$store.dispatch(
                'me/deletePaymentMethod',
                {
                    ...this.paymentMethod,
                }
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
        async setPrimary() {
            const { status, message, error } = await this.$store.dispatch(
                'me/updatePaymentMethod',
                {
                    payment_id: this.paymentMethod.id,
                    params: {
                        is_default: 1,
                    },
                }
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
    },
}
</script>
