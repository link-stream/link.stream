<template>
    <div class="user-avatar" :class="{ '--letter': !src }">
        <img :src="src" v-if="src" />
        <div class="user-avatar-letter" v-else-if="username">
            {{ username[0].toUpperCase() }}
        </div>
    </div>
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