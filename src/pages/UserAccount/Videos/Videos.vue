<template>
    <div class="page page-ua-vids">
        <header class="page__header">
            <h1 class="page__title">Your videos</h1>
            <h4 class="page__subtitle">Add, remove, edit &amp; order videos anyway you'd like.</h4>
        </header>
        <nav class="page__nav">
            <div class="page__nav__left">
                <span class="permalink">
                    <span class="permalink__light">link.stream/</span>
                    <span>{{ user.user_name }}/videos</span>
                </span>
                <preview-pill-button
                    :to="{
                        name: 'userVideos',
                        params: { username: user.user_name },
                    }"
                >Preview</preview-pill-button>
            </div>
            <div class="page__nav__right">
                <basic-button :to="{ name: 'userAccountVideosAdd' }">Add New Video</basic-button>
            </div>
        </nav>
        <main class="page__body">
            <Container @drop="handleReorder" drag-handle-selector=".vid-crd-drag-sel">
                <Draggable v-for="video in localVideos" :key="video.id">
                    <VideoCard
                        :video="video"
                        @editClick="handleEditClick"
                        @deleteClick="handleDeleteClick"
                    />
                </Draggable>
            </Container>
        </main>
        <VideoEditModal :video="videoToEdit" @hidden="handleEditModalHidden" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import { PreviewPillButton, BasicButton } from '~/components/Button'
import { VideoEditModal } from '~/components/Modal/Videos'
import { VideoCard } from '~/components/UserAccount/Videos'
import { appConstants } from '~/constants'

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
            localVideos: [],
            videoToEdit: {},
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            videos: 'me/videos',
        }),
    },
    async created() {
        this.$store.dispatch('me/loadVideos', {
            params: {
                page: 1,
                page_size: appConstants.user.account.videosPerPage,
            },
        })
    },
    watch: {
        videos() {
            this.localVideos = [...this.videos]
        },
    },
    methods: {
        handleEditModalHidden() {
            this.videoToEdit = {}
        },
        handleEditClick({ video }) {
            this.videoToEdit = video
            this.$bvModal.show('videoEditModal')
        },
        handleDeleteClick({ video }) {
            this.$alert.confirm({
                title: 'Delete video?',
                message: 'This video and its data will be permanently deleted.',
                okCallback: async alert => {
                    alert.loading = true
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteVideo', {
                        video,
                    })
                    if (status === 'success') {
                        this.$toast.success(message)
                    } else {
                        this.$toast.error(error)
                    }
                    alert.close()
                },
            })
        },
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const video = this.localVideos[oldIndex]
            this.localVideos.splice(oldIndex, 1)
            this.localVideos.splice(newIndex, 0, video)
            const sorts = this.localVideos.map((v, idx) => {
                return {
                    id: v.id,
                    sort: (idx + 1).toString(),
                }
            })
            this.$store.dispatch('me/reorderVideo', {
                oldIndex,
                newIndex,
                sorts,
            })
        },
    },
}
</script>
