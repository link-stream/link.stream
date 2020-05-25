<template>
    <button type="button" class="btn btn-preview-pill" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'PreviewPillButton',
    props: {
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