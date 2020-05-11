<template>
    <b-modal
        modal-class="mdl-vid-edit"
        ref="modal"
        size="lg"
        centered
        no-close-on-backdrop
        no-close-on-esc
        @hidden="handleHidden"
    >
        <template v-slot:modal-header>
            <IconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Edit video info</h2>
        </template>

        <template v-slot:default>
            <youtube class="yt-wrap" :video-id="ytVidId"></youtube>
            <b-form-group label="YouTube Video URL" label-for="urlInput">
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

            <b-form-group label="Video Title" label-for="titleInput">
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
                        {{ $v.form.title.$params.minLength.min }} characters
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Primary Genre" label-for="genreInput">
                <SelectBox
                    v-model="form.genre"
                    id="genreInput"
                    placeholder="Select Genre"
                    :options="genres"
                    :reduce="genre => genre.id"
                    label="genre"
                />
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
                    >
                        {{ v.title }}
                    </b-form-radio>
                </b-form-radio-group>
            </b-form-group>

            <template v-if="form.scheduled">
                <b-form-group label="Publish Date">
                    <b-input-group class="input-group-datetime">
                        <DatePicker v-model="form.date" />
                        <TimePicker v-model="form.time" />
                    </b-input-group>
                </b-form-group>
            </template>

            <basic-button variant="link" @click="toggleSchedule">
                {{
                    form.scheduled ? 'Clear scheduling ' : 'Schedule this video'
                }}
            </basic-button>
        </template>

        <template v-slot:modal-footer>
            <div class="modal-delete">
                <IconButton
                    icon="trash-sm"
                    title="Delete"
                    @click="handleDeleteClick"
                />
            </div>
            <basic-button
                class="modal-action modal-cancel"
                variant="secondary"
                :disabled="loading"
                @click="close"
            >
                Cancel
            </basic-button>
            <spinner-button
                class="modal-action"
                :loading="loading"
                @click="save"
            >
                Save
            </spinner-button>
        </template>
    </b-modal>
</template>

<script>
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'

export default {
    name: 'VideoEditModal',
    mixins: [videoAddEditForm],
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
            date: scheduled ? new Date(date + ' 00:00:00') : new Date(),
            time: scheduled ? time : '00:00:00',
        }
    },
    mounted() {
        this.$refs.modal.show()
    },
    methods: {
        close() {
            this.$refs.modal.hide()
        },
        handleDeleteClick() {
            this.$emit('delete-click', this.video)
        },
        handleHidden() {
            this.$emit('hidden')
        },
    },
}
</script>
