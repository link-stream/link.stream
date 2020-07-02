<template>
    <div class="page page-links">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Your links</h1>
                <h4 class="page-subtitle">
                    Add, remove, edit &amp; order links anyway you'd like.
                </h4>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/links</span>
                    <basic-button
                        variant="outline-light"
                        size="xs"
                        :to="{
                            name: 'userLinks',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </basic-button>
                </div>
            </div>
            <div class="right-col">
                <basic-button :to="{ name: 'accountLinkAdd' }">
                    Add New Link
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-spinner" v-if="loading">
                <LoadingSpinner />
            </div>
            <Container
                v-else
                @drop="handleReorder"
                drag-handle-selector=".drag-icon"
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
import { LinkCard } from '~/components/Account/Links'
import { LinkScheduleModal } from '~/components/Modal'
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex'

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
        links(newValue) {
            this.sortableLinks = [...newValue]
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadLinks')
        this.loading = false
    },
    methods: {
        handleScheduleClick(link) {
            this.$bus.$emit('modal.linkSchedule.open', link)
        },
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const link = this.sortableLinks[oldIndex]
            this.sortableLinks.splice(oldIndex, 1)
            this.sortableLinks.splice(newIndex, 0, link)
            const sorts = this.sortableLinks.map(({ id }, index) => {
                return {
                    id,
                    sort: (index + 1).toString(),
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
