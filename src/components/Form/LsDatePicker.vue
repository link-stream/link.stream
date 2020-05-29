<template>
    <v-date-picker
        v-model="localValue"
        mode="single"
        class="LsDatePicker"
        :class="{ 'is-invalid': !state }"
        :min-date="new Date()"
        :popover="{ visibility: 'click' }"
        @input="handleInput"
        :input-props="{
            class: 'LsDatePicker-input form-control',
            placeholder,
            readonly: true,
        }"
    ></v-date-picker>
</template>

<script>
export default {
    name: 'LsDatePicker',
    props: {
        placeholder: {
            type: String,
            default: 'Select Date',
        },
        value: {
            type: Date,
        },
        state: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            localValue: this.value,
        }
    },
    watch: {
        value() {
            this.localValue = this.value
        },
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
    },
}
</script>
