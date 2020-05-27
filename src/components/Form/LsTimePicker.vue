<template>
    <LsSelect
        class="ls-timepicker"
        icon="select-time"
        :value="value"
        :state="state"
        :placeholder="placeholder"
        label="title"
        :options="options"
        :reduce="option => option.id"
        @input="handleInput"
    />
</template>

<script>
import { generateTimePickerOptions } from '~/utils'

export default {
    name: 'LsTimePicker',
    props: {
        value: {
            type: String,
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
            options: generateTimePickerOptions(),
        }
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
    },
}
</script>
