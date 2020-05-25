<template>
    <div class="page page-ua-track-add">
        <LsSpinner v-show="loading" />
        <Wizard v-show="!loading" />
        <UserInviteModal />
        <UserSearchModal />
        <TrackInfoEditModal />
        <LicensesEditModal />
        <FilesEditModal />
        <MarketingEditModal />
    </div>
</template>

<script>
import Wizard from '~/components/UserAccount/Tracks/AddTrackWizard/Wizard'
import { UserInviteModal, UserSearchModal } from '~/components/Modal'
import {
    TrackInfoEditModal,
    LicensesEditModal,
    FilesEditModal,
    MarketingEditModal,
} from '~/components/UserAccount/Tracks/AddTrackWizard'

export default {
    name: 'AddTrack',
    components: {
        Wizard,
        UserInviteModal,
        UserSearchModal,
        TrackInfoEditModal,
        LicensesEditModal,
        FilesEditModal,
        MarketingEditModal,
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
