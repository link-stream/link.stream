<template>
    <div class="UserAvatar">
        <img class="avatar avatar-image" :src="image" v-if="image" />
        <div class="avatar avatar-letter" v-text="letter" v-else></div>
    </div>
</template>

<script>
export default {
    name: 'UserAvatar',
    props: {
        user: {
            type: Object,
            required: true,
            default: () => ({
                photo: '',
                name: '',
            }),
        },
    },
    computed: {
        image() {
            return this.user.photo || ''
        },
        letter() {
            return typeof this.user.name === 'string'
                ? this.user.name.charAt(0).toUpperCase()
                : ''
        },
    },
}
</script>