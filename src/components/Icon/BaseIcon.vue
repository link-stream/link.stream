<template>
    <i :class="`ico ico-${icon}`"></i>
</template>

<script>
export default {
    name: 'BaseIcon',
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
}
</script>
