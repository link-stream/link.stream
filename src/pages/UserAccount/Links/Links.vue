<template>
    <div class="page page-ua-links">
        <header class="page-header">
            <div class="header-left">
                <h1 class="page-title">Your links</h1>
                <h4 class="page-subtitle">
                    Add, remove, edit &amp; order links anyway you'd like.
                </h4>
                <div class="permaurl">
                    <span class="permaurl-light">link.stream/</span>
                    <span>{{ user.user_name }}/links</span>
                    <preview-pill-button
                        class="permaurl-link"
                        :to="{
                            name: 'userLinks',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </preview-pill-button>
                </div>
            </div>
            <div class="header-right">
                <ls-button :to="{ name: 'userAccountLinksAdd' }">
                    Add New Link
                </ls-button>
            </div>
        </header>
        <main class="page-body">
            <LsSpinner v-if="loading" />
            <Container
                v-else
                @drop="handleReorder"
                drag-handle-selector=".crd-reorder-i"
            >
                <Draggable v-for="link in sortableLinks" :key="link.id">
                    <LinkCard
                        :link="link"
                        @schedule-click="handleScheduleClick"
                    />
                </Draggable>
            </Container>
        </main>
        <LinkScheduleModal />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LinkCard } from '~/components/UserAccount/Links'
import { LinkScheduleModal } from '~/components/Modal'
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
    name: 'Links',
    components: {
        LinkCard,
        Container,
        Draggable,
        LinkScheduleModal,
    },
    data() {
        return {
            loading: false,
            sortableLinks: [],
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            links: 'me/links',
        }),
    },
    watch: {
        links: {
            immediate: true,
            handler() {
                this.sortableLinks = [...this.links]
            },
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadLinks')
        this.loading = false
    },
    methods: {
        handleScheduleClick(link) {
            this.$bus.$emit('modal.linkSchedule.show', link)
        },
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const link = this.sortableLinks[oldIndex]
            this.sortableLinks.splice(oldIndex, 1)
            this.sortableLinks.splice(newIndex, 0, link)
            const sorts = this.sortableLinks.map((v, idx) => {
                return {
                    id: v.id,
                    sort: (idx + 1).toString(),
                }
            })
            this.$store.dispatch('me/reorderLink', {
                oldIndex,
                newIndex,
                sorts,
            })
        },
    },
}
</script>
