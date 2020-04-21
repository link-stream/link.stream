<template>
    <b-modal
        modal-class="mdl mdl-vid-edit"
        v-model="editing"
        @hidden="handleHidden"
        hide-header
        hide-footer
        no-close-on-backdrop
        no-close-on-esc
    >
        <header class="mdl-header">
            <h2 class="mdl-title">Edit video info</h2>
            <IconButton icon="modal-close" class="mdl-close" @click="close" />
        </header>

        <b-form class="mdl-body" :novalidate="true">
            <youtube class="vid-wrap" :video-id="ytVidId"></youtube>
            <b-form-group label="YouTube Video URL" label-for="urlInput">
                <b-form-input
                    v-model="$v.form.url.$model"
                    id="urlInput"
                    placeholder="https://youtu.be/vwm_N2PCUz8"
                    :state="!$v.form.url.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.url.required"
                        >Enter a YouTube URL</template
                    >
                    <template v-else-if="!$v.form.url.valid"
                        >Invalid YouTube URL</template
                    >
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Video Title" label-for="titleInput">
                <b-form-input
                    id="titleInput"
                    v-model="$v.form.title.$model"
                    :state="!$v.form.title.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.title.required"
                        >Enter a title</template
                    >
                    <template v-else-if="!$v.form.title.minLength">
                        The title must be at least
                        {{ $v.form.title.$params.minLength.min }} characters
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Primary Genre" label-for="genreInput">
                <SelectBox
                    v-model="$v.form.genre.$model"
                    id="genreInput"
                    placeholder="Select Genre"
                    :state="!$v.form.genre.$error"
                    :options="genres"
                    :reduce="genre => genre.id"
                    label="genre"
                />
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.genre.required"
                        >Select a genre</template
                    >
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Related Track" label-for="trackInput">
                <SelectBox
                    v-model="form.related_track"
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
                        >{{ v.title }}</b-form-radio
                    >
                </b-form-radio-group>
            </b-form-group>

            <template v-if="form.scheduled">
                <b-form-group label="Publish Date">
                    <b-input-group
                        class="datetime-input-group"
                        :class="{
                            'is-invalid':
                                $v.form.date.$error || $v.form.time.$error,
                        }"
                    >
                        <DatePicker v-model="$v.form.date.$model" />
                        <TimePicker v-model="$v.form.time.$model" />
                    </b-input-group>
                    <b-form-invalid-feedback
                        :state="
                            $v.form.date.$error || $v.form.time.$error
                                ? false
                                : true
                        "
                        >Select a date and time</b-form-invalid-feedback
                    >
                </b-form-group>
            </template>

            <basic-button variant="link" @click="toggleSchedule">
                {{
                    form.scheduled ? 'Clear scheduling ' : 'Schedule this video'
                }}
            </basic-button>
        </b-form>

        <footer class="mdl-footer">
            <basic-button variant="secondary" :disabled="saving" @click="close"
                >Cancel</basic-button
            >
            <spinner-button :loading="saving" @click="save"
                >Save</spinner-button
            >
        </footer>
    </b-modal>
</template>

<script>
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'
import { IconButton } from '~/components/Button'
import { DatePicker, TimePicker } from '~/components/Picker'

export default {
    name: 'VideoEditModal',
    mixins: [videoAddEditForm],
    components: {
        IconButton,
        DatePicker,
        TimePicker,
    },
    props: {
        video: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.editing = true

        const {
            title,
            url,
            genre_id,
            related_track,
            public: visibility,
            scheduled,
            date,
            time,
        } = this.video

        this.form = {
            ...this.form,
            title,
            url,
            genre: genre_id,
            relatedTrack: related_track != '0' ? related_track : '', // TODO move check to backend
            visibility,
            scheduled,
            date: new Date(date + ' 00:00:00'),
            time,
        }
    },
    methods: {
        close() {
            this.editing = false
        },
        handleHidden() {
            this.$emit('hidden')
        },
    },
}
</script>
