<template>
    <div class="Card LicenseCard" :class="{ 'is-editing': editing }">
        <LsIconButton
            icon="close"
            class="close-btn"
            title="Close"
            @click="handleCancelClick"
        />
        <div class="block-view">
            <b-form-checkbox
                :checked="checked"
                @change="handleCheckChange"
            ></b-form-checkbox>
            <div class="Card-body">
                <div>
                    <div class="Card-title">
                        {{ license.title }} - ${{
                            license.price | trimZeroDecimal
                        }}
                    </div>
                    <small class="Card-subtitle">
                        {{ license.descripcion }}
                    </small>
                </div>
            </div>
            <LsButton
                variant="icon-bg"
                class="edit-btn"
                title="Edit"
                @click="handleEditClick"
            />
        </div>
        <div class="block-edit">
            <div class="edit-form">
                <b-form-group label="Adjust price">
                    <b-form-input
                        type="number"
                        v-model="$v.form.price.$model"
                        :state="!$v.form.price.$error"
                    />
                    <b-form-invalid-feedback>
                        Price can't be blank
                    </b-form-invalid-feedback>
                </b-form-group>
            </div>
            <div class="edit-actions">
                <div class="col-left">
                    To customize your default license terms, go to
                    <ls-button variant="link">Licenses</ls-button>
                </div>
                <div class="col-right">
                    <ls-button
                        class="cancel-btn"
                        size="xs"
                        variant="secondary"
                        @click="handleCancelClick"
                    >
                        Cancel
                    </ls-button>
                    <ls-button
                        size="xs"
                        variant="black"
                        @click="handleSaveClick"
                    >
                        Save
                    </ls-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'LicenseCard',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        license: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            form: {
                price: this.license.price,
            },
        }
    },
    validations: {
        form: {
            price: {
                required,
            },
        },
    },
    methods: {
        close() {
            this.editing = false
        },
        resetForm() {
            this.form.price = this.license.price
        },
        handleEditClick() {
            this.editing = true
        },
        handleCancelClick() {
            this.close()
            this.resetForm()
        },
        handleCheckChange(checked) {
            this.$emit(checked ? 'check' : 'uncheck', this.license)
        },
        handleSaveClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.$store.dispatch('trackAddWizard/updateLicense', {
                license: { ...this.license, price: this.form.price },
            })
            this.close()
        },
    },
}
</script>