<template>
    <div class="video-item">
        <youtube class="video-wrapper" :video-id="ytVidId"></youtube>
        <div class="video-desc">
            <div class="title">
                {{ videoItem.title }}
            </div>
            <div class="cnt-view">
                {{ videoItem.cnt_view | thousandNumber }}
                Views
            </div>
        </div>
        <b-dropdown class="actions-menu" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-v-s" />
            </template>
            <b-dropdown-item>
                Go to Video Page
            </b-dropdown-item>
            <b-dropdown-item :href="videoItem.url" target="_blank">
                View on YouTube
            </b-dropdown-item>
            <b-dropdown-item>
                Save
            </b-dropdown-item>
            <b-dropdown-item>
                Share
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>
<script>
export default {
    name: 'VideoItemm',
    props: {
        videoItem: {
            type: Object,
        },
    },
    computed: {
        ytVidId() {
            return this.$youtube.getIdFromUrl(this.videoItem.url)
        },
    },
    methods: {},
}
</script>
