<template>
    <div class="crd vid-crd">
        <div class="crd-main">
            <Icon icon="reorder" class="crd-reorder" />
            <div class="crd-body">
                <div class="crd-art">
                    <div class="crd-lock" v-if="video.isPrivate"></div>
                    <img class="crd-img" :src="thumbUrl" :alt="video.title" />
                </div>
                <div class="crd-info">
                    <h2 class="crd-title">{{ video.title }}</h2>
                    <small class="crd-vis" v-if="video.isPrivate"
                        >Private
                    </small>
                </div>
            </div>
        </div>
        <div class="crd-actions">
            <span class="crd-hover">
                <IconButton icon="trash" @click="confirmDelete" />
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
        confirmDelete() {
            this.$alert.confirm({
                title: 'Delete video?',
                message: 'This video and its data will be permanently deleted.',
                okCallback: this.delete,
            })
        },
        async delete() {
            const { status, message, error } = await this.$store.dispatch(
                'me/deleteVideo',
                {
                    video: this.video,
                }
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
    },
}
</script>
