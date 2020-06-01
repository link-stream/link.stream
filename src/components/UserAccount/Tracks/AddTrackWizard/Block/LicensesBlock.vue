<template>
    <div class="LicensesBlock">
        <LicenseCard
            v-for="license in localAllLicenses"
            :key="license.id"
            :license="license"
            :checked="selectedLicenseIds.indexOf(license.id) > -1"
            @check="handleLicenseCheck"
            @uncheck="handleLicenseUncheck"
            @update="handleLicenseUpdate"
        />
    </div>
</template>

<script>
import { LicenseCard } from '../'
import { mapGetters } from 'vuex'

export default {
    name: 'LicensesBlock',
    components: {
        LicenseCard,
    },
    props: {
        selectedLicenses: {
            type: Array,
        },
        isEditMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localAllLicenses: [],
            localSelectedLicenses: [],
        }
    },
    computed: {
        ...mapGetters({
            allLicenses: 'me/licenses',
        }),
        selectedLicenseIds() {
            return this.localSelectedLicenses.map(license => license.id)
        },
    },
    watch: {
        selectedLicenses() {
            !this.isEditMode && this.updateWizardForm()
        },
    },
    created() {
        this.localSelectedLicenses = [...this.selectedLicenses]
        this.localAllLicenses = [...this.allLicenses]
        this.$bus.$on('wz.validateBlock.licenses', this.handleBlockValidate)
        this.$bus.$on('wz.beforePrevStep', this.updateWizardForm)
    },
    destroyed() {
        this.$bus.$off('wz.validateBlock.licenses')
        this.$bus.$off('wz.beforePrevStep')
    },
    methods: {
        updateWizardForm() {
            this.$bus.$emit('wz.updateForm', {
                licenses: [...this.localSelectedLicenses],
            })
        },
        handleLicenseCheck(license) {
            const index = this.selectedLicenseIds.indexOf(license.id)
            index === -1 && this.localSelectedLicenses.push(license)
        },
        handleLicenseUncheck(license) {
            const index = this.selectedLicenseIds.indexOf(license.id)
            this.localSelectedLicenses.splice(index, 1)
        },
        handleLicenseUpdate(license) {
            const index = this.localAllLicenses
                .map(l => l.id)
                .indexOf(license.id)
            this.localAllLicenses.splice(index, 1, license)
        },
        handleBlockValidate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>