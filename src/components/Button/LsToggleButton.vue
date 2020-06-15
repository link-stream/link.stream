<template>
    <ToggleButton
        class="LsToggleButton"
        :value="toggled"
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
            toggled: !!this.value,
        }
    },
    methods: {
        handleInput(value) {
            this.toggled = value
            this.$emit('input', value)
        },
    },
}
</script>
