<template>
    <vue-extend-layouts />
</template>

<script>
import VueExtendLayouts from 'vue-extend-layout'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'App',
    components: { VueExtendLayouts },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    created() {
        if (this.isLoggedIn) {
            this.$store.dispatch('me/loadAccountSettings')
        }
    },
}
</script>
