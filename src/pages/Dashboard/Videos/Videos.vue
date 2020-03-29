<template>
    <b-container fluid class="p-4 p-sm-5">
        <b-row>
            <b-col cols="12">
                <h2 class="page-title">Your Videos</h2>
                <label class="text-black">Add, remove, edit & order videos anyway you'd like</label>
            </b-col>
            <b-col cols="12" class="my-4">
                <MultiStateButton class="btn-action px-5" @onClick="$router.push({ name: 'userAccountVideosAdd' })">
                    Add New Video
                </MultiStateButton>
            </b-col>
            <b-col cols="12">
                <Container @drop="onDrop" drag-handle-selector=".dragable-selector">
                    <Draggable v-for="video in sortedVideos" :key="`video-${video.id}`">
                        <VideoCard :video="video"></VideoCard>
                    </Draggable>
                </Container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortBy } from 'lodash'
import { Container, Draggable } from 'vue-smooth-dnd'
import { call } from '~/services'
import { appConstants } from '~/constants'
import { VideoCard } from '~/components/Card'
import { MultiStateButton } from '~/components/Button'

export default {
    name: 'Videos',
    components: {
        Container,
        Draggable,
        VideoCard,
        MultiStateButton,
    },
    computed: {
        ...mapGetters(['user', 'videos']),
        sortedVideos() {
            return sortBy(this.videos, ['sort'])
        },
    },
    async created() {
        // fetch videos
        const { status, data } = await call(
            `/videos/${this.user.id}`,
            { page: 1, page_size: appConstants.videosPerPage },
            'GET',
            false
        )
        if (status === 'success') {
            this.$store.dispatch('loadVideos', { videos: data })
        }
    },
    methods: {
        async onDrop(dropResult) {
            const { removedIndex, addedIndex } = dropResult
            const moved = this.sortedVideos.find((video, index) => index === removedIndex)
            const remaining = this.sortedVideos.filter((video, index) => index !== removedIndex)
            const reordered = [...remaining.slice(0, addedIndex), moved, ...remaining.slice(addedIndex)]
            const sorts = reordered.map((video, index) => {
                return { id: video.id, sort: (index + 1).toString() }
            })
            this.$store.dispatch('sortVideos', { sorts })
            await call('/videos/sort_videos', { list: JSON.stringify(sorts) }, 'POST')
        },
    },
}
</script>

<style lang="scss" scoped>
.smooth-dnd-draggable-wrapper {
    overflow: inherit !important;
}
</style>
