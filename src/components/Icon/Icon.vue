<template>
    <i :class="`ls-i ls-i-${icon}`"></i>
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
