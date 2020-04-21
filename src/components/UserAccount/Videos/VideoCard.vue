<template>
    <div class="crd vid-crd">
        <div class="crd__flex">
            <Icon icon="reorder" class="crd__reorder vid-crd-drag-sel" />
            <div class="crd__body">
                <div class="crd__thumb">
                    <div class="crd__lock" v-if="video.isPrivate"></div>
                    <img class="crd__img" :src="thumbUrl" :alt="video.title" />
                </div>
                <div class="crd__info">
                    <h2 class="crd__title">{{ video.title }}</h2>
                    <small class="crd__priv" v-if="video.isPrivate">Private</small>
                </div>
            </div>
        </div>
        <div class="crd__act">
            <span class="crd__hov">
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
