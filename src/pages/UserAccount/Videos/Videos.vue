<template>
    <div class="page page-ua-vids">
        <header class="page-header">
            <div class="header-left">
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
            <div class="header-right">
                <ls-button :to="{ name: 'userAccountVideosAdd' }">
                    Add New Video
                </ls-button>
            </div>
        </header>
        <main class="page-body">
            <LsSpinner v-if="loading" />
            <Container
                @drop="handleReorder"
                drag-handle-selector=".Card-drag-i"
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
import { mapGetters } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import { VideoEditModal } from '~/components/Modal'
import { VideoCard } from '~/components/UserAccount/Videos'
import { appConstants } from '~/constants'

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
            this.$bus.$emit('modal.videoEdit.show', video)
        },
        handleDeleteClick(video) {
            this.$alert.confirm({
                title: 'Delete video?',
                message:
                    'This video and its data will be permaurlnently deleted.',
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
                        this.$bus.$emit('modal.videoEdit.hide')
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
