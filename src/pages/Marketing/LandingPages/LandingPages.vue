<template>
    <div class="page page-landing-pages">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Landing Pages</h1>
                <h6 class="page-subtitle">
                    Manage landing pages and tests
                </h6>
            </div>
            <div class="right-col">
                <!-- <basic-button
                    class="btn-create-split"
                    variant="outline-black"
                    @click="handleCreateSplitClick"
                >
                    Create Split Test
                </basic-button> -->
                <basic-button @click="handleCreatePageClick">
                    Create New page
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-empty" v-if="!loading && !pages.length">
                <div class="empty-text">
                    Your landing pages will appear here.
                </div>
            </div>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-else-if="pages.length > 0" class="page-list">
                <h6 class="date-title">
                    Landing Pages (
                    {{ pages.length }}
                    )
                </h6>
                <PageCard
                    v-for="(page, index) in pages"
                    :key="`page-${index}`"
                    :page="page"
                />
            </div>
        </main>
        <CreateSplitModal />
    </div>
</template>
<script>
import PageCard from '~/components/Marketing/LandingPages/PageCard'
import CreateSplitModal from '~/components/Modal/Marketing/CreateSplitModal'
import { mapGetters } from 'vuex'
export default {
    name: 'LaningPages',
    components: {
        PageCard,
        CreateSplitModal,
    },
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters({
            pages: 'marketing/landingPages',
        }),
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('marketing/getLandingPages')
        await this.$store.dispatch('marketing/getMarketingPromotes')
        this.loading = false
        console.log(this.pages)
    },
    methods: {
        handleCreatePageClick() {
            this.$router.push({
                name: 'selectPageTemplate',
            })
        },
        handleCreateSplitClick() {
            this.$bus.$emit('modal.createSplit.open')
        },
    },
}
</script>
