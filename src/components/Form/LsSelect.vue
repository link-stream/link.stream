<template>
    <v-select
        class="ls-select"
        :class="{ 'is-invalid': !state }"
        :label="label"
        :value="localValue"
        :placeholder="placeholder"
        :options="options"
        :reduce="reduce"
        :clearable="false"
        @input="handleInput"
    >
        <template v-slot:open-indicator>
            <LsIcon :icon="icon" class="ls-select-icon" />
        </template>
    </v-select>
</template>

<script>
import vSelect from 'vue-select'

export default {
    name: 'LsSelect',
    components: {
        vSelect,
    },
    props: {
        value: {
            type: [String, Object],
        },
        label: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        options: {
            type: Array,
        },
        reduce: {
            type: Function,
        },
        state: {
            type: Boolean,
            default: true,
        },
        icon: {
            type: String,
            default: 'select-arrow',
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
