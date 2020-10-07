<template>
    <div class="page page-email-view">
        <LoadingSpinner class="page-loader pt-5" v-if="loading" />
        <div v-else>
            <EmailPreviewRelease
                v-if="message.template_type === 'release'"
                :emailData="message"
            />
            <EmailPreviewPlain
                v-if="message.template_type === 'plain'"
                :emailData="message"
            />
            <EmailPreviewVideo
                v-if="message.template_type === 'video'"
                :emailData="message"
            />
        </div>
    </div>
</template>
<script>
import EmailPreviewRelease from '~/components/Marketing/Messages/EmailPreviewRelease'
import EmailPreviewPlain from '~/components/Marketing/Messages/EmailPreviewPlain'
import EmailPreviewVideo from '~/components/Marketing/Messages/EmailPreviewVideo'
import { api } from '~/services'
import { mapGetters } from 'vuex'
export default {
    name: 'ViewEmail',
    components: {
        EmailPreviewRelease,
        EmailPreviewPlain,
        EmailPreviewVideo,
    },
    props: ['id'],
    data: () => ({
        loading: false,
        message: {},
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    async created() {
        this.loading = true
        const { status, data } = await api.marketing.getMessage(
            this.user.id,
            this.id
        )
        if (status === 'success') {
            this.message = data[0]
        }
        this.loading = false
    },
}
</script>
