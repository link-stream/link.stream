<template>
    <div class="Card LicenseCard" :class="{ 'is-editing': editing }">
        <LsIconButton
            icon="close"
            class="close-btn"
            title="Close"
            @click="handleCancelClick"
        />
        <div class="view-box">
            <b-form-checkbox
                :checked="checked"
                @change="handleCheckChange"
            ></b-form-checkbox>
            <div class="card-body">
                <h4 class="card-title">
                    {{ license.title }} - ${{ license.price | trimZeroDecimal }}
                </h4>
                <small>
                    {{ license.descripcion }}
                </small>
            </div>
            <LsButton
                variant="icon-bg"
                class="edit-btn"
                title="Edit"
                @click="handleEditClick"
            />
        </div>
        <div class="edit-box">
            <div class="edit-form">
                <b-form-group label="Adjust price">
                    <b-form-input
                        type="number"
                        placeholder="e.g. 25.00"
                        v-model="$v.form.price.$model"
                        :state="!$v.form.price.$error"
                    />
                    <b-form-invalid-feedback>
                        Enter a price
                    </b-form-invalid-feedback>
                </b-form-group>
            </div>
            <div class="edit-actions">
                <div class="col-left">
                    To customize your default license terms, go to
                    <ls-button
                        variant="link"
                        :to="{ name: 'userAccountTracksLicenses' }"
                    >
                        Licenses
                    </ls-button>
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
            this.$emit(checked ? 'checked' : 'unchecked', this.license)
        },
        handleSaveClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.$emit('updated', {
                ...this.license,
                price: this.form.price,
            })
            this.close()
        },
    },
}
</script>