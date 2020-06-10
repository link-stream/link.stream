<template>
    <div class="MarketingBlock">
        <div class="Card" v-for="offer in freeDownloadOffers" :key="offer.id">
            <b-form-checkbox
                :value="offer.id"
                v-model="selectedIds"
            ></b-form-checkbox>
            <LsIcon class="logo" :icon="offer.icon" />
            <div class="Card-title">
                {{ offer.title }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'MarketingBlock',
    data() {
        return {
            selectedIds: [
                ...this.$store.state.trackAddWizard.form.freeDownloadOfferIds,
            ],
        }
    },
    computed: {
        ...mapGetters({
            freeDownloadOffers: 'trackAddWizard/freeDownloadOffers',
        }),
    },
    created() {
        this.$bus.$on('wz.nextClick', this.validate)
        this.$bus.$on('wz.prevClick', this.updateWizardForm)
        this.$bus.$on('wz.editModal.saveClick', this.validate)
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                freeDownloadOfferIds: this.selectedIds,
            })
        },
        validate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>