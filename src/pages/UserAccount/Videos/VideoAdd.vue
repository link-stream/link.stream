<template>
    <div class="page page-ua-vid-add">
        <div class="fwz" :class="{ '--final-step': step === 2 }">
            <h6 class="fwz-cnt">Step {{ step }} / 2</h6>

            <header class="fwz-header">
                <h1 class="fwz-title">
                    {{ step === 1 ? 'Add a video' : 'Review video info' }}
                </h1>
                <h4 class="fwz-subtitle">
                    {{ step === 2 ? 'Preview and publish your content' : '' }}
                </h4>
            </header>

            <section class="fwz-step" v-show="step === 1">
                <form class="fwz-step-form">
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
                </form>
            </section>

            <section class="fwz-step" v-show="step === 2">
                <form class="fwz-step-form">
                    <youtube class="yt-wrap" :video-id="ytVidId"></youtube>
                    <b-form-group label="Video Title" label-for="titleInput">
                        <b-form-input
                            id="titleInput"
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
                        <SelectBox
                            v-model="$v.form.genre.$model"
                            id="genreInput"
                            placeholder="Select Genre"
                            :class="{ 'is-invalid': $v.form.genre.$error }"
                            :options="genres"
                            :reduce="genre => genre.id"
                            label="genre"
                        />
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.genre.required">
                                Select a genre
                            </template>
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Related Track" label-for="trackInput">
                        <SelectBox
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
                </form>
            </section>

            <footer class="fwz-pager">
                <basic-button class="fwz-next" @click="goToStep(2)">
                    Next
                </basic-button>
                <basic-button
                    class="fwz-prev"
                    variant="secondary"
                    :disabled="loading"
                    @click="goToStep(1)"
                >
                    Back
                </basic-button>
                <spinner-button
                    class="fwz-submit"
                    :loading="loading"
                    @click="save"
                >
                    Add Video
                </spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'

export default {
    name: 'VideoAdd',
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
