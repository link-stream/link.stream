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
            <Icon :icon="icon" class="ls-select-icon" />
        </template>
    </v-select>
</template>

<script>
import { Icon } from '~/components/Icon'

export default {
    name: 'SelectBox',
    components: {
        Icon,
    },
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
