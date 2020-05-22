<template>
    <div class="page page-ua-track-add">
        <LsSpinner v-show="loading" />
        <Wizard v-show="!loading" />
    </div>
</template>

<script>
import Wizard from '~/components/UserAccount/Tracks/AddTrackWizard/Wizard'

export default {
    name: 'AddTrack',
    components: {
        Wizard,
    },
    data() {
        return {
            loading: false,
        }
    },
    created() {
        this.loading = true
        this.$store.dispatch('me/loadLicenses')
        this.loading = false
    },
}
</script>
