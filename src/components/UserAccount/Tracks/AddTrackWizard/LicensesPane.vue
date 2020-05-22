<template>
    <div>
        <LicenseCard
            v-for="license in licenses"
            :license="license"
            :key="license.id"
            :selected="selected.indexOf(license.id) > -1"
            @select="handleLicenseSelect"
            @deselect="handleLicenseDeselect"
        />
    </div>
</template>

<script>
import { LicenseCard } from './'
import { mapGetters } from 'vuex'

export default {
    name: 'LicensesPane',
    components: {
        LicenseCard,
    },
    props: {
        initialSelected: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            selected: [...this.initialSelected],
        }
    },
    computed: {
        ...mapGetters({
            licenses: 'me/licenses',
        }),
    },
    created() {
        this.$eventBus.$on('wz.nextClick', this.handleStepNextClick)
    },
    methods: {
        handleLicenseSelect(license) {
            const index = this.selected
                .map(license => license.id)
                .indexOf(license.id)
            index === -1 && this.selected.push(license)
        },
        handleLicenseDeselect(license) {
            const index = this.selected
                .map(license => license.id)
                .indexOf(license.id)
            this.selected.splice(index, 1)
        },
        handleStepNextClick({ currentStep }) {
            if (currentStep !== 'licenses') {
                return
            }
            this.$eventBus.$emit('wz.updateForm', {
                licenses: this.selected,
            })
            this.$eventBus.$emit('wz.goToNext')
        },
    },
}
</script>