<template>
    <div class="LicensesBlock">
        <LicenseCard
            v-for="license in allLicenses"
            :key="license.id"
            :license="license"
            :checked="selectedIds.indexOf(license.id) > -1"
            @check="handleLicenseCheck"
            @uncheck="handleLicenseUncheck"
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
        isEditMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        const getters = this.$store.getters
        return {
            selectedIds: [
                ...getters['trackAddWizard/form'].licenses.map(l => l.id),
            ],
        }
    },
    computed: {
        ...mapGetters({ allLicenses: 'trackAddWizard/licenses' }),
    },
    watch: {
        selectedIds() {
            !this.isEditMode && this.updateWizardForm()
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
                licenses: this.allLicenses.filter(
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
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>