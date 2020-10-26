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
            <b-dropdown-item :active="selected === '4'" @click="activeItem(4)">Last month</b-dropdown-item>
            <b-dropdown-item :active="selected === '5'" @click="activeItem(5)">Month to date</b-dropdown-item>
            <b-dropdown-item :active="selected === '6'" @click="activeItem(6)">Quarter to date</b-dropdown-item>
            <b-dropdown-item :active="selected === '7'" @click="activeItem(7)">Year to date</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import moment from 'moment'
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
                case 4:
                    this.selected = '4'
                    this.title = 'Last month'
                    const days = moment().daysInMonth() 
                    this.$emit('update', days)
                    break
                case 5:
                    this.selected = '5'
                    this.title = 'Month to date'
                    const currentDate = moment().format('DD')
                    this.$emit('update', currentDate)
                    break
                case 6:
                    this.selected = '6'
                    this.title = 'Quarter to date'
                    const quarter = moment().quarter()
                    const start = moment().startOf('quarter')
                    const quarterDays = moment().diff(start, 'days')
                    this.$emit('update', quarterDays)
                    break
                case 7:
                    this.selected = '7'
                    this.title = 'Year to date'
                    const year = moment().get('year')
                    const yearStart = moment().startOf('year')
                    const yearDays = moment().diff(yearStart, 'days')
                    this.$emit('update', yearDays)
                    break
            }
        },
    },
}
</script>
