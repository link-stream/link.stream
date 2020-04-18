<template>
    <select-box
        class="ls-timepicker"
        icon="select-time"
        :value="value"
        :state="state"
        :placeholder="placeholder"
        label="title"
        :options="times"
        :reduce="time => time.id"
        @input="updateValue"
    ></select-box>
</template>

<script>
import { SelectBox } from '~/components/Select'
import { api } from '~/services/api'

export default {
    name: 'TimePicker',
    components: {
        SelectBox,
    },
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
        updateValue(value) {
            this.$emit('input', value)
        },
    },
}
</script>