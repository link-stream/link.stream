<template>
    <div class="c-card --video">
        <LsIcon class="c-card-reorder-i" icon="reorder" />
        <div class="c-card-body" @click="handleEditClick">
            <div class="c-card-media">
                <div class="c-card-lock" v-if="video.isPrivate"></div>
                <img class="c-card-img" :src="thumbUrl" :alt="video.title" />
            </div>
            <div class="c-card-info">
                <h2 class="c-card-title">{{ video.title }}</h2>
                <small class="c-card-subtitle" v-if="video.isPrivate">
                    Private
                </small>
            </div>
        </div>
        <LsIconButton
            class="c-card-del-btn"
            title="Delete"
            use-bg-img
            @click="handleDeleteClick"
        />
        <LsIconButton
            class="c-card-edit-btn"
            title="Edit"
            use-bg-img
            @click="handleEditClick"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
