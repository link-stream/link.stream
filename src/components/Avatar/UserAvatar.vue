<template>
    <div
        class="user-avatar"
        :style="src ? `background-image: url('${src}')` : ''"
        v-text="!src && username ? username[0].toUpperCase() : ''"
    ></div>
</template>

<script>
export default {
    name: 'UserAvatar',
    props: {
        src: {
            type: String,
        },
        username: {
            type: String,
        },
    },
}
</script>