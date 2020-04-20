<template>
    <v-date-picker
        v-model="localValue"
        mode="single"
        class="ls-datepicker"
        :class="{ 'is-invalid': !state }"
        :min-date="new Date()"
        :popover="{ visibility: 'click' }"
        @input="handleInput"
        :input-props="{
                class: 'ls-datepicker__input form-control',
                placeholder,
                readonly: true
            }"
    ></v-date-picker>
</template>

<script>
export default {
    name: 'DatePicker',
    props: {
        placeholder: {
            type: String,
            default: 'Select Date',
        },
        value: {
            type: Date,
            default: null,
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
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
    },
}
</script>
