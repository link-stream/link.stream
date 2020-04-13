<template>
    <b-button :type="type" :to="to" :size="size" pill :variant="variant" @click="handleClick">
        <slot></slot>
    </b-button>
</template>

<script>
export default {
    name: 'BasicButton',
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
        to: {
            type: Object,
            default: null,
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
