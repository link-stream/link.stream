<template>
    <SelectBox
        class="ls-timepicker"
        icon="select-time"
        :value="value"
        :state="state"
        :placeholder="placeholder"
        label="title"
        :options="times"
        :reduce="time => time.id"
        @input="handleInput"
    />
</template>

<script>
import { api } from '~/services/api'

export default {
    name: 'TimePicker',
    props: {
        value: {
            type: String,
            defualt: null,
        },
        placeholder: {
            type: String,
            default: 'Select Time',
        },
        state: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            times: api.common.getTimes(),
        }
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
    },
}
</script>
