<template>
    <b-button
        :type="type"
        :to="to"
        :size="size"
        pill
        :variant="variant"
        @click="handleClick"
    >
        <slot></slot>
    </b-button>
</template>

<script>
export default {
    name: 'LsButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        size: {
            type: String,
        },
        variant: {
            type: String,
            default: 'primary',
        },
        to: {
            type: Object,
        },
    },
    methods: {
        handleClick() {
            if (this.to) {
                this.$router.push(this.to)
            } else {
                this.$emit('click')
            }
        },
    },
}
</script>
