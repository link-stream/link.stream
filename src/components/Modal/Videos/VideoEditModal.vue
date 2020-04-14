<template>
    <b-modal
        id="vidEditMdl"
        modal-class="modal modal-vid-edit"
        @hidden="handleHidden"
        hide-header
        hide-footer
        no-close-on-backdrop
        no-close-on-esc
    >
        <header class="mdl__header">
            <h2 class="mdl__title">Edit video info</h2>
            <IconButton icon="close-2" class="mdl__close" @click="closeModal" />
        </header>

        <b-form class="mdl__body" :novalidate="true">
            <div class="vid-wrap">
                <youtube :video-id="ytVidId"></youtube>
            </div>

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

            <b-form-group label="Primary Genre" label-for="vidGenreInput">
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
                    <b-form-radio :value="v.id" v-for="v in visibilities" :key="v.id">{{ v.title }}</b-form-radio>
                </b-form-radio-group>
            </b-form-group>

            <template v-if="form.scheduled">
                <b-form-group label="Publish Date">
                    <b-input-group>
                        <v-date-picker
                            v-model="$v.form.date.$model"
                            class="pubdt-input-wrap"
                            mode="single"
                            color="pink"
                            :min-date="new Date()"
                            :class="{
                                        'is-invalid': $v.form.date.$error,
                                    }"
                            :input-props="{
                                        class: 'form-control pubdt-input',
                                        placeholder: 'Select Date',
                                    }"
                            :popover="{ visibility: 'click' }"
                        ></v-date-picker>
                        <v-select
                            v-model="$v.form.time.$model"
                            placeholder="Select Time"
                            class="pubtm-input"
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
        </b-form>

        <footer class="mdl__footer">
            <basic-button variant="secondary" :disabled="isSaving" @click="closeModal">Cancel</basic-button>
            <spinner-button :loading="isSaving" @click="save">Save</spinner-button>
        </footer>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'
import { IconButton, SpinnerButton, BasicButton } from '~/components/Button'
import { getYtVideoThumbUrl } from '~/utils'
import moment from 'moment'

export default {
    name: 'VideoEditModal',
    mixins: [videoAddEditForm],
    components: {
        SpinnerButton,
        IconButton,
        BasicButton,
    },
    props: {
        videoToEdit: {
            type: Object,
            required: true,
        },
    },
    watch: {
        videoToEdit(video) {
            if (!video.id) {
                return
            }
            const {
                title,
                url,
                genre_id,
                related_track,
                public: visibility,
                date,
                time,
                scheduled,
            } = video

            this.form = {
                ...this.form,
                title,
                url,
                genre: genre_id,
                relatedtrack: related_track,
                visibility,
                date: new Date(date + ' 00:00:00'),
                time,
                scheduled,
            }
        },
    },
    methods: {
        closeModal() {
            this.$bvModal.hide('vidEditMdl')
        },
        handleHidden() {
            this.$emit('hidden')
            this.resetForm()
        },
    },
}
</script>