<template>
    <b-modal
        modal-class="SelectMediaModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Your media files</h4>
        </template>
        <template v-slot:default>
            <div class="search-bar">
                <SearchInput
                    placeholder="Search media"
                    pill
                    color="black"
                    v-model="searchString"
                    direction="right"
                    class="search-form"
                    @keyupEnter="searchMedia"
                />
                <BasicButton @click="handleUploadClick" size="sm">
                    Upload
                </BasicButton>
            </div>
            <b-form-row>
                <b-col
                    cols="6"
                    sm="3"
                    v-for="(media, index) in mediaList"
                    :key="index"
                    class="one-media-container"
                >
                    <b-aspect class="one-media">
                        <img :src="media.url" />
                    </b-aspect>
                </b-col>
            </b-form-row>
        </template>
        <template v-slot:modal-footer>
            <div>
                <b-pagination-nav number-of-pages="9" base-url="" align="center"></b-pagination-nav>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: 'SelectMediaModal',
    data() {
        return {
            open: false,
            searchString: '',
            mediaList: [
                {
                    url: '/static/media/logo1.png',
                },
                {
                    url: '/static/media/artwork1.jpg',
                },
                {
                    url: '/static/media/placeholder.png',
                },
                {
                    url: '/static/media/placeholder.png',
                },
                {
                    url: '/static/media/placeholder.png',
                },
                {
                    url: '/static/media/placeholder.png',
                },
                {
                    url: '/static/media/placeholder.png',
                },
                {
                    url: '/static/media/placeholder.png',
                },
            ]
        }
    },
    created() {
        this.$bus.$on('modal.selectMedia.open', this.handleOpen)
        this.$bus.$on('modal.selectMedia.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        searchMedia() {},
        handleUploadClick() {
            this.close()
        },
    },
}
</script>
