<template>
    <div class="page page-ua-vids">
        <header class="page-header">
            <h1 class="page-title">Your videos</h1>
            <h4 class="page-subtitle">
                Add, remove, edit &amp; order videos anyway you'd like.
            </h4>
        </header>
        <nav class="page-nav">
            <div class="page-nav-left">
                <span class="permalnk">
                    <span class="permalnk-light">link.stream/</span>
                    <span>{{ user.user_name }}/videos</span>
                </span>
                <preview-pill-button
                    :to="{
                        name: 'userVideos',
                        params: { username: user.user_name },
                    }"
                    >Preview</preview-pill-button
                >
            </div>
            <div class="page-nav-right">
                <basic-button :to="{ name: 'userAccountVideosAdd' }"
                    >Add New Video</basic-button
                >
            </div>
        </nav>
        <main class="page-body">
            <LoadingSpinner v-if="loading" />
            <Container
                @drop="handleReorder"
                drag-handle-selector=".crd-reorder-i"
            >
                <Draggable v-for="video in localVideos" :key="video.id">
                    <VideoCard
                        :video="video"
                        @edit-click="openEditModal"
                        @delete-click="handleDeleteClick"
                    />
                </Draggable>
            </Container>
        </main>
        <VideoEditModal
            v-if="editingVideo"
            :video="editingVideo"
            @hidden="handleEditModalHidden"
            @delete-click="handleDeleteClick"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import { PreviewPillButton, BasicButton } from '~/components/Button'
import { VideoEditModal } from '~/components/Modal/Videos'
import { VideoCard } from '~/components/UserAccount/Videos'
import { LoadingSpinner } from '~/components/Loading'
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
        LoadingSpinner,
    },
    data() {
        return {
            loading: true,
            localVideos: [],
            editingVideo: null,
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            videos: 'me/videos',
        }),
    },
    watch: {
        videos: {
            immediate: true,
            handler() {
                this.localVideos = [...this.videos]
            },
        },
    },
    async created() {
        await this.$store.dispatch('me/loadVideos', {
            params: {
                page: 1,
                page_size: appConstants.user.account.videosPerPage,
            },
        })
        this.loading = false
    },
    methods: {
        openEditModal(video) {
            this.editingVideo = video
        },
        handleDeleteClick(video) {
            this.$alert.confirm({
                title: 'Delete video?',
                message: 'This video and its data will be permanently deleted.',
                okCallback: async () => {
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteVideo', {
                        video,
                    })
                    if (status === 'success') {
                        if (this.editingVideo) {
                            this.editingVideo = null
                        }
                        this.$toast.success(message)
                    } else {
                        this.$toast.error(error)
                    }
                },
            })
        },
        handleEditModalHidden() {
            this.editingVideo = null
        },
        handleReorder(result) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = result
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
