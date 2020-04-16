<template>
    <b-container class="page page-ua-vids-add">
        <div class="form-wiz" :class="{ 'is-final-step': step === 2 }">
            <h6 class="fwz__cnt">Step {{ step }} / 2</h6>

            <header class="fwz__header">
                <h1 class="fwz__title">
                    {{ step === 1 ? 'Add a video' : 'Review video info' }}
                </h1>
                <h4 class="fwz__subtitle">
                    {{ step === 2 ? 'Preview and publish your content' : '' }}
                </h4>
            </header>

            <main class="fwz__body">
                <div v-show="step === 1">
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
                            <template v-if="!$v.form.url.required"
                                >The YouTube URL is required</template
                            >
                            <template v-else-if="!$v.form.url.valid"
                                >Invalid YouTube URL</template
                            >
                        </b-form-invalid-feedback>
                    </b-form-group>
                </div>

                <div v-show="step === 2">
                    <div class="vid-wrap">
                        <youtube :video-id="ytVidId"></youtube>
                    </div>

                    <b-form-group label="Video Title" label-for="titleInput">
                        <b-form-input
                            id="titleInput"
                            v-model="$v.form.title.$model"
                            :state="!$v.form.title.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.title.required"
                                >The video name is required</template
                            >
                            <template v-else-if="!$v.form.title.minLength">
                                The video name must be at least
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
                            <template v-if="!$v.form.genre.required"
                                >The genre is required</template
                            >
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Related Track" label-for="trackInput">
                        <SelectBox
                            v-model="form.relatedtrack"
                            id="trackInput"
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
                                >{{ v.title }}</b-form-radio
                            >
                        </b-form-radio-group>
                    </b-form-group>
                </div>
            </main>

            <footer class="fwz__nav">
                <basic-button class="fwz__next" @click="goToStep(2)"
                    >Next</basic-button
                >
                <basic-button
                    class="fwz__prev"
                    variant="secondary"
                    :disabled="isSaving"
                    @click="goToStep(1)"
                    >Back</basic-button
                >
                <spinner-button
                    class="fwz__submit"
                    :loading="isSaving"
                    @click="save"
                    >Add Video</spinner-button
                >
            </footer>
        </div>
    </b-container>
</template>

<script>
import resize from 'vue-resize-directive'
import { SpinnerButton, BasicButton } from '~/components/Button'
import { SelectBox } from '~/components/Select'
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'

export default {
    name: 'VideoAdd',
    directives: {
        resize,
    },
    components: {
        SpinnerButton,
        BasicButton,
        SelectBox,
    },
    data() {
        return {
            step: 1, // [1, 2]
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
