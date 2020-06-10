<template>
    <div>
        <LicenseCard
            v-for="license in allLicenses"
            :key="license.id"
            :license="license"
            :checked="selectedIds.indexOf(license.id) > -1"
            @updated="handleLicenseUpdated"
            @checked="handleLicenseChecked"
            @unchecked="handleLicenseUnchecked"
        />
    </div>
</template>

<script>
import LicenseCard from '../Card/LicenseCard'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'LicensesBlock',
    components: {
        LicenseCard,
    },
    data() {
        return {
            selectedIds: [
                ...this.$store.state.trackAddWizard.form.selectedLicenseIds,
            ],
        }
    },
    computed: {
        ...mapGetters({
            allLicenses: 'trackAddWizard/allLicenses',
        }),
    },
    validations: {
        selectedIds: {
            required,
            minLength: minLength(1),
        },
    },
    created() {
        this.$bus.$on('wz.nextClick', this.validate)
        this.$bus.$on('wz.prevClick', this.updateWizardForm)
        this.$bus.$on('wz.editModal.saveClick', this.validate)
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                selectedLicenseIds: this.selectedIds,
            })
        },
        validate({ onSuccess }) {
            this.$v.selectedIds.$touch()
            if (this.$v.selectedIds.$invalid) {
                this.$toast.error('Please select at least one license.')
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
        handleLicenseChecked(license) {
            const index = this.selectedIds.indexOf(license.id)
            index === -1 && this.selectedIds.push(license.id)
        },
        handleLicenseUnchecked(license) {
            const index = this.selectedIds.indexOf(license.id)
            this.selectedIds.splice(index, 1)
        },
        handleLicenseUpdated(license) {
            this.$store.dispatch('trackAddWizard/updateLicense', license)
        },
    },
}
</script>