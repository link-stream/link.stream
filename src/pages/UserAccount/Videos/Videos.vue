<template>
    <div class="page page-ua-vids">
        <header class="page-header">
            <div class="col-left">
                <h1 class="page-title">Your videos</h1>
                <h4 class="page-subtitle">
                    Add, remove, edit &amp; order videos anyway you'd like.
                </h4>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/videos</span>
                    <preview-pill-button
                        :to="{
                            name: 'userVideos',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </preview-pill-button>
                </div>
            </div>
            <div class="col-right">
                <ls-button :to="{ name: 'userAccountVideosAdd' }">
                    Add New Video
                </ls-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-spinner" v-if="loading">
                <LsSpinner />
            </div>
            <Container
                v-else
                drag-handle-selector=".drag-icon"
                @drop="handleReorder"
            >
                <Draggable v-for="video in sortableVideos" :key="video.id">
                    <VideoCard
                        :video="video"
                        @edit-click="handleEditClick"
                        @delete-click="handleDeleteClick"
                    />
                </Draggable>
            </Container>
        </main>
        <VideoEditModal @delete-click="handleDeleteClick" />
    </div>
</template>

<script>
import { VideoEditModal } from '~/components/Modal'
import { VideoCard } from '~/components/UserAccount/Videos'
import { appConstants } from '~/constants'
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex'

export default {
    name: 'Videos',
    components: {
        Container,
        Draggable,
        VideoEditModal,
        VideoCard,
    },
    data() {
        return {
            loading: false,
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
        handleEditClick(video) {
            this.$bus.$emit('modal.videoEdit.open', video)
        },
        handleDeleteClick(video) {
            this.$alert.confirm({
                title: 'Delete video?',
                message: 'This video and its data will be permanently deleted.',
                onOk: async () => {
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteVideo', {
                        video,
                    })
                    if (status === 'success') {
                        this.$toast.success(message)
                        this.$bus.$emit('modal.videoEdit.close')
                    } else {
                        this.$toast.error(error)
                    }
                },
            })
        },
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const video = this.sortableVideos[oldIndex]
            this.sortableVideos.splice(oldIndex, 1)
            this.sortableVideos.splice(newIndex, 0, video)
            const sorts = this.sortableVideos.map(({ id }, index) => {
                return {
                    id,
                    sort: (index + 1).toString(),
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
