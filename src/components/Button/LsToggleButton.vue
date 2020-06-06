<template>
    <ToggleButton
        class="LsToggleButton"
        v-model="localValue"
        :width="42"
        :height="26"
        :margin="2"
        @input="handleInput"
    />
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'

export default {
    name: 'LsToggleButton',
    components: {
        ToggleButton,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
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