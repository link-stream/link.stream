<template>
    <div class="crd vid-crd">
        <div class="crd-flex">
            <Icon icon="reorder" class="crd-reorder vid-crd-drag-sel" />
            <div class="crd-body">
                <div class="crd-thumb">
                    <div class="crd-lock" v-if="video.isPrivate"></div>
                    <img class="crd-img" :src="thumbUrl" :alt="video.title" />
                </div>
                <div class="crd-info">
                    <h2 class="crd-title">{{ video.title }}</h2>
                    <small class="crd-priv" v-if="video.isPrivate"
                        >Private</small
                    >
                </div>
            </div>
        </div>
        <div class="crd-act">
            <span class="crd-hov">
                <IconButton icon="trash" @click="handleDeleteClick" />
            </span>
            <IconButton icon="edit-2" @click="handleEditClick" />
        </div>
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
