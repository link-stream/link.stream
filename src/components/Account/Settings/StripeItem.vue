<template>
    <div class="stripe-item">
        <div class="item-cover">
            <img src="@/assets/img/ico/bank-dark.svg" class="mr-2 bank-img" />
        </div>
        <div class="item-body">
            <h4 class="item-title">
                <span>Stripe Conected</span>
            </h4>
        </div>
        <b-dropdown class="actions-menu mt-4" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-h" />
            </template>
            <b-dropdown-item @click.prevent="makePrimary">Make Primary</b-dropdown-item>
            <b-dropdown-item :href="url" target="_blank">Go to Stripe</b-dropdown-item>
            <b-dropdown-item @click.prevent="deleteStripeAccount">Remove</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { api } from '~/services'
export default {
    name: 'StripeItem',
    props: {
        user: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        accountId: {
            type: String,
            required: true,
        },
    },
    methods: {
        makePrimary() {},
        async deleteStripeAccount() {
            const response = await api.account.deleteStripeAccount(
                this.user.id,
                this.accountId
            )
            if (response.status !== 'success') {
                this.$toast.error(
                    'An error occurred while deleting the stripe account.'
                )
            } else {
                this.$toast.success('The account was deleted successfully.')
                this.$emit('delete')
            }
        },
    },
}
</script>
