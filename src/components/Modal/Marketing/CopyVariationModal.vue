<template>
    <b-modal modal-class="CopyVariationModal" centered v-model="open" size="lg">
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Name this variation</h4>
        </template>
        <template v-slot:default>
            <b-form-group>
                <b-form-input
                    v-model="variationName"
                    required
                    placeholder="Variation Name"
                >
                </b-form-input>
            </b-form-group>
        </template>
        <template v-slot:modal-footer>
            <div class="right-col">
                <basic-button
                    class="action-btn text-black"
                    variant="link"
                    @click="editVariation"
                >
                    Edit variation
                </basic-button>
                <spinner-button class="action-btn" @click="handleSaveClick">
                    Save
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'CreateSplitModal',
    computed: {
        ...mapGetters({
            variationData: 'marketing/variationData',
        }),
    },
    data() {
        return {
            open: false,
            variationName: '',
        }
    },
    watch: {
        variationData(value) {
            this.variationName = value.title
        },
    },
    created() {
        this.$bus.$on('modal.copyVariation.open', this.handleOpen)
        this.$bus.$on('modal.copyVariation.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        editVariation() {
            console.log('Edit variation')
        },
        async handleSaveClick() {
            if (!this.variationName) {
                this.$toast.error('Please enter variation name.')
                return
            }
            const params = {
                ...this.variationData,
                title: this.variationName,
            }
            await this.$store.dispatch('marketing/setVariationData', {})
            await this.$store.dispatch('marketing/addVariation', params)
            this.close()
        },
    },
}
</script>
