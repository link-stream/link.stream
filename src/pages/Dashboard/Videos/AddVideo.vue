<template>
    <b-container fluid class="p-sm-5">
        <b-form @submit.stop.prevent="onSubmit" @reset="resetForm" :novalidate="true">
            <b-row>
                <b-col cols="12" class="mb-3">
                    <h6 class="step">Step {{ step }} / 2</h6>
                </b-col>
                <b-col cols="12">
                    <h2 class="page-title">Add a video</h2>
                </b-col>
                <b-col cols="12" class="mt-2 video_add_elements" :class="`step-${step}`">
                    <b-row v-show="step === 1">
                        <b-col cols="12" class="mt-3">
                            <b-form-group class="mb-4 error-l-150">
                                <slot name="label">
                                    <label for="youtube">
                                        Youtube Video URL
                                    </label>
                                </slot>
                                <b-form-input
                                    id="youtube"
                                    name="youtube"
                                    type="text"
                                    v-model="form.youtube"
                                    placeholder="https://youtu.be/vwm_N2PCUz8"
                                    v-validate="{ required: true, validYoutube: true }"
                                    :state="validateState('youtube')"
                                    aria-describedby="youtube-live-feedback"
                                    data-vv-as="youtube url"
                                ></b-form-input>
                                <b-form-invalid-feedback id="youtube-live-feedback">
                                    {{ veeErrors.first('youtube') }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" class="my-4">
                            <MultiStateButton class="btn-action px-5" @onClick="goToStep(2)">
                                Next
                            </MultiStateButton>
                        </b-col>
                    </b-row>
                    <b-row v-show="step === 2">
                        <b-col cols="12">
                            <b-form-group class="mb-4">
                                <slot name="label">
                                    <label class="text-black font-weight-bold">
                                        Preview & publish your content
                                    </label>
                                </slot>
                                <div
                                    class="youtube-container"
                                    v-resize="onResizeYoutubeContainer"
                                    ref="youtubue-container"
                                >
                                    <youtube
                                        :video-id="$youtube.getIdFromUrl(form.youtube)"
                                        :width="player.width"
                                        :height="player.height"
                                        ref="youtube"
                                    ></youtube>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group class="mb-4 error-l-95">
                                <slot name="label">
                                    <label for="video_name">
                                        Video Name
                                    </label>
                                </slot>
                                <b-form-input
                                    id="video_name"
                                    name="video_name"
                                    type="text"
                                    v-model="form.video_name"
                                    v-validate="{ required: true, min: 10 }"
                                    :state="validateState('video_name')"
                                    aria-describedby="video-name-live-feedback"
                                    data-vv-as="video name"
                                ></b-form-input>
                                <b-form-invalid-feedback id="video-name-live-feedback">
                                    {{ veeErrors.first('video_name') }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Genre" label-for="genre" class="mb-4 error-l-50">
                                <v-select
                                    name="genre"
                                    v-model="form.genre"
                                    placeholder="Select Genre"
                                    :options="genres"
                                    :reduce="genre => genre.id"
                                    label="genre"
                                    v-validate="{ required: true }"
                                    :class="{ 'is-invalid': isInvalidClass('genre') }"
                                    aria-describedby="genre-live-feedback"
                                    data-vv-as="genre"
                                />
                                <b-form-invalid-feedback id="genre-live-feedback">
                                    {{ veeErrors.first('genre') }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Related Track" label-for="related_track" class="mb-4">
                                <v-select
                                    v-model="form.related_track"
                                    placeholder="Select Related Track"
                                    :options="related_tracks"
                                    :reduce="track => track.id"
                                    label="title"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Visibility" label-for="visibility" class="mb-4 error-l-65">
                                <v-select
                                    name="visibility"
                                    v-model="form.visibility"
                                    placeholder="Select Visibility"
                                    :options="visibilities"
                                    :reduce="visibility => visibility.id"
                                    label="title"
                                    v-validate="{ required: true }"
                                    :class="{ 'is-invalid': isInvalidClass('visibility') }"
                                    aria-describedby="visibility-live-feedback"
                                    data-vv-as="visibility"
                                />
                                <b-form-invalid-feedback id="visibility-live-feedback">
                                    {{ veeErrors.first('visibility') }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="form.visibility === 3">
                            <b-form-group label="Publish at" label-for="schedule_date" class="mb-4 error-l-80">
                                <v-date-picker
                                    name="schedule_date"
                                    mode="single"
                                    color="pink"
                                    v-model="form.schedule_date"
                                    :input-props="{ class: 'form-control', placeholder: 'Date' }"
                                    :popover="{ visibility: 'click' }"
                                    v-validate="{ required: true }"
                                    :class="{ 'is-invalid': isInvalidClass('schedule_date') }"
                                    aria-describedby="schedule-date-live-feedback"
                                    data-vv-as="date"
                                ></v-date-picker>
                                <b-form-invalid-feedback id="schedule-date-live-feedback">
                                    {{ veeErrors.first('schedule_date') }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Explicit Content?" class="mb-4">
                                <b-form-radio-group v-model="form.explicit_content">
                                    <b-form-radio :value="false">No</b-form-radio>
                                    <b-form-radio :value="true">Yes</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" class="my-4">
                            <MultiStateButton
                                variant="outline-secondary"
                                class="btn-action px-5"
                                @onClick="goToStep(1)"
                            >
                                Back
                            </MultiStateButton>
                            <MultiStateButton
                                type="submit"
                                class="btn-action px-5"
                                :loading="status.loading.addVideo"
                                :error="status.error.addVideo"
                            >
                                <span class="m-0">Save</span>
                            </MultiStateButton>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { Validator } from 'vee-validate'
import resize from 'vue-resize-directive'
import { call } from '~/services'
import { setStatusChange } from '~/utils'
import { MultiStateButton } from '~/components/Button'

export default {
    name: 'AddVideo',
    directives: {
        resize,
    },
    components: {
        MultiStateButton,
    },
    data() {
        return {
            step: 1, // [1, 2]
            player: {
                width: 0,
                height: 0,
            },
            genres: [],
            related_tracks: [],
            visibilities: [],
            form: {
                youtube: null,
                video_name: null,
                genre: null,
                related_track: null,
                visibility: null,
                schedule_date: null,
                explicit_content: false,
            },
            status: {
                loading: {
                    addVideo: false,
                },
                error: {
                    addVideo: null,
                },
            },
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    async created() {
        // fetch genre
        const genres = await call('/audios/genre', {}, 'GET', false)
        if (genres.status === 'success') {
            this.genres = [...genres.data]
        }
        // fetch related tracks
        const tracks = await call(`/audios/related_track/${this.user.id}`, {}, 'GET', false)
        if (tracks.status === 'success') {
            this.related_tracks = [...tracks.data]
        }
        // fetch visibilities
        const visibilities = await call(`/audios/visibility/${this.user.id}`, {}, 'GET', false)
        if (visibilities.status === 'success') {
            this.visibilities = Object.keys(visibilities.data).map(key => {
                return {
                    id: parseInt(key),
                    title: visibilities.data[key],
                }
            })
        }
    },
    mounted() {
        // Youtube validation
        Validator.extend('validYoutube', {
            validate: async value => {
                if (this.$youtube.getIdFromUrl(value)) return { valid: true }
                return { data: { message: 'Invalid youtube url!' } }
            },
            getMessage: (field, params, data) => data.message,
        })
    },
    watch: {
        step(val) {
            this.$refs.youtube.player.stopVideo()
        },
    },
    methods: {
        // Resize
        onResizeYoutubeContainer() {
            this.player.width = this.$refs['youtubue-container'].clientWidth + 'px'
            this.player.height = this.$refs['youtubue-container'].clientWidth * 0.5625 + 'px'
        },
        // Form
        validateState(ref) {
            if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return !this.veeErrors.has(ref)
            }
            return null
        },
        isInvalidClass(ref) {
            if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return this.veeErrors.has(ref)
            }
            return false
        },
        goToStep(step) {
            if (step == 2) {
                this.$validator.validate('youtube').then(async result => {
                    if (!result) {
                        return
                    }
                    this.step = step
                })
            } else {
                this.step = step
            }
        },
        async onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return
                }
                this.status.loading.addVideo = true
                try {
                    const {
                        youtube,
                        video_name,
                        genre,
                        related_track,
                        visibility,
                        schedule_date,
                        explicit_content,
                    } = this.form
                    const params = {
                        user_id: this.user.id,
                        url: youtube,
                        title: video_name,
                        genre_id: genre,
                        related_track,
                        public: visibility,
                        explicit_content,
                    }
                    if (visibility === 3) params.publish_at = schedule_date
                    const { status, error = null } = await call(`/videos`, params, 'POST')
                    if (status === 'success') {
                        setStatusChange(this, 'status.error.addVideo', false, () => {
                            this.resetForm()
                        })
                        // TODO:: should store videos to vuex
                        this.$toast.success('The video has been created successfully.')
                    } else {
                        setStatusChange(this, 'status.error.addVideo')
                        this.$toast.error(error)
                    }
                } catch (e) {
                    setStatusChange(this, 'status.error.addVideo')
                    this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }

                this.status.loading.addVideo = false
            })
        },
        resetForm() {
            this.step = 1
            this.form = {
                youtube: null,
                video_name: null,
                genre: null,
                related_track: null,
                visibility: null,
                schedule_date: null,
                explicit_content: false,
            }

            this.$nextTick(() => {
                this.$validator.reset()
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.video_add_elements {
    &.step-1 {
        max-width: 500px;
    }

    &.step-2 {
        max-width: 400px;
    }

    .youtube-container {
        max-width: 100%;

        @include media-breakpoint-down(xs) {
            max-width: 100%;
        }
    }
}
</style>
