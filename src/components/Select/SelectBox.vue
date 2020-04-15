<template>
    <v-select
        class="ls-select"
        :class="{ 'is-time': isTime }"
        :label="label"
        :value="localValue"
        :placeholder="placeholder"
        :options="options"
        :reduce="reduce"
        @input="updateValue"
    >
        <template v-slot:open-indicator>
            <span></span>
        </template>
    </v-select>
</template>

<script>
export default {
    name: 'SelectBox',
    props: {
        label: {
            type: String,
            default: null,
        },
        value: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            default: null,
        },
        reduce: {
            type: Function,
            default: null,
        },
        isTime: {
            type: Boolean,
            default: false,
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
