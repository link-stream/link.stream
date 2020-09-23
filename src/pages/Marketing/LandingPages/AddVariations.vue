<template>
    <div class="page page-add-variations">
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
            </header>
            <main class="page-body">
                <div class="top-desc">
                    <h4 class="title">
                        Add variations
                    </h4>
                    <p class="description">
                        Make changes to a copy of your control page, or add a
                        page you've already created as a variation.
                    </p>
                </div>
                <div class="selected-control">
                    <h6 class="title">
                        Selected Control
                    </h6>
                    <SplitTestCard
                        :page="selectedControl"
                        type="control"
                        @copy="handleCopyClick"
                    />
                </div>
                <div class="variation-list">
                    <h6 class="title">
                        Variations(
                        {{ variations.length }}
                        )
                    </h6>
                    <SplitTestCard
                        v-for="(variation, index) in variations"
                        :key="`variation-${index}`"
                        :page="variation"
                        type="variation"
                        :index="index"
                        @copy="handleCopyClick"
                    />
                </div>
                <div class="copy-choose-container">
                    <h5 class="text">
                        To make a variation, you can
                        <a href="#">
                            copy the control
                        </a>
                        , or
                        <a href="#">
                            choose a different page
                        </a>
                    </h5>
                </div>
            </main>
            <footer class="page-footer">
                <div class="float-right">
                    <basic-button
                        class="btn-draft"
                        variant="secondary"
                        size="md"
                        @click="handleSaveDraftClick"
                    >
                        Save Draft
                    </basic-button>
                    <spinner-button size="md" @click="handleNextClick">
                        Next
                    </spinner-button>
                </div>
            </footer>
        </div>
        <CopyVariationModal />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SplitTestCard from '~/components/Marketing/LandingPages/SplitTestCard'
import CopyVariationModal from '~/components/Modal/Marketing/CopyVariationModal'
export default {
    name: 'EditSplitTest',
    components: {
        SplitTestCard,
        CopyVariationModal,
    },
    props: {
        selectedControl: {
            type: Object,
        },
    },
    data: () => ({
        loading: false,
        splitTitle: '',
        isEditTitle: false,
    }),
    computed: {
        ...mapGetters({
            splitTestData: 'marketing/splitTestData',
            variations: 'marketing/variations',
        }),
    },
    async created() {
        this.loading = true
        this.splitTitle = this.splitTestData.title
        await this.$store.dispatch('marketing/getVariations')
        this.loading = false
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
        async handleCopyClick(page) {
            console.log(page)
            const params = {
                ...page,
                title: page.title + ' - Copy',
                status: 'draft',
            }
            await this.$store.dispatch('marketing/setVariationData', params)
            this.$bus.$emit('modal.copyVariation.open')
        },
        handleSaveDraftClick() {},
        handleNextClick() {},
    },
}
</script>
