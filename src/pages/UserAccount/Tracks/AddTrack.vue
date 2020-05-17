<template>
    <div class="page page-ua-track-add">
        <LsSpinner v-show="loading" />
        <AddTrackWizard v-show="!loading" />
    </div>
</template>

<script>
import { AddTrackWizard } from '~/components/UserAccount/Tracks'

export default {
    name: 'AddTrack',
    components: {
        AddTrackWizard,
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
