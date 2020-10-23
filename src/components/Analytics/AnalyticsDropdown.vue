<template>
    <div class="analytics-dropdown-menu">
        <b-dropdown right toggle-class="text-decoration-none" variant="link" no-caret>
            <template slot="button-content">
                <span>{{ title }}</span>
                <font-awesome-icon :icon="['fas', 'chevron-down']" />
                <font-awesome-icon :icon="['fas', 'chevron-up']" />
            </template>
            <b-dropdown-item :active="selected === '1'" @click="activeItem(1)">Last 7 days</b-dropdown-item>
            <b-dropdown-item :active="selected === '2'" @click="activeItem(2)">Last 30 days</b-dropdown-item>
            <b-dropdown-item :active="selected === '3'" @click="activeItem(3)">Last 90 days</b-dropdown-item>
            <b-dropdown-item disabled>Last month</b-dropdown-item>
            <b-dropdown-item disabled>Month to date</b-dropdown-item>
            <b-dropdown-item disabled>Quarter to date</b-dropdown-item>
            <b-dropdown-item disabled>Year to date</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    name: 'AnalyticsDropdown',
    data() {
        return {
            title: 'Last 7 days',
            selected: '1',
        }
    },
    methods: {
        activeItem(item) {
            switch (item) {
                case 1:
                    this.selected = '1'
                    this.title = 'Last 7 days'
                    this.$emit('update', 7)
                    break
                case 2:
                    this.selected = '2'
                    this.title = 'Last 30 days'
                    this.$emit('update', 30)
                    break
                case 3:
                    this.selected = '3'
                    this.title = 'Last 90 days'
                    this.$emit('update', 90)
                    break
            }
        },
    },
}
</script>
