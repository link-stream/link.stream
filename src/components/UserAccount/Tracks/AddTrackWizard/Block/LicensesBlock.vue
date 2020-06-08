<template>
    <div class="LicensesBlock">
        <LicenseCard
            v-for="license in availableLicenses"
            :key="license.id"
            :license="license"
            :checked="selectedIds.indexOf(license.id) > -1"
            @check="handleLicenseCheck"
            @uncheck="handleLicenseUncheck"
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
        const { selectedLicenses } = this.$store.getters['trackAddWizard/form']

        return {
            selectedIds: selectedLicenses.map(({ id }) => id),
        }
    },
    computed: {
        ...mapGetters({
            availableLicenses: 'trackAddWizard/licenses',
        }),
    },
    validations: {
        selectedIds: {
            required,
            minLength: minLength(1),
        },
    },
    created() {
        this.$bus.$on('wz.nextClick', this.handleValidate)
        this.$bus.$on('wz.prevClick', this.updateWizardForm)
        this.$bus.$on('wz.modal.saveClick', this.handleValidate)
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                selectedLicenses: this.availableLicenses.filter(
                    ({ id }) => this.selectedIds.indexOf(id) !== -1
                ),
            })
        },
        handleValidate({ onSuccess }) {
            this.$v.selectedIds.$touch()
            if (this.$v.selectedIds.$invalid) {
                this.$toast.error('Please select at least one license.')
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
        handleLicenseCheck(license) {
            const index = this.selectedIds.indexOf(license.id)
            index === -1 && this.selectedIds.push(license.id)
        },
        handleLicenseUncheck(license) {
            const index = this.selectedIds.indexOf(license.id)
            this.selectedIds.splice(index, 1)
        },
    },
}
</script>