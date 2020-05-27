<template>
    <div class="c-card --video">
        <LsIcon class="c-reorder-i" icon="reorder" />
        <div class="c-body" @click="handleEditClick">
            <div class="c-media">
                <div class="c-lock" v-if="video.isPrivate"></div>
                <img class="c-img" :src="thumbUrl" :alt="video.title" />
            </div>
            <div class="c-info">
                <h2 class="c-title">{{ video.title }}</h2>
                <small class="c-subtitle" v-if="video.isPrivate">
                    Private
                </small>
            </div>
        </div>
        <LsIconButton
            class="c-del-btn"
            title="Delete"
            use-bg-img
            @click="handleDeleteClick"
        />
        <LsIconButton
            class="c-edit-btn"
            title="Edit"
            use-bg-img
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
