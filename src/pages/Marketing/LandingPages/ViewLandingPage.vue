<template>
    <div class="page page-email-view">
        <LoadingSpinner class="page-loader pt-5" v-if="loading" />
        <div v-else>
            <component
                v-bind:is="currentComponent"
                :landing-data="page"
                class="d-none d-sm-block"
            ></component>
            <component
                v-bind:is="currentMobileComponent"
                :landing-data="page"
                class="d-sm-none"
            ></component>
        </div>
    </div>
</template>
<script>
import LandingPreviewEmail from '~/components/Marketing/LandingPages/LandingPreviewEmail'
import LandingPreviewCollect from '~/components/Marketing/LandingPages/LandingPreviewCollect'
import LandingPreviewLead from '~/components/Marketing/LandingPages/LandingPreviewLead'
import LandingPreviewEmailMobile from '~/components/Marketing/LandingPages/LandingPreviewEmailMobile'
import LandingPreviewCollectMobile from '~/components/Marketing/LandingPages/LandingPreviewCollectMobile'
import { api } from '~/services'
import { mapGetters } from 'vuex'
export default {
    name: 'ViewLandingPage',
    components: {
        LandingPreviewEmail,
        LandingPreviewCollect,
        LandingPreviewLead,
        LandingPreviewCollectMobile,
        LandingPreviewEmailMobile,
    },
    props: ['id'],
    data: () => ({
        loading: false,
        page: {},
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
        currentComponent() {
            switch (this.page.template_type) {
                case 'email':
                    return 'LandingPreviewEmail'
                case 'collect':
                    return 'LandingPreviewCollect'
                case 'lead':
                    return 'LandingPreviewLead'
                default:
                    return 'LandingPreviewLead'
            }
        },
        currentMobileComponent() {
            switch (this.page.template_type) {
                case 'email':
                    return 'LandingPreviewEmailMobile'
                case 'collect':
                    return 'LandingPreviewCollectMobile'
                case 'lead':
                    return 'LandingPreviewLead'
                default:
                    return 'LandingPreviewLead'
            }
        },
    },
    async created() {
        this.loading = true
        const { status, data } = await api.marketing.getLandingPage(
            this.user.id,
            this.id
        )
        if (status === 'success') {
            this.page = data[0]
        }
        this.loading = false
    },
}
</script>
