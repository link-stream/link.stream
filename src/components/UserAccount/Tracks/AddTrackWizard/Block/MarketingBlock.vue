<template>
    <div class="MarketingBlock">
        <div class="Card" v-for="offer in allOffers" :key="offer.id">
            <b-form-checkbox
                :value="offer.id"
                v-model="selectedOfferIds"
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
            selectedOfferIds: [
                ...this.$store.state.trackAddWizard.form.selectedOfferIds,
            ],
        }
    },
    computed: {
        ...mapGetters({
            allOffers: 'trackAddWizard/allOffers',
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
                selectedOfferIds: this.selectedOfferIds,
            })
        },
        validate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>