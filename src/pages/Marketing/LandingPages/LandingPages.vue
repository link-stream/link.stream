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
                    Your pages and tests will appear here.
                </div>
            </div>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-else-if="pages.length > 0" class="page-list">
                <h6 class="date-title">
                    Landing Pages &amp; Tests(
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
export default {
    name: 'LaningPages',
    components: {
        PageCard,
        CreateSplitModal,
    },
    data: () => ({
        loading: false,
        pages: [
            {
                type: 'Page',
                title: 'Someone To Love You - Copy',
                created_at: '2020/07/08 22:05:00',
                status: 'draft',
                conversion: '',
            },
            {
                type: 'Page',
                title: 'Someone To Love You',
                created_at: '2020/07/08 22:05:00',
                status: 'live',
                conversion: 18,
            },
            {
                type: 'Page',
                title: 'My First Landing Page',
                crated_at: '2020/07/07 22:00:00',
                status: 'inactive',
                conversion: 8,
            },
        ],
    }),
    async created() {
        this.loading = true
        this.loading = false
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
