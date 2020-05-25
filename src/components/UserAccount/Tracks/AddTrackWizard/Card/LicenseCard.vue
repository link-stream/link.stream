<template>
    <div class="c-card --license" :class="{ '--editing': editing }">
        <div class="c-content">
            <b-form-group>
                <b-form-checkbox
                    :checked="selected"
                    @change="handleCheckChange"
                ></b-form-checkbox>
            </b-form-group>
            <div class="c-body">
                <div class="c-title">
                    {{ license.title }} - ${{ license.prize | trimZeroDecimal }}
                </div>
                <small class="c-subtitle">
                    <p>{{ license.descripcion }}</p>
                </small>
            </div>
            <LsIconButton
                class="c-edit-btn"
                title="Edit"
                use-bg-img
                @click="handleEditClick"
            />
        </div>
        <div class="c-edit" v-if="editing">
            <LsIconButton
                icon="close"
                class="c-edit-close"
                title="Close"
                @click="handleCloseEditClick"
            />
            <div class="c-edit-body">
                <b-form-group label="Adjust price" label-for="priceInput">
                    <b-form-input
                        type="number"
                        v-model="form.price"
                        id="priceInput"
                    />
                </b-form-group>
            </div>
            <div class="c-edit-actions">
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