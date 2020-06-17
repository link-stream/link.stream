<template>
    <i :class="`ico ico-${icon}`"></i>
</template>

<script>
export default {
    name: 'LsIcon',
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
}
</script>
