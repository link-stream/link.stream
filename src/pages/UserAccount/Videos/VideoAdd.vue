<template>
    <b-container fluid class="page-ua-vids-add p-4 p-sm-5">
        <b-form
            @submit.stop.prevent="handleSubmit"
            @reset="resetForm"
            class="form-wizard"
            :novalidate="true"
        >
            <b-row>
                <b-col cols="12" class="mb-3">
                    <h6 class="step">Step {{ step }} / 2</h6>
                </b-col>
                <b-col cols="12">
                    <h2 class="page-title">Add a video</h2>
                </b-col>
                <b-col cols="12" class="mt-2" :class="`step-${step}`">
                    <b-row v-show="step === 1">
                        <b-col cols="12" class="mt-3">
                            <b-form-group class="mb-4 error-l-150">
                                <slot name="label">
                                    <label for="youtubeUrl">YouTube Video URL</label>
                                </slot>
                                <b-form-input
                                    id="youtubeUrl"
                                    type="text"
                                    v-model="$v.form.youtubeUrl.$model"
                                    placeholder="https://youtu.be/vwm_N2PCUz8"
                                    :state="!$v.form.youtubeUrl.$error"
                                ></b-form-input>
                                <b-form-invalid-feedback>
                                    <div
                                        v-if="!$v.form.youtubeUrl.required"
                                    >The YouTube URL is required</div>
                                    <div
                                        v-else-if="!$v.form.youtubeUrl.validUrl"
                                    >Invalid YouTube URL</div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" class="my-4">
                            <SpinnerButton @click="goToStep(2)">Next</SpinnerButton>
                        </b-col>
                    </b-row>
                    <b-row v-show="step === 2">
                        <b-col cols="12">
                            <b-form-group class="mb-4">
                                <slot name="label">
                                    <label class="text-black font-weight-bold">
                                        Preview &amp; publish your
                                        content
                                    </label>
                                </slot>
                                <div
                                    class="youtube-container"
                                    v-resize="handleResizeYoutubeContainer"
                                    ref="youtube-container"
                                >
                                    <youtube
                                        :video-id="
                                            $youtube.getIdFromUrl(form.youtube)
                                        "
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
                                    <label for="title">Video Name</label>
                                </slot>
                                <b-form-input
                                    id="title"
                                    type="text"
                                    v-model="$v.form.title.$model"
                                    :state="!$v.form.title.$error"
                                ></b-form-input>
                                <b-form-invalid-feedback>
                                    <div v-if="!$v.form.title.required">The video name is required</div>
                                    <div v-else-if="!$v.form.title.minLength">
                                        The video name must be at least
                                        {{
                                        $v.form.title.$params.minLength.min
                                        }}
                                        characters
                                    </div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Genre" label-for="genre" class="mb-4 error-l-50">
                                <v-select
                                    id="genre"
                                    v-model="$v.form.genre.$model"
                                    :class="{
                                        'is-invalid': $v.form.genre.$error,
                                    }"
                                    placeholder="Select Genre"
                                    :options="genres"
                                    :reduce="genre => genre.id"
                                    label="genre"
                                />
                                <b-form-invalid-feedback>
                                    <div v-if="!$v.form.genre.required">The genre is required</div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="Related Track"
                                label-for="relatedTrack"
                                class="mb-4"
                            >
                                <v-select
                                    v-model="form.relatedTrack"
                                    placeholder="Select Related Track"
                                    :options="relatedTracks"
                                    :reduce="track => track.id"
                                    label="title"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="Visibility"
                                label-for="visibility"
                                class="mb-4 error-l-65"
                            >
                                <v-select
                                    v-model="$v.form.visibility.$model"
                                    placeholder="Select Visibility"
                                    :options="visibilities"
                                    :reduce="visibility => visibility.id"
                                    :class="{
                                        'is-invalid': $v.form.visibility.$error,
                                    }"
                                    label="title"
                                />
                                <b-form-invalid-feedback>
                                    <div
                                        v-if="!$v.form.visibility.required"
                                    >The visibility is required</div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="isVisibilityScheduled">
                            <b-form-group
                                label="Publish at"
                                label-for="pubDate"
                                class="mb-4 error-l-80"
                            >
                                <v-date-picker
                                    mode="single"
                                    color="pink"
                                    v-model="$v.form.pubDate.$model"
                                    :class="{
                                        'is-invalid': $v.form.pubDate.$error,
                                    }"
                                    :input-props="{
                                        class: 'form-control',
                                        placeholder: 'Date',
                                    }"
                                    :popover="{ visibility: 'click' }"
                                ></v-date-picker>
                                <b-form-invalid-feedback>
                                    <div v-if="!$v.form.pubDate.required">The date is required</div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="isVisibilityScheduled">
                            <b-form-group
                                label="Timezone"
                                label-for="pubTimezone"
                                class="mb-4 error-l-80"
                            >
                                <v-select
                                    placeholder="Select Timezone"
                                    v-model="$v.form.pubTimezone.$model"
                                    :class="{
                                        'is-invalid':
                                            $v.form.pubTimezone.$error,
                                    }"
                                    label="zone"
                                    :options="timezones"
                                    :reduce="timezone => timezone.id"
                                />
                                <b-form-invalid-feedback>
                                    <div
                                        v-if="!$v.form.pubTimezone.required"
                                    >The timezone is required</div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="isVisibilityScheduled">
                            <b-form-group label="Time" label-for="pubTime" class="mb-4 error-l-80">
                                <v-select
                                    v-model="$v.form.pubTime.$model"
                                    :class="{
                                        'is-invalid': $v.form.pubTime.$error,
                                    }"
                                    label="std"
                                    :options="times"
                                    :reduce="time => time.mil"
                                />
                                <b-form-invalid-feedback>
                                    <div v-if="!$v.form.pubTime.required">The time is required</div>
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Explicit Content?" class="mb-4">
                                <b-form-radio-group v-model="form.explicit">
                                    <b-form-radio :value="false">No</b-form-radio>
                                    <b-form-radio :value="true">Yes</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" class="my-4">
                            <SpinnerButton variant="light" @click="goToStep(1)">Back</SpinnerButton>
                            <SpinnerButton
                                type="submit"
                                :loading="status.loading.addVideo"
                                :error="status.error.addVideo"
                            >Save</SpinnerButton>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import resize from 'vue-resize-directive'
import { lsApi } from '~/services/lsApi'
import { setStatusChange } from '~/utils'
import { SpinnerButton } from '~/components/Button'
import { videoFormMixin } from '~/mixins/user-account/videos/videoForm'

export default {
    name: 'VideoAdd',
    directives: {
        resize,
    },
    components: {
        SpinnerButton,
    },
    mixins: [videoFormMixin],
    data() {
        return {
            step: 1, // [1, 2]
            player: {
                width: 0,
                height: 0,
            },
            form: {
                youtubeUrl: null,
                title: null,
                genre: null,
                relatedTrack: null,
                visibility: null,
                pubDate: null,
                pubTimezone: null,
                pubTime: null,
                explicit: false,
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
        ...mapGetters({
            user: 'me/user',
        }),
    },
    watch: {
        step() {
            this.$refs.youtube.player.stopVideo()
        },
    },
    methods: {
        goToStep(step) {
            if (step === 2) {
                this.$v.form.youtubeUrl.$touch()
                if (this.$v.form.youtubeUrl.$invalid) {
                    return
                }
                this.step = step
            } else {
                this.step = step
            }
        },
        resetForm() {
            this.step = 1
            this.form = {
                youtubeUrl: null,
                title: null,
                genre: null,
                relatedTrack: null,
                visibility: null,
                pubDate: null,
                pubTimezone: this.timezones[0],
                pubTime: this.times[0],
                explicit: false,
            }
            this.$v.form.$reset()
        },
        handleResizeYoutubeContainer() {
            this.player.width =
                this.$refs['youtube-container'].clientWidth + 'px'
            this.player.height =
                this.$refs['youtube-container'].clientWidth * 0.5625 + 'px'
        },
        async handleSubmit() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.status.loading.addVideo = true

            const {
                youtubeUrl,
                title,
                genre,
                relatedTrack,
                visibility,
                pubDate,
                pubTimezone,
                pubTime,
                explicit,
            } = this.form

            const params = {
                user_id: this.user.id,
                url: youtubeUrl,
                title,
                genre_id: genre,
                related_track: relatedTrack,
                public: visibility,
                explicit_content: explicit,
            }

            if (this.isVisibilityScheduled) {
                params.publish_at = pubDate
                params.timezone = pubTimezone
                params.time = pubTime
            }

            const { status, error } = await lsApi.videos.createVideo(params)

            if (status === 'success') {
                setStatusChange(this, 'status.error.addVideo', false, () => {
                    this.resetForm()
                })
                this.$toast.success('The video has been created successfully.')
            } else {
                setStatusChange(this, 'status.error.addVideo')
                this.$toast.error(error)
            }
            this.status.loading.addVideo = false
        },
    },
}
</script>
