<template>
    <b-modal
        modal-class="AddPaymentModal"
        centered
        v-model="open"
        :hide-footer="currentTab === 'paypal'"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <div class="tabnav">
                <ul>
                    <li
                        :class="{ active: currentTab === 'card' }"
                    >
                        <b-icon-credit-card class="mr-2"/>
                        <a href="#" @click.prevent="currentTab='card'">Credit Card</a>
                    </li>
                    <li
                        :class="{ active: currentTab === 'paypal' }"
                    >
                        <font-awesome-icon
                            :icon="['fab', 'paypal']"
                            class="mr-2"
                        />
                        <a href="#" @click.prevent="currentTab='paypal'">Paypal</a>
                    </li>
                </ul>
            </div>
        </template>    

        <template v-slot:default>
            <div v-if="currentTab === 'card'">
                <b-form-row>
                    <b-col sm="6">
                        <b-form-group label="First name">
                            <b-form-input
                                v-model="form.firstname"
                                placeholder="First name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col sm="6">
                        <b-form-group label="First name">
                            <b-form-input
                                v-model="form.lastname"
                                placeholder="Last name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-group
                    label="Card information"
                >
                    <b-form-input
                        v-model="form.card_number"
                        placeholder="Card Number" 
                    ></b-form-input>
                    <b-form-input
                        v-model="form.expiration"
                        placeholder="Expiration"
                        class="col-6 float-left"
                    ></b-form-input>
                    <b-form-input
                        v-model="form.cvv"
                        placeholder="CVV"
                        class="col-6" 
                    ></b-form-input>
                </b-form-group>
                <p>
                    I authorize LinkStream Inc. to save this payment method and automatically charge this payment method for any subscriptions associated with it.
                </p>
            </div>
            <div v-else class="text-center">
                <basic-button
                    variant="warning"
                    class="my-5"
                >
                    Connect to
                    <img src="@/assets/img/ico/paypal.png" />
                </basic-button>
            </div>
        </template>
        <template v-slot:modal-footer>
            <div class="right-col">
                <basic-button
                    class="action-btn cancel-btn"
                    variant="secondary"
                    :disabled="saving"
                    @click="close"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    class="action-btn"
                    :loading="saving"
                    @click="handleSaveClick"
                >
                    Add
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>

export default {
    name: 'AddPaymentModal',
    data() {
        return {
            open: false,
            currentTab: 'card',
            form: {
                firstname: '',
                lastname: '',
                card_number: '',
                expiration: '',
                cvv: '',
            },
        }
    },
    created() {
        this.$bus.$on('modal.addPayment.open', this.handleOpen)
        this.$bus.$on('modal.addPayment.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
    },
}
</script>
