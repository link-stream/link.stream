<template>
    <i :class="`ls ls-${name}`"></i>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            default: '',
            required: true,
        },
    },
}
</script>