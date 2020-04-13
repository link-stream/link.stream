<template>
    <i :class="`ls ls-${icon}`"></i>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        icon: {
            type: String,
            default: '',
            required: true,
        },
    },
}
</script>