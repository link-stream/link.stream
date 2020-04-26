<template>
    <div class="crd vid-crd">
        <Icon class="crd-reorder-i" icon="reorder" />
        <div class="crd-content">
            <div class="crd-art">
                <div class="crd-lock" v-if="video.isPrivate"></div>
                <img class="crd-img" :src="thumbUrl" :alt="video.title" />
            </div>
            <div class="crd-body">
                <h2 class="crd-title">{{ video.title }}</h2>
                <small class="crd-vis" v-if="video.isPrivate">Private</small>
            </div>
        </div>
        <IconButton
            class="crd-del-btn"
            title="Delete"
            use-bg-img
            @click="handleDeleteClick"
        />
        <IconButton
            class="crd-edit-btn"
            title="Edit"
            use-bg-img
            @click="handleEditClick"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IconButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { getYtVideoThumbUrl } from '~/utils'

export default {
    name: 'VideoCard',
    components: {
        IconButton,
        Icon,
    },
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
