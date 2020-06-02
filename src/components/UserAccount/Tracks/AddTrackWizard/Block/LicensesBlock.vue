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
        <div class="invalid-feedback" v-show="$v.selectedIds.$error">
            Please select at least one license.
        </div>
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
    props: {
        isEditMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        const { selectedLicenses } = this.$store.getters['trackAddWizard/form']
        return {
            selectedIds: [...selectedLicenses.map(l => l.id)],
        }
    },
    computed: {
        ...mapGetters({
            availableLicenses: 'trackAddWizard/licenses',
        }),
    },
    watch: {
        selectedIds() {
            !this.isEditMode && this.updateWizardForm()
        },
    },
    validations: {
        selectedIds: {
            required,
            minLength: minLength(1),
        },
    },
    created() {
        this.$bus.$on('wz.validateBlock.licenses', this.handleBlockValidate)
    },
    destroyed() {
        this.$bus.$off('wz.validateBlock.licenses')
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                selectedLicenses: this.availableLicenses.filter(
                    l => this.selectedIds.indexOf(l.id) !== -1
                ),
            })
        },
        handleLicenseCheck(license) {
            const index = this.selectedIds.indexOf(license.id)
            index === -1 && this.selectedIds.push(license.id)
        },
        handleLicenseUncheck(license) {
            const index = this.selectedIds.indexOf(license.id)
            this.selectedIds.splice(index, 1)
        },
        handleBlockValidate({ onSuccess }) {
            this.$v.selectedIds.$touch()
            if (this.$v.selectedIds.$invalid) {
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>