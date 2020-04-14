<template>
    <div class="vid-crd">
        <div class="crd__flex">
            <Icon icon="reorder" class="crd__reorder vid-crd-drag-sel" />
            <div class="crd__body">
                <img class="crd__img" :src="thumbUrl" :alt="video.title" />
                <div class="crd__info">
                    <h2 class="crd__title">{{ video.title }}</h2>
                    <small class="crd__priv" v-if="isPrivate">Private</small>
                </div>
            </div>
        </div>
        <div class="crd__act">
            <span class="crd__hov">
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
            this.$emit('edit', { video: this.video })
        },
        remove() {
            this.$emit('remove', { video: this.video })
        },
    },
}
</script>
