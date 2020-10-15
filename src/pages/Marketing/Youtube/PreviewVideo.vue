<template>
    <div class="page page-preview-video">
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
</template>
<script>
import { appConstants } from '~/constants'
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
    }),
    computed: {},
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
            src: this.beat.data_image ? this.beat.data_image : this.defaultCoverArt,
        }
        console.log(this.form.tags)
    },
    methods: {
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleUploadClick() {}
    },
}
</script>
