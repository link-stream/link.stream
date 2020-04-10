<template>
    <b-button
        class="btn-copy"
        :size="size"
        :type="type"
        pill
        :variant="variant"
        @click="handleClick"
    >
        <slot></slot>
    </b-button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        size: {
            type: String,
            default: 'sm',
        },
        variant: {
            type: String,
            default: 'primary',
        },
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>