<template>
    <div class="page page-ua-vid-add">
        <div class="fwz" :class="`step-${step}`">
            <h6 class="fwz-cnt">Step {{ step }} / 2</h6>

            <section class="fwz-step" v-show="step === 1">
                <header class="fwz-step-header">
                    <h2 class="fwz-step-title">
                        Add a video
                    </h2>
                </header>
                <main class="fwz-step-body">
                    <fieldset>
                        <b-form-group
                            label="YouTube Video URL"
                            label-for="urlInput"
                        >
                            <b-form-input
                                v-model="$v.form.url.$model"
                                id="urlInput"
                                placeholder="https://youtu.be/vwm_N2PCUz8"
                                :state="!$v.form.url.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.url.required">
                                    Enter a YouTube URL
                                </template>
                                <template v-else-if="!$v.form.url.valid">
                                    Invalid YouTube URL
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </fieldset>
                </main>
            </section>

            <section class="fwz-step" v-show="step === 2">
                <header class="fwz-step-header">
                    <h2 class="fwz-step-title">
                        Review video info
                    </h2>
                    <h4 class="fwz-step-subtitle">
                        Preview and publish your content
                    </h4>
                </header>
                <main class="fwz-step-body">
                    <fieldset>
                        <youtube class="yt-wrap" :video-id="ytVidId"></youtube>
                        <b-form-group
                            label="Video Title"
                            label-for="titleInput"
                        >
                            <b-form-input
                                id="titleInput"
                                placeholder="Enter a title"
                                v-model="$v.form.title.$model"
                                :state="!$v.form.title.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.title.required">
                                    Enter a title
                                </template>
                                <template v-else-if="!$v.form.title.minLength">
                                    The title must be at least
                                    {{ $v.form.title.$params.minLength.min }}
                                    characters
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group label="Genre" label-for="genreInput">
                            <LsSelect
                                v-model="form.genre"
                                id="genreInput"
                                placeholder="Select Genre"
                                :options="genres"
                                :reduce="genre => genre.id"
                                label="genre"
                            />
                        </b-form-group>

                        <b-form-group
                            label="Related Track"
                            label-for="trackInput"
                        >
                            <LsSelect
                                v-model="form.relatedTrack"
                                id="trackInput"
                                placeholder="Select Related Track"
                                :options="relatedTracks"
                                :reduce="track => track.id"
                                label="title"
                            />
                        </b-form-group>

                        <b-form-group label="Visibility">
                            <b-form-radio-group v-model="form.visibility">
                                <b-form-radio
                                    :value="v.id"
                                    v-for="v in visibilities"
                                    :key="v.id"
                                >
                                    {{ v.title }}
                                </b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                    </fieldset>
                </main>
            </section>

            <footer class="fwz-pager">
                <ls-button class="fwz-next-btn" @click="goToStep(2)">
                    Next
                </ls-button>
                <ls-button
                    class="fwz-prev-btn"
                    variant="secondary"
                    :disabled="loading"
                    @click="goToStep(1)"
                >
                    Back
                </ls-button>
                <ls-spinner-button
                    class="fwz-submit-btn"
                    :loading="loading"
                    @click="save"
                >
                    Add Video
                </ls-spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'

export default {
    name: 'AddVideo',
    mixins: [videoAddEditForm],
    data() {
        return {
            step: 1,
        }
    },
    methods: {
        goToStep(step) {
            if (this.step === 1) {
                this.$v.form.url.$touch()
                if (this.$v.form.url.$invalid) {
                    return
                }
            }
            this.step = step
        },
    },
}
</script>
