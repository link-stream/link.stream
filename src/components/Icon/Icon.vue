<template>
    <i :class="`ls-ic ls-ic-${icon}`"></i>
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
