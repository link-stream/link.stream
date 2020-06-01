<template>
    <button class="btn btn-icon" :type="type" @click="handleClick">
        <slot>
            <LsIcon :icon="icon" />
        </slot>
    </button>
</template>

<script>
export default {
    name: 'LsIconButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
        },
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>
