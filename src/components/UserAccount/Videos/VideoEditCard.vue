<template>
    <div class="editable-card editable-card-video" v-resize="handleResize">
        <div class="editable-view" v-show="!isEditing">
            <i class="view-reorder dragable-selector ic ic-reorder"></i>
            <div class="view-body">
                <div class="view-img" ref="video-container">
                    <youtube
                        :video-id="$youtube.getIdFromUrl(video.url)"
                        :width="player.width"
                        :height="player.height"
                    ></youtube>
                </div>
                <h2 class="view-title">{{ video.title }}</h2>
            </div>
            <button type="button" class="view-actions btn btn-icon" @click="edit">
                <i class="ic ic-pen"></i>
            </button>
        </div>
        <div class="editable-edit" v-if="isEditing">
            <div class="edit-header">
                <button class="btn btn-icon" @click="closeEdit">
                    <i class="ic ic-close"></i>
                </button>
            </div>
            <form class="form">
                <div class="form-group">
                    <b-form-input
                        id="title"
                        type="text"
                        v-model="$v.form.title.$model"
                        :state="!$v.form.title.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.title.required">The video name is required</div>
                        <div
                            v-else-if="!$v.form.title.minLength"
                        >The video name must be at least {{ $v.form.title.$params.minLength.min }} characters</div>
                    </b-form-invalid-feedback>
                </div>

                <b-form-group class="mb-4 error-l-50">
                    <v-select
                        v-model="$v.form.genre.$model"
                        :class="{ 'is-invalid': $v.form.genre.$error }"
                        placeholder="Select Genre"
                        :options="genres"
                        :reduce="genre => genre.id"
                        label="genre"
                    />
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.genre.required">The genre is required</div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4">
                    <v-select
                        v-model="form.relatedTrack"
                        placeholder="Select Related Track"
                        :options="relatedTracks"
                        :reduce="track => track.id"
                        label="title"
                    />
                </b-form-group>

                <b-form-group class="mb-4 error-l-65">
                    <v-select
                        v-model="$v.form.visibility.$model"
                        placeholder="Select Visibility"
                        :options="visibilities"
                        :reduce="visibility => visibility.id"
                        :class="{ 'is-invalid': $v.form.visibility.$error }"
                        label="title"
                    />
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.visibility.required">The visibility is required</div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4 error-l-80">
                    <v-date-picker
                        mode="single"
                        color="pink"
                        v-model="$v.form.pubDate.$model"
                        :class="{ 'is-invalid': $v.form.pubDate.$error }"
                        :input-props="{ class: 'form-control', placeholder: 'Date' }"
                        :popover="{ visibility: 'click' }"
                    ></v-date-picker>
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.pubDate.required">The date is required</div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4 error-l-80">
                    <v-select
                        placeholder="Select Timezone"
                        v-model="$v.form.pubTimezone.$model"
                        :class="{ 'is-invalid': $v.form.pubTimezone.$error }"
                        label="zone"
                        :options="timezones"
                        :reduce="timezone => timezone.id"
                    />
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.pubTimezone.required">The timezone is required</div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4 error-l-80">
                    <v-select
                        v-model="$v.form.pubTime.$model"
                        :class="{ 'is-invalid': $v.form.pubTime.$error }"
                        label="std"
                        :options="times"
                        :reduce="time => time.mil"
                    />
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.pubTime.required">The time is required</div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Explicit Content?" class="mb-4">
                    <b-form-radio-group v-model="form.explicit">
                        <b-form-radio :value="false">No</b-form-radio>
                        <b-form-radio :value="true">Yes</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </form>
            <div class="edit-footer">
                <button type="type" class="btn btn-icon">
                    <i class="ic ic-clock"></i>
                </button>
                <button type="type" class="btn btn-icon">
                    <i class="ic ic-eye"></i>
                </button>
                <button type="type" class="btn btn-icon">
                    <i class="ic ic-trash"></i>
                </button>
                <button
                    type="button"
                    class="edit-save-btn btn btn-dark btn-action rounded-pill"
                    @click="closeEdit"
                >Save &amp; Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import resize from 'vue-resize-directive'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'
import { videoFormMixin } from '~/mixins/user-account/videos/videoForm'

export default {
    name: 'VideoCard',
    directives: {
        resize,
    },
    mixins: [videoFormMixin],
    props: {
        video: {
            type: Object,
            required: true,
        },
    },
    data() {
        const video = this.video
        return {
            isEditing: false,
            player: {
                width: '125px',
                height: '70px',
            },
            form: {
                title: video.title,
                genre: video.genre_id,
                relatedTrack: video.related_track,
                visibility: parseInt(video.public),
                explicit: !!parseInt(video.explicit_content),
                pubDate: video.publish_at,
                pubTime: video.publish_at,
                pubTimezone: video.timezone,
            },
        }
    },
    computed: {
        status() {
            return parseInt(this.video.status_id) === 1
        },
        ...mapGetters({
            timezones: ['common/timezones'],
            times: ['common/times'],
            genres: ['common/genres'],
            relatedTracks: ['me/tracks'],
            visibilities: ['me/visibilities'],
        }),
    },
    methods: {
        edit() {
            this.isEditing = true
        },
        closeEdit() {
            this.isEditing = false
        },
        handleResize() {
            this.player.width = this.$refs['video-container'].clientWidth + 'px'
            this.player.height =
                this.$refs['video-container'].clientWidth * 0.5625 + 'px'
        },
    },
}
</script>