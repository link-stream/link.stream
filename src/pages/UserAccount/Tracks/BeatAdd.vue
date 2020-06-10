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
        <InfoEditModal />
        <LicensesEditModal />
        <FilesEditModal />
        <MarketingEditModal />
    </div>
</template>

<script>
import { UserInviteModal, UserSearchModal } from '~/components/Modal'

import {
    Wizard,
    InfoEditModal,
    LicensesEditModal,
    FilesEditModal,
    MarketingEditModal,
} from '~/components/UserAccount/Tracks/AddTrackWizard'

export default {
    name: 'BeatAdd',
    components: {
        Wizard,
        UserInviteModal,
        UserSearchModal,
        InfoEditModal,
        LicensesEditModal,
        FilesEditModal,
        MarketingEditModal,
    },
    data() {
        return {
            loading: false,
        }
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('trackAddWizard/loadWizard')
        this.loading = false
    },
}
</script>
