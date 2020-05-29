<template>
    <b-modal
        modal-class="VideoEditModal"
        size="lg"
        v-model="shown"
        centered
        no-close-on-backdrop
        no-close-on-esc
    >
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
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
                <LsSelect
                    v-model="form.genre"
                    id="genreInput"
                    placeholder="Select Genre"
                    :options="genres"
                    :reduce="genre => genre.id"
                    label="genre"
                />
            </b-form-group>

            <b-form-group label="Related Track" label-for="trackInput">
                <LsSelect
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
                        <LsDatePicker v-model="form.date" />
                        <LsTimePicker v-model="form.time" />
                    </b-input-group>
                </b-form-group>
            </template>

            <ls-button variant="link" @click="handleScheduleToggleClick">
                {{
                    form.scheduled ? 'Clear scheduling ' : 'Schedule this video'
                }}
            </ls-button>
        </template>

        <template v-slot:modal-footer>
            <div class="modal-delete">
                <LsIconButton
                    icon="trash-sm"
                    title="Delete"
                    @click="handleDeleteClick"
                />
            </div>
            <ls-button
                class="modal-action modal-cancel"
                variant="secondary"
                :disabled="loading"
                @click="close"
            >
                Cancel
            </ls-button>
            <ls-spinner-button
                class="modal-action"
                :loading="loading"
                @click="handleSaveClick"
            >
                Save
            </ls-spinner-button>
        </template>
    </b-modal>
</template>

<script>
import { videoAddEditForm } from '~/mixins/videos/videoAddEditForm'
import { appConstants } from '~/constants'

export default {
    name: 'VideoEditModal',
    mixins: [videoAddEditForm],
    data() {
        return {
            shown: false,
            video: null,
        }
    },
    created() {
        this.$bus.$on('modal.videoEdit.show', this.handleShow)
        this.$bus.$on('modal.videoEdit.hide', this.handleHide)
    },
    methods: {
        close() {
            this.shown = false
        },
        handleScheduleToggleClick() {
            this.form.scheduled = !this.form.scheduled
        },
        handleDeleteClick() {
            this.$emit('delete-click', this.video)
        },
        handleHide() {
            this.shown = false
        },
        handleShow(video) {
            this.video = { ...video }

            const {
                url,
                title,
                genre_id,
                related_track,
                public: visibility,
                scheduled,
                date,
                time,
            } = this.video

            this.form = {
                url,
                title,
                visibility,
                scheduled,
                genre: genre_id != '0' ? genre_id : null,
                relatedTrack: related_track != '0' ? related_track : null,
                date: scheduled ? new Date(date + ' 00:00:00') : new Date(),
                time: scheduled ? time : '00:00:00',
            }

            this.shown = true
        },
    },
}
</script>
