<template>
    <b-modal size="lg" centered v-model="shown">
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Licenses</h2>
        </template>

        <template v-slot:default>
            <LicensesBlock :active="shown" :initial-selected="selected" />
        </template>

        <template v-slot:modal-footer>
            <ls-button
                class="modal-action modal-cancel"
                variant="secondary"
                @click="close"
            >
                Cancel
            </ls-button>
            <ls-button class="modal-action" @click="handleSaveClick">
                Save
            </ls-button>
        </template>
    </b-modal>
</template>

<script>
import { LicensesBlock } from '../'

export default {
    name: 'LicensesEditModal',
    components: {
        LicensesBlock,
    },
    data() {
        return {
            shown: false,
            selected: [],
        }
    },
    created() {
        this.$bus.$on('modal.licensesEdit.show', this.handleShow)
        this.$bus.$on('modal.licensesEdit.hide', this.close)
    },
    methods: {
        close() {
            this.shown = false
        },
        handleShow({ selected }) {
            this.selected = selected
            this.shown = true
        },
        handleSaveClick() {
            this.$bus.$emit('wz.validate.licenses', {
                onSuccess: this.close,
            })
        },
    },
}
</script>
