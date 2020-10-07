<template>
    <div class="video-item">
        <youtube class="video-wrapper" :video-id="ytVidId"></youtube>
        <div class="video-desc">
            <div class="title">{{ videoItem.title }}</div>
            <div class="cnt-view">
                {{ videoItem.cnt_view | thousandNumber }}
                Views
            </div>
        </div>
        <b-dropdown class="actions-menu" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-v-s" />
            </template>
            <b-dropdown-item>Go to Video Page</b-dropdown-item>
            <b-dropdown-item :href="videoItem.url" target="_blank">View on YouTube</b-dropdown-item>
            <b-dropdown-item v-show="false">Save</b-dropdown-item>
            <b-dropdown-item @click="handleShareClick">Share</b-dropdown-item>
        </b-dropdown>
        <ShareArtModal v-if="isShowShare" :curItem="curItem" @close="isShowShare = false" />
    </div>
</template>
<script>
import ShareArtModal from '@/components/Modal/ShareArtModal'
import { getYtVideoThumbUrl } from '~/utils'
export default {
    name: 'VideoItemm',
    props: {
        videoItem: {
            type: Object,
        },
    },
    components: {
        ShareArtModal,
    },
    data: () => ({
        isShowShare: false,
    }),
    computed: {
        ytVidId() {
            return this.$youtube.getIdFromUrl(this.videoItem.url)
        },
        thumbUrl() {
            return getYtVideoThumbUrl(
                this.$youtube.getIdFromUrl(this.videoItem.url)
            )
        },
        curItem() {
            return {
                ...this.videoItem,
                coverart: this.thumbUrl,
                type: 'video',
            }
        },
    },
    methods: {
        handleShareClick() {
            this.isShowShare = true
        },
    },
}
</script>
