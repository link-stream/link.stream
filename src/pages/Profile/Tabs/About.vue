<template>
    <div class="about-page">
        <p>{{ profile.bio }}</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ProfileAbout',
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
        }),
    },
    created() {
        this.$store.dispatch('profile/getProfileMain', { url: this.url })
    },
}
</script>
