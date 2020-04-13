<template>
    <b-container fluid class="page page-ua-vids-add">
        <div class="form-wizard" :class="{ 'is-last-step': step === 2 }">
            <h6 class="w__step-count">Step {{ step }} / 2</h6>

            <header class="w__header">
                <h1 class="w__title">{{ step === 1 ? 'Add a video' : 'Review video info' }}</h1>
                <h4 class="w__subtitle">{{ step === 2 ? 'Preview and publish your content' : '' }}</h4>
            </header>

            <main class="w__body" :novalidate="true">
                <div v-show="step === 1">
                    <b-form-group label="YouTube Video URL" label-for="vidUrlInput">
                        <b-form-input
                            v-model="$v.form.url.$model"
                            id="vidUrlInput"
                            placeholder="https://youtu.be/vwm_N2PCUz8"
                            :state="!$v.form.url.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.url.required">The YouTube URL is required</template>
                            <template v-else-if="!$v.form.url.valid">Invalid YouTube URL</template>
                        </b-form-invalid-feedback>
                    </b-form-group>
                </div>

                <div v-show="step === 2">
                    <div class="vid-wrap">
                        <youtube :video-id="ytVidId"></youtube>
                    </div>

                    <b-form-group label="Video Title" label-for="vidTitleInput">
                        <b-form-input
                            id="vidTitleInput"
                            v-model="$v.form.title.$model"
                            :state="!$v.form.title.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.title.required">The video name is required</template>
                            <template v-else-if="!$v.form.title.minLength">
                                The video name must be at least
                                {{ $v.form.title.$params.minLength.min }} characters
                            </template>
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Genre" label-for="vidGenreInput">
                        <v-select
                            v-model="$v.form.genre.$model"
                            id="vidGenreInput"
                            placeholder="Select Genre"
                            :class="{ 'is-invalid': $v.form.genre.$error }"
                            :options="genres"
                            :reduce="genre => genre.id"
                            label="genre"
                        />
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.genre.required">The genre is required</template>
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Related Track" label-for="vidTrackInput">
                        <v-select
                            v-model="form.relatedtrack"
                            id="vidTrackInput"
                            placeholder="Select Related Track"
                            :options="relatedtracks"
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
                            >{{ v.title }}</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>

                    <template v-if="form.scheduled">
                        <b-form-group label="Publish Date">
                            <b-input-group>
                                <v-date-picker
                                    v-model="$v.form.date.$model"
                                    class="dt-input-wrap"
                                    mode="single"
                                    color="pink"
                                    :min-date="new Date()"
                                    :class="{
                                        'is-invalid': $v.form.date.$error,
                                    }"
                                    :input-props="{
                                        class: 'form-control dt-input',
                                        placeholder: 'Select Date',
                                    }"
                                    :popover="{ visibility: 'click' }"
                                ></v-date-picker>
                                <v-select
                                    v-model="$v.form.time.$model"
                                    placeholder="Select Time"
                                    class="tm-input"
                                    :class="{ 'is-invalid': $v.form.time.$error }"
                                    label="title"
                                    :options="times"
                                    :reduce="time => time.id"
                                />
                            </b-input-group>
                            <b-form-invalid-feedback
                                :state="$v.form.date.$error || $v.form.time.$error ? false : true"
                            >A time and date is required</b-form-invalid-feedback>
                        </b-form-group>
                    </template>
                    <basic-button
                        variant="link"
                        @click="toggleScheduled"
                    >{{ form.scheduled ? 'Clear scheduling ' : 'Schedule this video'}}</basic-button>
                </div>
            </main>

            <footer class="w__footer">
                <basic-button class="w__next" @click="goToStep(2)">Next</basic-button>
                <basic-button class="w__back" variant="secondary" @click="goToStep(1)">Back</basic-button>
                <spinner-button class="w__submit" :loading="isSaving" @click="save">Add Video</spinner-button>
            </footer>
        </div>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import resize from 'vue-resize-directive'
import { lsApi } from '~/services/lsApi'
import { setStatusChange } from '~/utils'
import { SpinnerButton, BasicButton } from '~/components/Button'
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'

export default {
    name: 'VideoAdd',
    directives: {
        resize,
    },
    components: {
        SpinnerButton,
        BasicButton,
    },
    data() {
        return {
            step: 1, // [1, 2]
            form: {
                url: 'https://www.youtube.com/watch?v=XTbxKAjt4UQ',
            },
        }
    },
    mixins: [videoAddEditForm],
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
