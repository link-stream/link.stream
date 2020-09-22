<template>
    <div class="page page-edit-split">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'landingPages' }"
            >
                <i class="ico ico-back"></i>
                <span>Landing Pages</span>
            </basic-button>
        </nav>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <header class="page-header">
                <div class="left-col">
                    <div v-if="isEditTitle" class="edit-email-container">
                        <b-form-input
                            v-model="splitTitle"
                            placeholder="Placeholder Split Test Title"
                        >
                        </b-form-input>
                        <spinner-button
                            class="btn-save"
                            @click="handleSaveClick"
                            size="sm"
                        >
                            Save
                        </spinner-button>
                        <basic-button
                            class="text-black"
                            variant="link"
                            @click="handleCancelClick"
                        >
                            Cancel
                        </basic-button>
                    </div>
                    <div v-else>
                        <h1 class="page-title">
                            {{ splitTitle }}
                        </h1>
                        <a href="#" @click.prevent="showEditTitle">
                            Edit title
                        </a>
                    </div>
                </div>
                <div class="right-col">
                    <spinner-button
                        @click="handleCreateClick"
                        :disabled="isEditTitle"
                    >
                        Create New Page
                    </spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="top-desc">
                    <h4 class="title">
                        Select a control page
                    </h4>
                    <p class="description">
                        The ‘Control’ is the orginal version, which will serve as the base to test against.
                    </p>
                </div>
                <SearchInput
                    pill
                    color="black"
                    v-model="searchString"
                    placeholder="Search landing pages"
                    direction="right"
                    class="search-form"
                    @keyupEnter="searchLandingPages"
                />
                <div class="page-list">
                    <SplitTestCard
                        v-for="(page, index) in landingPages"
                        :key="`page-${index}`"
                        :page="page"
                    />
                </div>
            </main>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SplitTestCard from '~/components/Marketing/LandingPages/SplitTestCard'
export default {
    name: 'EditSplitTest',
    components: {
        SplitTestCard,
    },
    data: () => ({
        loading: false,
        splitTitle: '',
        isEditTitle: false,
        searchString: '',
        landingPages: [
            {
                title: 'Someone To Love You',
                created_at: '2020/07/08 22:05:00',
                status: 'published',
                conversion: 18,
            },
            {
                title: 'Another Landing Page',
                created_at: '2020/07/07 22:05:00',
                status: 'published',
                conversion: 18,
            },
            {
                title: 'Someone To Love You',
                created_at: '2020/07/07 10:05:00',
                status: 'published',
                conversion: 18,
            },
        ]
    }),
    computed: {
        ...mapGetters({
            splitTestData: 'marketing/splitTestData',
        }),
    },
    created() {
        this.splitTitle = this.splitTestData.title
    },
    methods: {
        showEditTitle() {
            this.isEditTitle = true
        },
        async handleSaveClick() {
            const params = {
                ...this.splitTestData,
                title: this.splitTitle,
            }
            await this.$store.dispatch('marketing/setSplitTestData', params)
            this.isEditTitle = false
        },
        handleCancelClick() {
            this.splitTitle = this.splitTestData.title
            this.isEditTitle = false
        },
        handleCreateClick() {},
        searchLandingPages() {},
    },
}
</script>
