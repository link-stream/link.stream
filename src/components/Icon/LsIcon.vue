<template>
    <i :class="`ls-i ls-i-${icon}`"></i>
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
