<template>
    <div class="c-card --license" :class="{ '--editing': editing }">
        <div class="c-card-content">
            <b-form-group>
                <b-form-checkbox
                    :checked="selected"
                    @change="handleCheckChange"
                ></b-form-checkbox>
            </b-form-group>
            <div class="c-card-body">
                <div class="c-card-title">
                    {{ license.title }} - ${{ license.prize | trimZeroDecimal }}
                </div>
                <small class="c-card-subtitle">
                    <p>{{ license.descripcion }}</p>
                </small>
            </div>
            <LsIconButton
                class="c-card-edit-btn"
                title="Edit"
                use-bg-img
                @click="handleEditClick"
            />
        </div>
        <div class="c-card-edit" v-if="editing">
            <LsIconButton
                icon="close"
                class="c-card-edit-close"
                title="Close"
                @click="handleCloseEditClick"
            />
            <div class="c-card-edit-body">
                <b-form-group label="Adjust price" label-for="priceInput">
                    <b-form-input
                        type="number"
                        v-model="form.price"
                        id="priceInput"
                    />
                </b-form-group>
            </div>
            <div class="c-card-edit-actions">
                <div class="actions-left">
                    To customize your default license terms, go to
                    <ls-button variant="link">Licenses</ls-button>
                </div>
                <div class="actions-right">
                    <ls-button
                        size="xs"
                        variant="secondary"
                        @click="handleCloseEditClick"
                    >
                        Cancel
                    </ls-button>
                    <ls-button
                        size="xs"
                        variant="black"
                        @click="handleCloseEditClick"
                    >
                        Save
                    </ls-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LicenseCard',
    props: {
        selected: {
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
                price: this.license.prize,
            },
        }
    },
    methods: {
        handleEditClick() {
            this.editing = true
        },
        handleCloseEditClick() {
            this.editing = false
        },
        handleCheckChange(checked) {
            this.$emit(checked ? 'select' : 'deselect', this.license)
        },
    },
}
</script>