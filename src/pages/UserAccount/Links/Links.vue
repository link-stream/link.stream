<template>
    <div class="page page-ua-links">
        <header class="page__header">
            <h1 class="page__title">Your links</h1>
            <h4 class="page__subtitle">Add, remove, edit &amp; order links anyway you'd like.</h4>
        </header>
        <nav class="page__nav">
            <div class="page__nav__left">
                <span class="permalink">
                    <span class="permalink__light">link.stream/</span>
                    <span>{{ user.user_name }}/links</span>
                </span>
                <preview-pill-button
                    :to="{
                        name: 'userLinks',
                        params: { username: user.user_name },
                    }"
                >Preview</preview-pill-button>
            </div>
            <div class="page__nav__right">
                <basic-button :to="{ name: 'userAccountLinksAdd' }">Add New Link</basic-button>
            </div>
        </nav>
        <main class="page__body">
            <LoadingIndicator :loading="loading" />
            <Container v-if="!loading" @drop="handleDrop" drag-handle-selector=".lnk-crd-drag-sel">
                <Draggable v-for="link in links" :key="link.id">
                    <LinkCard :link="link" @delete-click="handleDeleteClick" />
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
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            links: 'me/links',
        }),
    },
    async created() {
        await this.$store.dispatch('me/loadLinks')
        this.loading = false
    },
    methods: {
        handleDeleteClick({ link }) {
            this.$alert.confirm({
                title: 'Delete link?',
                message: 'This link and its data will be permanently deleted.',
                okCallback: async () => {
                    this.loading = true
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteLink', {
                        link,
                    })
                    if (status === 'success') {
                        this.$toast.success(message)
                    } else {
                        this.$toast.error(error)
                    }
                    this.loading = false
                },
            })
        },
        handleDrop() {},
    },
}
</script>
