<template>
    <div class="page page-ua-beat-add">
        <div class="page-body">
            <div class="page-spinner" v-if="loading">
                <LsSpinner />
            </div>
            <Wizard v-else />
        </div>
        <UserInviteModal />
        <UserSearchModal />
    </div>
</template>

<script>
import Wizard from '~/components/UserAccount/Tracks/AddTrackWizard/Wizard'
import { UserInviteModal, UserSearchModal } from '~/components/Modal'

export default {
    name: 'AddBeat',
    components: {
        Wizard,
        UserInviteModal,
        UserSearchModal,
    },
    data() {
        return {
            loading: false,
        }
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('common/loadGenres')
        await this.$store.dispatch('common/loadAudioKeys')
        await this.$store.dispatch('me/loadLicenses')
        this.$store.dispatch('trackAddWizard/setLicenses', {
            licenses: this.$store.getters['me/licenses'],
        })
        this.loading = false
    },
}
</script>
