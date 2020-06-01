<template>
    <b-modal
        modal-class="MarketingEditModal"
        v-model="shown"
        size="lg"
        centered
        @hidden="handleHidden"
    >
        <template v-slot:modal-header>
            <LsButton variant="icon-bg" class="modal-close" @click="close" />
            <h2 class="modal-title">Marketing</h2>
        </template>

        <template v-slot:default>
            <MarketingBlock :selected="selected" :is-edit-mode="true" />
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
import { MarketingBlock } from '../'

export default {
    name: 'MarketingEditModal',
    components: {
        MarketingBlock,
    },
    props: {
        selected: {
            type: Array,
        },
    },
    data() {
        return {
            shown: true,
        }
    },
    methods: {
        close() {
            this.shown = false
        },
        handleSaveClick() {
            this.$bus.$emit('wz.validateBlock.marketing', {
                onSuccess: this.close,
            })
        },
        handleHidden() {
            this.$emit('hidden', { modalName: 'marketing' })
        },
    },
}
</script>
