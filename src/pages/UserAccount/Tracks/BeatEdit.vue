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
                        :to="{ name: 'userAccountBeats' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button>
                        Save
                    </ls-spinner-button>
                </div>
            </header>

            <InfoCard />
            <FilesCard />
            <BeatPackCard />
        </div>
    </div>
</template>

<script>
import {
    InfoCard,
    FilesCard,
    BeatPackCard,
} from '~/components/UserAccount/Tracks/Beats/Edit'
import { api } from '~/services/api'
import { mapGetters } from 'vuex'

export default {
    name: 'BeatEdit',
    components: {
        InfoCard,
        FilesCard,
        BeatPackCard,
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
