<template>
    <b-modal modal-class="SelectMediaModal" centered v-model="open" size="lg">
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Your media files</h4>
        </template>
        <template v-slot:default>
            <div class="search-bar d-none d-sm-flex">
                <SearchInput
                    placeholder="Search media"
                    pill
                    color="black"
                    v-model="searchString"
                    direction="right"
                    class="search-form"
                    @keyupEnter="searchMedia"
                />
                <UploadImage @add-file="handleImageAdd" />
            </div>
            <div class="search-bar d-block d-sm-none">
                <UploadImage @add-file="handleImageAdd" />
                <SearchInput
                    placeholder="Search media"
                    pill
                    color="black"
                    v-model="searchString"
                    direction="right"
                    class="search-form"
                    @keyupEnter="searchMedia"
                />
            </div>
            <b-form-row>
                <b-col
                    cols="6"
                    sm="3"
                    v-for="(media, index) in medias"
                    :key="index"
                    class="one-media-container"
                >
                    <a
                        href="#"
                        @click.prevent="selectMedia(media)"
                        class="position-relative"
                    >
                        <b-aspect class="one-media">
                            <img
                                :src="`${mediaURL}${media.image_name}`"
                                :alt="media.image_name"
                            />
                            <div
                                v-if="media.id === selectedId"
                                class="sel-overlay"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'check-circle']"
                                />
                            </div>
                        </b-aspect>
                    </a>
                </b-col>
            </b-form-row>
        </template>
        <template v-slot:modal-footer>
            <div v-if="selectedId > -1" class="w-100">
                <spinner-button
                    variant="secondary"
                    size="md"
                    :loading="saving"
                    @click="handleDeleteClick"
                >
                    Delete
                </spinner-button>
                <spinner-button
                    size="md"
                    class="float-right"
                    @click="handleInsertClick"
                >
                    Insert
                </spinner-button>
            </div>
            <div v-else>
                <b-pagination-nav
                    number-of-pages="9"
                    base-url=""
                    align="center"
                    class="d-none"
                />
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImage from '~/components/Uploader/UploadImage'
import { appConstants } from '~/constants'
export default {
    name: 'SelectMediaModal',
    components: {
        UploadImage,
    },
    data() {
        return {
            open: false,
            searchString: '',
            mediaList: [],
            selectedId: -1,
            saving: false,
            mediaURL: appConstants.mediaURL,
        }
    },
    computed: {
        ...mapGetters({
            medias: 'marketing/medias',
        }),
    },
    async created() {
        this.$bus.$on('modal.selectMedia.open', this.handleOpen)
        this.$bus.$on('modal.selectMedia.close', this.handleClose)
        await this.$store.dispatch('marketing/getMedias')
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
        async handleImageAdd(file) {
            const params = {
                media: file.base64,
            }
            const { status, message, error } = await this.$store.dispatch(
                'marketing/addMedia',
                params
            )
            status === 'success'
                ? this.$toast.success(message)
                : this.$toast.error(error)
        },
        selectMedia(media) {
            if (media.id === this.selectedId) {
                this.selectedId = -1
            } else {
                this.selectedId = media.id
            }
        },
        handleDeleteClick() {
            this.$alert.confirm({
                title: 'Delete media?',
                message: 'This media will be permanently deleted.',
                onOk: async () => {
                    this.saving = true
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch(
                        'marketing/deleteMedia',
                        this.selectedId
                    )
                    status === 'success'
                        ? this.$toast.success(message)
                        : this.$toast.error(error)
                    this.saving= false
                },
            })
        },
        handleInsertClick() {
            const selectedMedia = this.medias.find(
                ({ id }) => id === this.selectedId
            )
            this.$emit(
                'select',
                selectedMedia.image_name
            )
            this.selectedId = -1
            this.close()
        },
    },
}
</script>
