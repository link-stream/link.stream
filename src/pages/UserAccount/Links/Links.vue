<template>
    <div class="page page-ua-links">
        <header class="page-header">
            <h1 class="page-title">Your links</h1>
            <h4 class="page-subtitle"
                >Add, remove, edit &amp; order links anyway you'd like.</h4
            >
        </header>
        <nav class="page-nav">
            <div class="page-nav-left">
                <span class="permalnk">
                    <span class="permalnk-light">link.stream/</span>
                    <span>{{ user.user_name }}/links</span>
                </span>
                <preview-pill-button
                    :to="{
                        name: 'userLinks',
                        params: { username: user.user_name },
                    }"
                    >Preview</preview-pill-button
                >
            </div>
            <div class="page-nav-right">
                <basic-button :to="{ name: 'userAccountLinksAdd' }"
                    >Add New Link</basic-button
                >
            </div>
        </nav>
        <main class="page-body">
            <LoadingIndicator :loading="loading" />
            <Container
                v-if="!loading"
                @drop="handleReorder"
                drag-handle-selector=".crd-reorder"
            >
                <Draggable v-for="link in localLinks" :key="link.id">
                    <LinkCard :link="link" />
                </Draggable>
            </Container>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BasicButton, PreviewPillButton } from '~/components/Button'
import { LinkCard } from '~/components/UserAccount/Links'
import { LoadingIndicator } from '~/components/Loading'
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
    name: 'Links',
    components: {
        BasicButton,
        PreviewPillButton,
        LinkCard,
        Container,
        Draggable,
        LoadingIndicator,
    },
    data() {
        return {
            loading: true,
            localLinks: [],
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
                this.localLinks = [...this.links]
            },
        },
    },
    async created() {
        await this.$store.dispatch('me/loadLinks')
        this.loading = false
    },
    methods: {
        handleReorder(result) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = result
            const link = this.localLinks[oldIndex]
            this.localLinks.splice(oldIndex, 1)
            this.localLinks.splice(newIndex, 0, link)
            const sorts = this.localLinks.map((v, idx) => {
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
