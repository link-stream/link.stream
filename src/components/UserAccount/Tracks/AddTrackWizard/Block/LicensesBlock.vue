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
        <div class="invalid-feedback" v-show="showError">
            Please select at least one license.
        </div>
    </div>
</template>

<script>
import LicenseCard from '../Card/LicenseCard'
import { mapGetters } from 'vuex'

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
        return {
            showError: false,
            selectedIds: [
                ...this.$store.getters['trackAddWizard/form'].licenses.map(
                    l => l.id
                ),
            ],
        }
    },
    computed: {
        ...mapGetters({
            availableLicenses: 'trackAddWizard/licenses',
        }),
        numSelected() {
            return this.selectedIds.length
        },
    },
    watch: {
        selectedIds() {
            !this.isEditMode && this.updateWizardForm()
            if (this.numSelected) {
                this.showError = false
            }
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
                licenses: this.availableLicenses.filter(
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
            if (!this.numSelected) {
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>