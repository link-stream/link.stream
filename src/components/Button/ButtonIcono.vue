<template>
    <button class="btn btn-icono" :type="type" @click="handleClick">
        <i :class="`${classPrefix}${icon}`"></i>
    </button>
</template>

<script>
export default {
    name: 'ButtonIcono',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        // Class prefix e.g. fas fa-
        classPrefix: {
            type: String,
            default: 'ls ls-',
        },
        icon: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>
