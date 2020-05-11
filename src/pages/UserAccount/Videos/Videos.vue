<template>
    <div class="page page-ua-vids">
        <header class="page-header">
            <div class="header-col">
                <h1 class="page-title">Your videos</h1>
                <h4 class="page-subtitle">
                    Add, remove, edit &amp; order videos anyway you'd like.
                </h4>
                <div class="permaurl">
                    <span class="permaurl-light">link.stream/</span>
                    <span>{{ user.user_name }}/videos</span>
                    <preview-pill-button
                        class="permaurl-link"
                        :to="{
                            name: 'userVideos',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </preview-pill-button>
                </div>
            </div>
            <div class="header-col">
                <basic-button :to="{ name: 'userAccountVideosAdd' }">
                    Add New Video
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <LoadingSpinner v-if="loading" />
            <Container
                @drop="handleReorder"
                drag-handle-selector=".crd-reorder-i"
            >
                <Draggable v-for="video in sortableVideos" :key="video.id">
                    <VideoCard
                        :video="video"
                        @edit-click="showEditModal"
                        @delete-click="deleteVideo"
                    />
                </Draggable>
            </Container>
        </main>
        <VideoEditModal
            v-if="editingVideo"
            :video="editingVideo"
            @hidden="handleEditModalHidden"
            @delete-click="deleteVideo"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import { VideoEditModal } from '~/components/Modal'
import { VideoCard } from '~/components/UserAccount/Videos'
import { LoadingSpinner } from '~/components/Loading'
import { appConstants } from '~/constants'

export default {
    name: 'Videos',
    components: {
        Container,
        Draggable,
        VideoEditModal,
        VideoCard,
        LoadingSpinner,
    },
    data() {
        return {
            loading: false,
            editingVideo: false,
            sortableVideos: [],
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
                this.sortableVideos = [...this.videos]
            },
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadVideos', {
            params: {
                page: 1,
                page_size: appConstants.user.account.videosPerPage,
            },
        })
        this.loading = false
    },
    methods: {
        showEditModal(video) {
            this.editingVideo = video
        },
        deleteVideo(video) {
            this.$alert.confirm({
                title: 'Delete video?',
                message:
                    'This video and its data will be permaurlnently deleted.',
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
                            this.editingVideo = false
                        }
                        this.$toast.success(message)
                    } else {
                        this.$toast.error(error)
                    }
                },
            })
        },
        handleEditModalHidden() {
            this.editingVideo = false
        },
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const video = this.sortableVideos[oldIndex]
            this.sortableVideos.splice(oldIndex, 1)
            this.sortableVideos.splice(newIndex, 0, video)
            const sorts = this.sortableVideos.map((v, idx) => {
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
