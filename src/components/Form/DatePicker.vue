<template>
    <v-date-picker
        mode="single"
        class="DatePicker"
        :value="value"
        :class="{ 'is-invalid': !state }"
        :min-date="minDate"
        :max-date="maxDate"
        :popover="{ visibility: 'click' }"
        :input-props="{
            class: 'form-control',
            placeholder,
            readonly: true,
        }"
        @input="handleInput"
    ></v-date-picker>
</template>

<script>
export default {
    name: 'DatePicker',
    props: {
        value: {
            type: Date,
        },
        placeholder: {
            type: String,
            default: 'Select Date',
        },
        state: {
            type: Boolean,
            default: true,
        },
        minDate: {
            type: Date,
            default: new Date(),
        },
        maxDate: {
            type: Date,
            default: null,
        },
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
    },
}
</script>
