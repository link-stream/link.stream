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
                    <li :class="{ active: currentTab === 'card' }">
                        <b-icon-credit-card class="mr-2" />
                        <a href="#" @click.prevent="currentTab = 'card'">
                            Credit Card
                        </a>
                    </li>
                    <li :class="{ active: currentTab === 'paypal' }">
                        <font-awesome-icon
                            :icon="['fab', 'paypal']"
                            class="mr-2"
                        />
                        <a href="#" @click.prevent="currentTab = 'paypal'">
                            Paypal
                        </a>
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
                                v-model="form.first_name"
                                placeholder="First name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col sm="6">
                        <b-form-group label="First name">
                            <b-form-input
                                v-model="form.last_name"
                                placeholder="Last name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-group label="Card information">
                    <b-form-input
                        v-model="form.cc_number"
                        placeholder="Card Number"
                    ></b-form-input>
                    <b-form-input
                        v-model="form.expiration_date"
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
                    I authorize LinkStream Inc. to save this payment method and
                    automatically charge this payment method for any subscriptions associated with it.
                </p>
            </div>
            <div v-else class="text-center">
                <basic-button variant="warning" class="my-5">
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
import { mapGetters } from 'vuex'
export default {
    name: 'AddPaymentModal',
    data() {
        return {
            open: false,
            currentTab: 'card',
            form: {
                first_name: '',
                last_name: '',
                cc_number: '',
                expiration_date: '',
                cvv: '',
            },
            saving: false,
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
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
        async handleSaveClick() {
            this.saving = true
            const params = {
                user_id: this.user.id,
                ...this.form,
            }
            const {
                status,
                message,
                error,
            } = await this.$store.dispatch('me/createPaymentMethod', { params })
            if (status === 'success') {
                this.$toast.success(message)
                await this.$store.dispatch('me/loadPaymentMethods')
            } else {
                this.$toast.error(error)
            }
            this.saving = false
            this.close()
        },
    },
}
</script>
