<template>
    <div class="edc edc--video">
        <section class="edc-mode-view" v-show="!isEditing">
            <i class="edc-reorder dragable-selector ls ls-reorder"></i>
            <div class="edc-body">
                <div class="edc-media">
                    <youtube :video-id="ytVidId"></youtube>
                </div>
                <h2 class="edc-title">{{ video.title }}</h2>
            </div>
            <ButtonIcono icon="edit" class="edc-btn-edit" @click="edit" />
        </section>
        <section class="edc-mode-edit" v-if="isEditing">
            <ButtonIcono icon="close" class="edc-close" @click="closeEdit" />
            <div class="edc-media">
                <img :src="ytThumbUrl" />
            </div>
            <form class="edc-form">
                <div class="form-group">
                    <b-form-input
                        id="title"
                        type="text"
                        v-model="$v.form.title.$model"
                        :state="!$v.form.title.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.title.required">
                            The video name is required
                        </div>
                        <div v-else-if="!$v.form.title.minLength">
                            The video name must be at least
                            {{ $v.form.title.$params.minLength.min }} characters
                        </div>
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
                        <div v-if="!$v.form.genre.required">
                            The genre is required
                        </div>
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
                        <div v-if="!$v.form.visibility.required">
                            The visibility is required
                        </div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4 error-l-80">
                    <v-date-picker
                        mode="single"
                        color="pink"
                        v-model="$v.form.pubDate.$model"
                        :class="{ 'is-invalid': $v.form.pubDate.$error }"
                        :input-props="{
                            class: 'form-control',
                            placeholder: 'Date',
                        }"
                        :popover="{ visibility: 'click' }"
                    ></v-date-picker>
                    <b-form-invalid-feedback>
                        <div v-if="!$v.form.pubDate.required">
                            The date is required
                        </div>
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
                        <div v-if="!$v.form.pubTimezone.required">
                            The timezone is required
                        </div>
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
                        <div v-if="!$v.form.pubTime.required">
                            The time is required
                        </div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Explicit Content?" class="mb-4">
                    <b-form-radio-group v-model="form.explicit">
                        <b-form-radio :value="false">No</b-form-radio>
                        <b-form-radio :value="true">Yes</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </form>
            <footer class="edc-footer">
                <ButtonIcono icon="clock" class="edc-btn" />
                <ButtonIcono icon="eye" class="edc-btn" />
                <ButtonIcono icon="trash" class="edc-btn" />
                <MultiStateButton
                    class="edc-btn edc-btn-save btn-action"
                    type="submit"
                    variant="black"
                >
                    Save &amp; Close
                </MultiStateButton>
            </footer>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'
import { videoFormMixin } from '~/mixins/user-account/videos/videoForm'
import { ButtonIcono, MultiStateButton } from '~/components/Button'

export default {
    name: 'VideoCard',
    mixins: [videoFormMixin],
    components: {
        MultiStateButton,
        ButtonIcono,
    },
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
        ytThumbUrl() {
            return this.ytVidId
                ? `https://img.youtube.com/vi/${this.ytVidId}/hqdefault.jpg`
                : ''
        },
    },
    methods: {
        edit() {
            this.isEditing = true
        },
        closeEdit() {
            this.isEditing = false
        },
    },
}
</script>
