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
            <div v-if="currentTab === 'card' && open">
                <b-form-row>
                    <b-col sm="6">
                        <b-form-group label="First name">
                            <b-form-input
                                v-model="$v.form.first_name.$model"
                                placeholder="First name"
                                :state="!$v.form.first_name.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.first_name.required">
                                    Enter a first name.
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <b-col sm="6">
                        <b-form-group label="Last name">
                            <b-form-input
                                v-model="$v.form.last_name.$model"
                                placeholder="Last name"
                                :state="!$v.form.last_name.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.last_name.required">
                                    Enter a last name.
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-group label="Card information">
                    <b-form-input
                        v-model="$v.form.cc_number.$model"
                        placeholder="Card Number"
                        :state="
                            !$v.form.cc_number.$error && !cardErrors.cc_number
                        "
                        v-cardformat:formatCardNumber
                    ></b-form-input>
                    <b-form-input
                        v-model="$v.form.expiration_date.$model"
                        placeholder="Expiration"
                        class="col-6 float-left"
                        :state="
                            !$v.form.expiration_date.$error &&
                                !cardErrors.expiration_date
                        "
                        v-cardformat:formatCardExpiry
                    ></b-form-input>
                    <b-form-input
                        v-model="$v.form.cvv.$model"
                        placeholder="CVV"
                        class="col-6"
                        :state="!$v.form.cvv.$error && !cardErrors.cvv"
                        v-cardformat:formatCardCVC
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.cc_number.required">
                            Enter a card number.
                        </template>
                        <template v-else-if="cardErrors.cc_number">
                            {{ cardErrors.cc_number }}
                        </template>
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.expiration_date.required">
                            Enter a expiration date.
                        </template>
                        <template v-else-if="cardErrors.expiration_date">
                            {{ cardErrors.expiration_date }}
                        </template>
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.cvv.required">
                            Enter a cvv.
                        </template>
                        <template v-else-if="cardErrors.cvv">
                            {{ cardErrors.cvv }}
                        </template>
                    </b-form-invalid-feedback>
                </b-form-group>
                <small>
                    I authorize LinkStream Inc. to save this payment method and
                    automatically charge this payment method for any
                    subscriptions associated with it.
                </small>
            </div>
            <div v-else class="paypal-action">
                <basic-button variant="warning">
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
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
            $cardFormat: Vue.prototype.$cardFormat,
            cardErrors: {},
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    validations: {
        form: {
            first_name: {
                required,
            },
            last_name: {
                required,
            },
            cc_number: {
                required,
            },
            expiration_date: {
                required,
            },
            cvv: {
                required,
            },
        },
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
            this.clearForm()
            this.open = true
        },
        async handleSaveClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }

            this.cardErrors = {}
            if (!this.$cardFormat.validateCardNumber(this.form.cc_number)) {
                this.cardErrors.cc_number = 'Invalid Credit Card Number.'
            }

            if (
                !this.$cardFormat.validateCardExpiry(this.form.expiration_date)
            ) {
                this.cardErrors.expiration_date = 'Invalid Expiration Date.'
            }

            if (!this.$cardFormat.validateCardCVC(this.form.cvv)) {
                this.cardErrors.cvv = 'Invalid CVV.'
            }

            if (Object.keys(this.cardErrors).length > 0) {
                return
            }
            this.saving = true
            const params = {
                user_id: this.user.id,
                ...this.form,
            }
            params.cc_number = params.cc_number.replace(/\s/g, '')
            params.expiration_date = params.expiration_date.replace(/\s/g, '')
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
            this.clearForm()
            this.saving = false
            this.close()
        },
        clearForm() {
            this.form = {
                first_name: '',
                last_name: '',
                cc_number: '',
                expiration_date: '',
                cvv: '',
            }
            this.$v.form.$reset()
        },
    },
}
</script>
