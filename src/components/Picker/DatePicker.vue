<template>
    <div class="ls-datepicker">
        <v-date-picker
            v-model="localValue"
            mode="single"
            :min-date="new Date()"
            :popover="{ visibility: 'click' }"
            @input="updateValue"
            :input-props="{
                class: 'ls-datepicker__input form-control',
                placeholder: placeholder,
                readonly,
            }"
        ></v-date-picker>
    </div>
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
    },
    data() {
        return {
            localValue: this.value,
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value)
        },
    },
}
</script>
