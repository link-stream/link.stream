<template>
    <div class="page page-ua-beat-edit">
        <LsSpinner v-if="loading" />
        <div v-else>
            <div class="page-nav">
                <ls-button
                    class="back-btn"
                    variant="text"
                    :to="{ name: 'userAccountBeats' }"
                >
                    <i class="LsIcon LsIcon-back"></i>
                    <span>Beats</span>
                </ls-button>
            </div>
            <header class="page-header">
                <div class="col-left">
                    <h1 class="page-title">Your beats</h1>
                    <div class="page-preview">
                        <span class="text-light">link.stream/</span>
                        <span>{{ user.user_name }}/beats/</span>
                        <preview-pill-button
                            :to="{
                                name: 'userBeats',
                                params: { username: user.user_name },
                            }"
                        >
                            Preview
                        </preview-pill-button>
                    </div>
                </div>
                <div class="col-right">
                    <ls-button
                        class="cancel-btn"
                        variant="secondary"
                        size="sm"
                        :to="{ name: 'userAccountBeats' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button size="sm">
                        Save
                    </ls-spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="row">
                    <div class="col col-md-8">
                        <InfoCard />
                        <FilesCard />
                        <LicensesCard />
                        <BeatPackCard />
                        <MarketingCard />
                        <CollabsCard />
                    </div>
                    <div class="col col-md-4">
                        <VisibilityCard />
                        <ImageCard />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import {
    InfoCard,
    FilesCard,
    BeatPackCard,
    LicensesCard,
    MarketingCard,
    CollabsCard,
    VisibilityCard,
    ImageCard,
} from '~/components/UserAccount/Tracks/Beats/Edit'
import { api } from '~/services/api'
import { mapGetters } from 'vuex'

export default {
    name: 'BeatEdit',
    components: {
        InfoCard,
        FilesCard,
        BeatPackCard,
        LicensesCard,
        MarketingCard,
        CollabsCard,
        VisibilityCard,
        ImageCard,
    },
    data() {
        return {
            loading: false,
            beat: null,
        }
    },
    computed: {
        ...mapGetters({ user: 'me/user' }),
    },
    async created() {
        this.loading = true
        const id = this.$route.params.id
        const { status, data } = await api.audios.getBeat(id, this.user.id)
        if (status === 'success' && data.length) {
            this.beat = data[0]
        } else {
            this.$router.push({ name: 'userAccountBeats' })
            this.$toast.error('Beat not found.')
        }
        this.loading = false
    },
}
</script>
