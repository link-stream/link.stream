<template>
    <b-modal v-model="shown" size="lg" centered @hidden="handleHidden">
        <template v-slot:modal-header>
            <LsButton variant="icon-bg" class="modal-close" @click="close" />
            <h2 class="modal-title">Track Info</h2>
        </template>

        <template v-slot:default>
            <TrackInfoBlock :is-edit-mode="true" />
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
import TrackInfoBlock from '../Block/TrackInfoBlock'

export default {
    name: 'TrackInfoEditModal',
    components: {
        TrackInfoBlock,
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
            this.$bus.$emit('wz.validateBlock.trackInfo', {
                onSuccess: this.close,
            })
        },
        handleHidden() {
            this.$emit('hidden', { modalName: 'trackInfo' })
        },
    },
}
</script>
