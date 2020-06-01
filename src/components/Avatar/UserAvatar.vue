<template>
    <div
        class="UserAvatar"
        :style="user.photo ? `background-image: url('${user.photo}')` : ''"
        v-text="!user.photo && user.name ? user.name[0].toUpperCase() : ''"
    ></div>
</template>

<script>
export default {
    name: 'UserAvatar',
    props: {
        user: {
            type: Object,
            default() {
                return {
                    photo: null,
                    name: null,
                }
            },
        },
    },
}
</script>