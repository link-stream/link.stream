<template>
    <b-modal size="lg" centered v-model="shown">
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Track Info</h2>
        </template>

        <template v-slot:default>
            <TrackInfoFormBlock
                :active="shown"
                :track-type="trackType"
                :track-info="trackInfo"
            />
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
import { TrackInfoFormBlock } from '../'

export default {
    name: 'TrackInfoEditModal',
    components: {
        TrackInfoFormBlock,
    },
    data() {
        return {
            shown: false,
            trackType: null,
            trackInfo: null,
        }
    },
    created() {
        this.$bus.$on('modal.trackInfoEdit.show', this.handleShow)
        this.$bus.$on('modal.trackInfoEdit.hide', this.close)
    },
    methods: {
        close() {
            this.shown = false
        },
        handleShow({ trackType, trackInfo }) {
            this.trackType = trackType
            this.trackInfo = trackInfo
            this.shown = true
        },
        handleSaveClick() {
            this.$bus.$emit('wz.validate.trackInfo', {
                onSuccess: this.close,
            })
        },
    },
}
</script>
