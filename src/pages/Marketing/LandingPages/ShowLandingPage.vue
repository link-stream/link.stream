<template>
    <div class="page page-email-view">
        <LoadingSpinner class="page-loader pt-5" v-if="loading" />
        <div v-else>
            <component
                v-bind:is="currentMobileComponent"
                :landing-data="page"
                :url="url"
            ></component>
        </div>
    </div>
</template>
<script>
import LandingPreviewLead from '~/components/Marketing/LandingPages/LandingPreviewLead'
import LandingPreviewEmailMobile from '~/components/Marketing/LandingPages/LandingPreviewEmailMobile'
import LandingPreviewCollectMobile from '~/components/Marketing/LandingPages/LandingPreviewCollectMobile'
import { api } from '~/services'
export default {
    name: 'ViewLandingPage',
    components: {
        LandingPreviewLead,
        LandingPreviewCollectMobile,
        LandingPreviewEmailMobile,
    },
    props: ['url', 'id'],
    data: () => ({
        loading: false,
        page: {},
    }),
    computed: {
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
        const response = await api.profiles.getLandingPage(this.id)
        const { status, data, error } = response
        if (status === 'success') {
            this.page = data
            const response = await api.profiles.addPageVisitor({
                landing_page_id: data.id,
                user_id: data.user_id,
            })
            console.log(response)
        } else {
            this.$toast.error(error)
            this.$router.push({ name: '404' })
        }
        this.loading = false
    },
}
</script>
