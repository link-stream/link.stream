<template>
    <div class="about-page">
        <p>{{ profile.bio }}</p>
    </div>
</template>
<script>
import { api } from '~/services'
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
    async created() {
        const response = await api.profiles.getProfileMain(this.url)
        if (response.status === 'false') {
            this.$router.push({
                name: 'home',
            })            
        } else {
            this.$store.dispatch('profile/getProfileMain', { url: this.url })
        }
    },
}
</script>
