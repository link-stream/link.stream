<template>
    <div class="crd crd-license" :class="{ '--editing': editing }">
        <div class="crd-content">
            <b-form-group>
                <b-form-checkbox></b-form-checkbox>
            </b-form-group>
            <div class="crd-body">
                <div class="crd-title">
                    {{ license.title }} - ${{ license.prize | trimZeroDecimal }}
                </div>
                <small class="crd-subtitle">
                    <p>{{ license.descripcion }}</p>
                </small>
            </div>
            <LsIconButton
                class="crd-edit-btn"
                title="Edit"
                use-bg-img
                @click="showEditView"
            />
        </div>
        <div class="crd-editable" v-if="editing">
            <LsIconButton
                icon="close"
                class="crd-edit-close"
                title="Close"
                @click="hideEditView"
            />
            <div class="crd-edit-body">
                <b-form-group label="Adjust price" label-for="priceInput">
                    <b-form-input
                        type="number"
                        v-model="form.price"
                        id="priceInput"
                    />
                </b-form-group>
            </div>
            <div class="crd-edit-actions">
                <div class="actions-left">
                    To customize your default license terms, go to
                    <ls-button variant="link">Licenses</ls-button>
                </div>
                <div class="actions-right">
                    <ls-button
                        size="xs"
                        variant="secondary"
                        @click="hideEditView"
                    >
                        Cancel
                    </ls-button>
                    <ls-button size="xs" variant="black" @click="hideEditView">
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
        showEditView() {
            this.editing = true
        },
        hideEditView() {
            this.editing = false
        },
    },
}
</script>