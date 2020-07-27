<template>
    <b-modal
        modal-class="AddBankModal"
        centered
        v-model="open"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="font-weight-bolder">Bank Account Details</h4>
        </template>

        <template v-slot:default>
            <b-form-group label="Account holder name">
                <b-form-input
                    v-model="$v.form.holder_name.$model"
                    placeholder="Ex. John Doe"
                    :state="!$v.form.holder_name.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.holder_name.required">
                        Enter a account holder name.
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Routing number">
                <b-form-input
                    v-model="$v.form.routing_number.$model"
                    type="number"
                    placeholder=""
                    :state="!$v.form.routing_number.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.holder_name.required">
                        Enter a routing number.
                    </template>
                    <template v-else-if="!$v.form.holder_name.minLength || !$v.form.holder_name.maxLength">
                        The routing number must have 9 numbers.
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Account number">
                <b-form-input
                    v-model="$v.form.account_number.$model"
                    type="number"
                    placeholder=""
                    :state="!$v.form.account_number.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.account_number.required">
                        Enter a account number.
                    </template>
                    <template v-else-if="!$v.form.account_number.minLength">
                        The account number must have at least 10 numbers.
                    </template>
                    <template v-else-if="!$v.form.account_number.maxLength">
                        The account number must have at most 12 numbers.
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirm account number">
                <b-form-input
                    v-model="$v.form.confirm_account_number.$model"
                    type="number"
                    placeholder=""
                    :state="!$v.form.confirm_account_number.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.confirm_account_number.sameAsAccountNumber">
                        The account number must be identical
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>
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

import {
    required,
    sameAs,
    minLength,
    maxLength,
} from 'vuelidate/lib/validators'

export default {
    name: 'AddBankModal',
    data() {
        return {
            open: false,
            form: {
                holder_name: '',
                routing_number: '',
                account_number: '',
                confirm_account_number: '',
            },
            saving: false,
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    validations: {
        form: {
            holder_name: {
                required,
            },
            routing_number: {
                required,
                minLength: minLength(9),
                maxLength: maxLength(9),
            },
            account_number: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(12),
            },
            confirm_account_number: {
                required,
                sameAsAccountNumber: sameAs('account_number'),
            }
        }
    },
    created() {
        this.$bus.$on('modal.addBank.open', this.handleOpen)
        this.$bus.$on('modal.addBank.close', this.handleClose)
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
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.saving = true
            const params = {
                user_id: this.user.id,
                holder_name: this.form.holder_name,
                routing_number: this.form.routing_number,
                account_number: this.form.account_number,
                status: 'Checking',
                number: '1234',
            }
            const {
                status,
                message,
                error,
            } = await this.$store.dispatch('me/addBankInfo', { params })
            if (status === 'success') {
                this.$toast.success(message)
                // await this.$store.dispatch('me/loadPaymentMethods')
            } else {
                this.$toast.error(error)
            }
            this.saving = false
            this.close()
        },
    },
}
</script>
