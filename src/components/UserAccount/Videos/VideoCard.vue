<template>
    <div class="vid-crd">
        <div class="c__flex">
            <Icon icon="reorder" class="c__reorder vid-crd-drag-sel" />
            <div class="c__body">
                <img class="c__img" :src="thumbUrl" :alt="video.title" />
                <div class="c__info">
                    <h2 class="c__title">{{ video.title }}</h2>
                    <small class="c__private" v-if="isPrivate">Private</small>
                </div>
            </div>
        </div>
        <div class="c__actions">
            <span class="c__hover-actions">
                <IconButton icon="trash" @click="remove" />
            </span>
            <IconButton icon="edit-2" @click="edit" />
        </div>
    </div>
</template>

<script>
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { IconButton, SpinnerButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { getYtVideoThumbUrl } from '~/utils'

export default {
    name: 'VideoCard',
    components: {
        SpinnerButton,
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
        isPrivate() {
            return this.video.public == appConstants.user.visibilities.private
        },
        thumbUrl() {
            return getYtVideoThumbUrl(
                this.$youtube.getIdFromUrl(this.video.url)
            )
        },
    },
    methods: {
        edit() {
            this.$emit('editClick', { video: this.video })
        },
        remove() {
            this.$alert.alert({
                title: 'Delete video?',
                message: 'This video and its data will be permanently deleted.',
                okText: 'Confirm',
                cancelText: 'Cancel',
                onOk: async ({ close }) => {
                    close()
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/removeVideo', {
                        id: this.video.id,
                    })
                    this.$toast.success(status === 'success' ? message : error)
                },
            })
        },
    },
}
</script>
