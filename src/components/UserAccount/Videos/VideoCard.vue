<template>
    <div class="Card VideoCard" :class="{ 'is-private': video.isPrivate }">
        <LsIcon class="drag-icon" icon="drag" />
        <main class="video-content" @click="handleEditClick">
            <div class="Card-media">
                <div class="lock-thumb"></div>
                <img class="Card-img" :src="thumbUrl" :alt="video.title" />
            </div>
            <div class="Card-body">
                <h4 class="Card-title">{{ video.title }}</h4>
                <small class="private-badge">
                    Private
                </small>
            </div>
        </main>
        <LsButton
            variant="icon-bg"
            class="trash-btn"
            title="Delete"
            @click="handleDeleteClick"
        />
        <LsButton
            variant="icon-bg"
            class="edit-btn"
            title="Edit"
            @click="handleEditClick"
        />
    </div>
</template>

<script>
import { getYtVideoThumbUrl } from '~/utils'

export default {
    name: 'VideoCard',
    props: {
        video: {
            type: Object,
            required: true,
        },
    },
    computed: {
        thumbUrl() {
            return getYtVideoThumbUrl(
                this.$youtube.getIdFromUrl(this.video.url)
            )
        },
    },
    methods: {
        handleEditClick() {
            this.$emit('edit-click', this.video)
        },
        handleDeleteClick() {
            this.$emit('delete-click', this.video)
        },
    },
}
</script>
