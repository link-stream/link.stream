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
            <Icon
                class="ls-select__icon"
                :icon="isTime ? 'select-time' : 'select-arrow'"
            />
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
