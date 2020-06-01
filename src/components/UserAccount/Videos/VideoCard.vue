<template>
    <div class="Card VideoCard">
        <LsIcon class="drag-icon" icon="drag" />
        <main @click="handleEditClick">
            <div class="Card-media">
                <div class="lock-img" v-if="video.isPrivate"></div>
                <img class="Card-img" :src="thumbUrl" :alt="video.title" />
            </div>
            <div class="Card-body">
                <h2 class="Card-title">{{ video.title }}</h2>
                <small class="Card-subtitle" v-if="video.isPrivate">
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
