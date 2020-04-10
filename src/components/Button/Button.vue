<template>
    <b-button :type="type" :size="size" pill :variant="variant" @click="handleClick">
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
            default: '',
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