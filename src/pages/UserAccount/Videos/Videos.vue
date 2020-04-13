<template>
    <div class="page page-ua-vids container-fluid">
        <header class="page__header">
            <h1 class="page__title">Your videos</h1>
            <h4 class="page__subtitle">Add, remove, edit &amp; order videos anyway you'd like.</h4>
        </header>
        <nav class="page__nav">
            <div class="nav__left">
                <span class="preview-url">
                    <span class="text-muted">link.stream/</span>
                    {{ user.user_name }}/videos
                </span>
                <preview-pill-button
                    :to="{ name: 'userVideos', params: { username: user.user_name }}"
                >Preview</preview-pill-button>
            </div>
            <div class="nav__right">
                <basic-button :to="{ name: 'userAccountVideoAdd' }">Add New Video</basic-button>
            </div>
        </nav>
        <main class="page__body">
            <Container @drop="handleDrop" drag-handle-selector=".vid-crd-drag-sel">
                <Draggable v-for="video in videos" :key="`video-${video.id}`">
                    <VideoCard :video="video" @editClick="handleEditClick" />
                </Draggable>
            </Container>
        </main>

        <VideoEditModal :videoToEdit="videoToEdit" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import { lsApi } from '~/services/lsApi'
import { BasicButton, PreviewPillButton } from '~/components/Button'
import { VideoEditModal } from '~/components/Modal/Videos'
import { VideoCard } from '~/components/UserAccount/Videos'
import { appConstants } from '~/constants'
import { cloneDeep } from 'lodash'

export default {
    name: 'Videos',
    components: {
        Container,
        Draggable,
        BasicButton,
        PreviewPillButton,
        VideoEditModal,
        VideoCard,
    },
    data() {
        return {
            videoToEdit: {},
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            videos: 'me/videos',
        }),
    },
    created() {
        this.$store.dispatch('me/loadVideos', {
            userId: this.user.id,
            params: {
                page: 1,
                page_size: appConstants.user.account.videosPerPage,
            },
        })
    },
    methods: {
        handleEditClick({ video }) {
            this.videoToEdit = cloneDeep(video)
            this.$bvModal.show('vidEditMdl')
        },
        handleDrop(dropResult) {
            const { removedIndex, addedIndex } = dropResult
            const moved = this.videos.find(
                (video, index) => index === removedIndex
            )
            const remaining = this.videos.filter(
                (video, index) => index !== removedIndex
            )
            const reordered = [
                ...remaining.slice(0, addedIndex),
                moved,
                ...remaining.slice(addedIndex),
            ]
            const sorts = reordered.map((video, index) => {
                return { id: video.id, sort: (index + 1).toString() }
            })
            this.$store.dispatch('me/sortVideos', { sorts })
        },
    },
}
</script>
