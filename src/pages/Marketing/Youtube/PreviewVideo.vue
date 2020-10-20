<template>
    <div class="page page-preview-video">
        <div v-if="isCompleted">
            <header class="page-header">
                <div class="left-col">
                    <h1 class="page-title">Your Video has uploaded!</h1>
                    <h6 class="page-subtitle">
                        {{ form.title }}
                        has published to YouTube
                    </h6>
                </div>
            </header>
            <main class="page-body">
                <h6 class="page-subtitle">
                    View or
                    <a href="#">share</a>
                    your video link:
                </h6>
                <a :href="result.link" target="_blank">
                    {{ result.link }}
                </a>
                <basic-button
                    class="btn-another-upload"
                    :to="{ name: 'youtubeUploader' }"
                >
                    Upload Another Video
                </basic-button>
            </main>
        </div>
        <div v-else-if="uploading">
            <header class="page-header">
                <div class="left-col">
                    <h1 class="page-title">
                        <LoadingSpinner
                            class="m-2 float-left"
                            animation="bounce"
                        />
                        Processing...
                    </h1>
                    <h6 class="page-subtitle">
                        Please wait for files to be encoded and uploaded to
                        YouTube
                    </h6>
                </div>
            </header>
        </div>
        <div v-else>
            <nav class="page-nav">
                <basic-button
                    class="back-btn"
                    variant="text"
                    :to="{ name: 'youtubeUploader' }"
                >
                    <i class="ico ico-back"></i>
                    <span>Back</span>
                </basic-button>
            </nav>
            <header class="page-header">
                <div class="left-col">
                    <h1 class="page-title">Preview your video</h1>
                    <h6 class="page-subtitle">
                        Drive more traffic to your store and boost sales by
                        publishing your beats to YouTube
                    </h6>
                </div>
            </header>
            <main class="page-body">
                <div class="image-preview">
                    <p class="title">
                        Video background image preview
                    </p>
                    <div class="image-container">
                        <img :src="form.src" />
                    </div>
                </div>
                <b-form-group label="Title">
                    <b-form-input
                        placeholder="Video Title"
                        v-model="form.title"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Description">
                    <textarea
                        class="form-control"
                        rows="4"
                        v-model="form.description"
                    ></textarea>
                </b-form-group>
                <b-form-group label="Tags">
                    <TaggerInput
                        v-model="tag"
                        :tags="form.tags"
                        @tags-changed="handleTagsChange"
                    />
                </b-form-group>
                <b-form-group label="Video Privacy">
                    <div class="viz-toggle">
                        <TogglerButton v-model="form.isPublic" />
                        <span class="toggle-label">
                            {{ form.isPublic ? 'Public' : 'Private' }}
                        </span>
                    </div>
                </b-form-group>
            </main>
            <footer class="page-footer">
                <basic-button
                    class="cancel-btn"
                    variant="secondary"
                    size="md"
                    :to="{ name: 'youtubeUploader' }"
                >
                    Back
                </basic-button>
                <spinner-button
                    class="btn-upload"
                    size="md"
                    @click="handleUploadClick"
                >
                    Upload
                </spinner-button>
            </footer>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import { api } from '~/services'
import { mapGetters } from 'vuex'
export default {
    name: 'PreviewVideo',
    props: {
        beat: {
            type: Object,
        },
    },
    data: () => ({
        defaultCoverArt: appConstants.defaultCoverArt,
        form: {
            data_image: '',
            title: '',
            description: '',
            tags: [],
            isPublic: false,
        },
        tag: '',
        uploading: false,
        isCompleted: false,
        result: {},
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            googleUserInfo: 'marketing/googleUserInfo',
        }),
    },
    created() {
        this.form = {
            ...this.form,
            ...this.beat,
            tags: this.beat.tags
                ? this.beat.tags.split(',').map(tag => ({
                      text: tag.trim(),
                  }))
                : [],
            isPublic: this.beat.public == appConstants.visibilities.public,
            src: this.beat.data_image
                ? this.beat.data_image
                : this.defaultCoverArt,
        }
    },
    methods: {
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        async handleUploadClick() {
            this.uploading = true
            const params = {
                user_id: this.user.id,
                audio_id: this.beat.id,
                title: this.form.title,
                description: this.form.description,
                tags: this.form.tags.map(({ text }) => text).join(', '),
                privacy: this.form.isPublic ? 'public' : 'private',
                access_token: this.googleUserInfo.token,
            }
            console.log(params)
            const response = await api.marketing.youtubeUploader(params)
            console.log(response)
            const { status, data, message, error } = response
            if (status === 'success') {
                this.result = data
                this.$toast.success(message)
                this.isCompleted = true
            } else {
                if (error) {
                    this.$toast.error(error)
                } else {
                    this.$toast.error(data.message)
                }
            }
            this.uploading = false
        },
    },
}
</script>
