<template>
    <i :class="`LsIcon LsIcon-${icon}`"></i>
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
