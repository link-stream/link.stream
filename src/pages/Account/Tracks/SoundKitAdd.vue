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
                        size="md"
                        :to="{ name: 'accountSoundKits' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button
                        size="md"
                        :loading="saving"
                        @click="handleSaveClick"
                    >
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
                                v-model="form.description"
                            ></textarea>
                        </b-form-group>
                    </base-card>
                    <base-card class="zip-card" title="Sound Kit ZIP File">
                        <drop-file
                            class="is-zip"
                            :filename="form.zip ? form.zip.name : null"
                            :src="form.zip ? form.zip.base64 : null"
                            :acceptTypes="['.zip', '.rar']"
                            @file-added="handleZipAdded"
                            @file-removed="handleZipRemoved"
                        >
                            <template v-slot:preview-body>
                                <div
                                    v-if="form.zip"
                                    class="preview-title"
                                    v-html="form.zip.name"
                                ></div>
                            </template>
                            <template v-slot:upload-container>
                                <i class="upload-icon"></i>
                                <div class="upload-msg">
                                    <div class="upload-msg-s">
                                        Add Zip File
                                    </div>
                                    <div class="upload-msg-l">
                                        Drop a ZIP file here or
                                        <u>browse for file</u>
                                    </div>
                                </div>
                            </template>
                        </drop-file>
                        <div class="file-entries" v-if="zipEntriesCount">
                            <div class="entry-count">
                                {{ zipEntriesCount }} samples
                            </div>
                            <ul class="entry-list">
                                <li
                                    v-for="(entry,
                                    index) in zipEntriesPaginated"
                                    :key="index"
                                >
                                    {{ entry.name }}
                                </li>
                            </ul>
                            <ls-button
                                v-if="showLoadMoreZipEntriesButton"
                                class="load-more-btn"
                                variant="outline-light"
                                size="sm"
                                @click="handleLoadMoreZipEntriesClick"
                            >
                                Load More Samples
                            </ls-button>
                        </div>
                    </base-card>
                    <base-card class="mp3-card" title="Demo MP3 File">
                        <drop-audio
                            @file-added="handleMp3Added"
                            @file-removed="handleMp3Removed"
                        >
                            <template v-slot:preview-body>
                                <div
                                    v-if="form.mp3"
                                    class="preview-title"
                                    v-html="form.mp3.name"
                                ></div>
                            </template>
                            <template v-slot:upload-container>
                                <i class="upload-icon"></i>
                                <div class="upload-msg">
                                    <div class="upload-msg-s">
                                        Add MP3 Preview File
                                    </div>
                                    <div class="upload-msg-l">
                                        Drop a preview MP3 here or
                                        <u>browse for file</u>
                                    </div>
                                </div>
                            </template>
                        </drop-audio>
                        <div class="text-hint upload-hint" v-if="!form.mp3">
                            Optional: Add a demo of your kit for customers to
                            preview prior to purchase.
                        </div>
                    </base-card>
                </div>
                <div class="col-right">
                    <div class="Card viz-card">
                        <header class="card-header">
                            <div class="card-title">
                                Visibility
                            </div>
                            <div class="viz-toggle">
                                <span class="toggle-label">
                                    {{ form.isPublic ? 'Public' : 'Private' }}
                                </span>
                                <LsToggleButton v-model="form.isPublic" />
                            </div>
                        </header>
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
            <footer class="page-footer">
                <ls-button
                    class="cancel-btn"
                    variant="secondary"
                    size="md"
                    :to="{ name: 'accountSoundKits' }"
                >
                    Cancel
                </ls-button>
                <ls-spinner-button
                    size="md"
                    :loading="saving"
                    @click="handleSaveClick"
                >
                    Save
                </ls-spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { DropImage, DropFile, DropAudio } from '~/components/Uploader'
import { api } from '~/services'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import moment from 'moment'
import jszip from 'jszip'

const ZIP_ENTRIES_PAGE_SIZE = 5

export default {
    name: 'SoundKitAdd',
    components: {
        DropImage,
        DropFile,
        DropAudio,
    },
    data() {
        return {
            loading: false,
            saving: false,
            tag: '',
            zipEntries: [],
            zipEntriesCurrentPage: 0,
            zipEntriesTotalPages: 0,
            form: {
                isPublic: false,
                title: '',
                price: '',
                genreId: '',
                description: '',
                coverArtBase64: '',
                mp3: '',
                zip: null,
                tags: [],
                scheduled: false,
                date: new Date(),
                time: '00:00:00',
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
        }),
        zipEntriesCount() {
            return this.zipEntries.length
        },
        zipEntriesPaginated() {
            return this.zipEntries.slice(
                0,
                this.zipEntriesCurrentPage * ZIP_ENTRIES_PAGE_SIZE
            )
        },
        showLoadMoreZipEntriesButton() {
            return (
                this.zipEntriesTotalPages > 1 &&
                this.zipEntriesCurrentPage < this.zipEntriesTotalPages
            )
        },
    },
    validations: {
        form: {
            price: {
                required,
            },
            tags: {
                required,
                minLength: minLength(3),
            },
            title: {
                required,
                async isUnique(value) {
                    if (!value) {
                        return true
                    }
                    const { status } = await api.audios.getAvailability({
                        value,
                        userId: this.user.id,
                        trackType: 3,
                    })
                    return status === 'success'
                },
            },
        },
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
        handleLoadMoreZipEntriesClick() {
            this.zipEntriesCurrentPage++
        },
        handleMp3Added(file) {
            this.form.mp3 = file
        },
        handleMp3Removed() {
            this.form.mp3 = null
        },
        handleZipRemoved() {
            this.form.zip = null
            this.zipEntries = []
        },
        async handleZipAdded(file) {
            try {
                const zip = await jszip.loadAsync(file.blob)
                const zipEntries = []
                zip.forEach((relativePath, zipEntry) => {
                    zipEntries.push({
                        name: zipEntry.name,
                    })
                })
                this.form.zip = file
                this.zipEntries = zipEntries
                this.zipEntriesCurrentPage = 1
                this.zipEntriesTotalPages = Math.ceil(
                    zipEntries.length / ZIP_ENTRIES_PAGE_SIZE
                )
            } catch (e) {
                this.form.zip = null
                this.zipEntries = []
                this.$toast.error("Can't read ZIP file.")
            }
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (this.$v.form.title.$invalid) {
                this.$toast.error('Enter a title.')
                return
            }

            if (this.$v.form.price.$invalid) {
                this.$toast.error('Enter a price.')
                return
            }

            if (this.$v.form.tags.$invalid) {
                this.$toast.error('Add 3 or more tags that describe the beat.')
                return
            }

            this.saving = true

            const form = this.form

            const params = {
                user_id: this.user.id,
                title: form.title,
                price: form.price,
                genre_id: form.genreId,
                tags: form.tags.map(({ text }) => text).join(', '),
                description: form.description,
                track_type: 3,
                public: form.isPublic ? 1 : 2,
                scheduled: form.scheduled,
            }

            if (form.scheduled) {
                params.date = moment(form.date).format('YYYY-MM-DD')
                params.time = form.time
            }

            if (form.coverArtBase64) {
                params.image = form.coverArtBase64
            }

            if (form.zip) {
                params.track_stems_name = form.zip.name
                params.track_stems = form.zip.base64
            }

            if (form.mp3) {
                params.tagged_file_name = form.mp3.name
                params.tagged_file = form.mp3.base64
            }

            const { status, message, error } = await api.audios.createAudio(
                params
            )

            if (status === 'success') {
                this.$toast.success(message)
                this.$router.push({ name: 'accountSoundKits' })
            } else {
                this.$toast.error(error)
            }

            this.saving = false
        },
    },
}
</script>
