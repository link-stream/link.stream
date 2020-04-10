<template>
    <b-container fluid class="page-ua-vids p-4 p-sm-5">
        <b-row>
            <b-col cols="12">
                <h2 class="page-title">Your Videos</h2>
                <label class="text-black">
                    Add, remove, edit &amp; order videos anyway you'd
                    like
                </label>
            </b-col>
            <b-col cols="12" class="my-4">
                <SpinnerButton @click="$router.push({ name: 'userAccountVideosAdd' })">Add New Video</SpinnerButton>
            </b-col>
            <b-col cols="12">
                <Container @drop="onDrop" drag-handle-selector=".dragable-selector">
                    <Draggable v-for="video in sortedVideos" :key="`video-${video.id}`">
                        <VideoEditCard :video="video" />
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
import { lsApi } from '~/services/lsApi'
import { appConstants } from '~/constants'
import VideoEditCard from '~/components/UserAccount/Videos/VideoEditCard'
import { SpinnerButton } from '~/components/Button'
export default {
    name: 'Videos',
    components: {
        Container,
        Draggable,
        VideoEditCard,
        SpinnerButton,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            videos: 'me/videos',
        }),
        sortedVideos() {
            return sortBy(this.videos, ['sort'])
        },
    },
    async created() {
        const { status, data } = await lsApi.videos.getVideosByUser(
            this.user.id,
            { page: 1, page_size: appConstants.videosPerPage },
            { showProgress: false }
        )
        if (status === 'success') {
            this.$store.dispatch('me/updateVideos', { videos: data })
        }
    },
    methods: {
        async onDrop(dropResult) {
            const { removedIndex, addedIndex } = dropResult
            const moved = this.sortedVideos.find(
                (video, index) => index === removedIndex
            )
            const remaining = this.sortedVideos.filter(
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
            await lsApi.videos.sortVideos({ list: JSON.stringify(sorts) })
        },
    },
}
</script>
