<template>
    <div>
        <LicenseCard
            v-for="license in licenses"
            :license="license"
            :key="license.id"
            :selected="selectedIds.indexOf(license.id) > -1"
            @select="handleSelect"
            @deselect="handleDeselect"
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
        active: {
            type: Boolean,
            default: false,
        },
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
        selectedIds() {
            return this.selected.map(license => license.id)
        },
    },
    watch: {
        initialSelected() {
            this.selected = [...this.initialSelected]
        },
    },
    created() {
        this.$bus.$on('wz.validate.licenses', this.handleValidate)
    },
    methods: {
        handleSelect(license) {
            const index = this.selectedIds.indexOf(license.id)
            index === -1 && this.selected.push(license)
        },
        handleDeselect(license) {
            const index = this.selectedIds.indexOf(license.id)
            this.selected.splice(index, 1)
        },
        handleValidate({ onSuccess }) {
            if (!this.active) {
                return
            }
            this.$bus.$emit('wz.updateForm', {
                licenses: [...this.selected],
            })
            onSuccess()
        },
    },
}
</script>