<template>
    <div class="page page-sk-add">
        <LsSpinner v-if="loading" />
        <div class="page-content" v-else>
            <nav class="page-nav">
                <ls-button
                    class="back-btn"
                    variant="text"
                    :to="{ name: 'accountSoundKits' }"
                >
                    <i class="ico ico-back"></i>
                    <span>Sound Kits</span>
                </ls-button>
            </nav>
            <header class="page-header">
                <div class="col-left">
                    <h1 class="page-title">Create Sound Kit</h1>
                </div>
                <div class="col-right">
                    <ls-button
                        class="cancel-btn"
                        variant="secondary"
                        size="sm"
                        :to="{ name: 'accountSoundKits' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button size="sm">
                        Save
                    </ls-spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="col-left">
                    <base-card title="Kit Details">
                        <b-form-group label="Title">
                            <b-form-input
                                placeholder="e.g. My Kit"
                                v-model="$v.form.title.$model"
                                :state="!$v.form.title.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.title.required">
                                    Enter a title
                                </template>
                                <template v-else-if="!$v.form.title.isUnique">
                                    You already have a kit with this title, pick
                                    a new one.
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Price">
                            <div class="dollar-input">
                                <LsIcon class="input-icon" icon="dollar" />
                                <input
                                    type="text"
                                    v-model="$v.form.price.$model"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.price.$error,
                                    }"
                                    v-cleave="{
                                        numeral: true,
                                    }"
                                />
                            </div>
                            <b-form-invalid-feedback
                                :force-show="$v.form.price.$error"
                            >
                                Enter a price
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Genre">
                            <LsSelect
                                v-model="form.genreId"
                                placeholder="Select Genre"
                                :options="genres"
                                :reduce="genre => genre.id"
                                label="genre"
                            />
                        </b-form-group>
                        <b-form-group label="Tags(3)">
                            <LsTagsInput
                                v-model="tag"
                                :class="{
                                    'is-invalid': $v.form.tags.$error,
                                }"
                                @tags-changed="handleTagsChange"
                            />
                            <b-form-invalid-feedback
                                :state="!$v.form.tags.$error"
                            >
                                Add 3 or more tags that describe the kit
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Description">
                            <textarea
                                class="form-control"
                                rows="4"
                                v-model="form.desc"
                            ></textarea>
                        </b-form-group>
                    </base-card>
                    <base-card title="Sound Kit ZIP File">
                        <drop-file>
                            <template v-slot:upload-container>xxx</template>
                        </drop-file>
                    </base-card>
                </div>
                <div class="col-right">
                    <div class="Card viz-card">
                        <div class="fr">
                            <div class="card-title">
                                Visibility
                            </div>
                            <div class="viz-toggle">
                                <span class="toggle-label">
                                    {{ form.isPublic ? 'Public' : 'Private' }}
                                </span>
                                <LsToggleButton v-model="form.isPublic" />
                            </div>
                        </div>
                        <b-form-group
                            v-show="form.scheduled"
                            label="Set Release Date"
                        >
                            <b-input-group class="date-input-group">
                                <LsDatePicker v-model="form.date" />
                                <LsTimePicker v-model="form.time" />
                            </b-input-group>
                        </b-form-group>
                        <ls-button
                            variant="link"
                            @click="handleScheduleToggleClick"
                        >
                            {{
                                form.scheduled
                                    ? 'Remove release date'
                                    : 'Set release date'
                            }}
                        </ls-button>
                    </div>
                    <div class="Card">
                        <drop-image
                            variant="inline"
                            msg-long="Drag artwork here or<br><u>browse for file</u>"
                            :src="form.coverArtBase64"
                            @file-added="handleImageAdded"
                            @file-removed="handleImageRemoved"
                        >
                            <template v-slot:upload-body>
                                <small
                                    class="text-hint"
                                    v-if="!form.coverArtBase64"
                                >
                                    Suggested Dimensions: 1000x1000
                                </small>
                            </template>
                        </drop-image>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { DropImage, DropFile } from '~/components/Uploader'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'SoundKitAdd',
    components: {
        DropImage,
        DropFile,
    },
    data() {
        return {
            loading: false,
            tag: '',
            form: {
                title: '',
                price: '',
                genreId: '',
                desc: '',
                coverArtBase64: '',
                date: new Date(),
                time: '00:00:00',
                scheduled: false,
                tags: [],
            },
        }
    },
    validations: {
        form: {
            title: {
                required,
            },
            price: {
                required,
            },
            tags: {
                required,
                minLength: minLength(3),
            },
        },
    },
    computed: {
        ...mapGetters({
            genres: 'common/genres',
        }),
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('common/loadGenres')
        this.loading = false
    },
    methods: {
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleScheduleToggleClick() {
            this.$v.form.$reset()
            this.form.scheduled = !this.form.scheduled
        },
        handleImageAdded(file) {
            this.form.coverArtBase64 = file.base64
        },
        handleImageRemoved() {
            this.form.coverArtBase64 = null
        },
    },
}
</script>