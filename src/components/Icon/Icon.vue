<template>
    <i :class="`ls-ico ls-ico-${icon}`"></i>
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
