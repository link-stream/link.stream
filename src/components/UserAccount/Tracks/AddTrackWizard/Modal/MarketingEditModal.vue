<template>
    <b-modal
        modal-class="MarketingEditModal"
        v-model="open"
        size="lg"
        centered
        @hidden="handleHidden"
    >
        <template v-slot:modal-header>
            <LsButton variant="icon-bg" class="modal-close" @click="close" />
            <h2 class="modal-title">Marketing</h2>
        </template>

        <template v-slot:default>
            <MarketingBlock :is-edit-mode="true" />
        </template>

        <template v-slot:modal-footer>
            <ls-button
                class="action-btn cancel-btn"
                variant="secondary"
                @click="close"
            >
                Cancel
            </ls-button>
            <ls-button class="action-btn" @click="handleSaveClick">
                Save
            </ls-button>
        </template>
    </b-modal>
</template>

<script>
import MarketingBlock from '../Block/MarketingBlock'

export default {
    name: 'MarketingEditModal',
    components: {
        MarketingBlock,
    },
    data() {
        return {
            open: true,
        }
    },
    methods: {
        close() {
            this.open = false
        },
        handleSaveClick() {
            this.$bus.$emit('wz.validateBlock.marketing', {
                onSuccess: this.close,
            })
        },
        handleHidden() {
            this.$emit('hidden', { section: 'marketing' })
        },
    },
}
</script>
