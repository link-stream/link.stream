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
                    <h1 class="page-title">{{
                        isEditMode ? soundKit.title : 'Create Sound Kit'
                    }}</h1>
                </div>
                <div class="col-right">
                    <ls-button
                        class="cancel-btn"
                        variant="secondary"
                        size="md"
                        :disabled="saving"
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
                    <base-card title="Kit Details" class="info-card">
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
                                :tags="form.tags"
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
                            :filename="form.zipFile.name"
                            :src="form.zipFile.base64"
                            :acceptTypes="['.zip', '.rar']"
                            @file-add="handleZipAdd"
                            @file-remove="handleZipRemove"
                        >
                            <template v-slot:preview-body>
                                <div
                                    v-if="isZipFileAdded"
                                    class="preview-title"
                                    v-html="form.zipFile.name"
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
                        <div class="zip-entries" v-if="zipEntriesCount">
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
                            <footer>
                                <ls-button
                                    v-if="showLoadMoreZipEntriesButton"
                                    variant="outline-light"
                                    size="sm"
                                    @click="handleLoadMoreZipEntriesClick"
                                >
                                    Load More Samples
                                </ls-button>
                            </footer>
                        </div>
                    </base-card>
                    <base-card class="mp3-card" title="Demo MP3 File">
                        <drop-audio
                            :filename="form.mp3File.name"
                            :src="form.mp3File.base64"
                            @file-add="handleMp3Add"
                            @file-remove="handleMp3Remove"
                        >
                            <template v-slot:preview-body>
                                <div
                                    v-if="isMp3FileAdded"
                                    class="preview-title"
                                    v-html="form.mp3File.name"
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
                        <div
                            class="text-hint upload-hint"
                            v-if="!isMp3FileAdded"
                        >
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
                            @file-add="handleImageAdd"
                            @file-remove="handleImageRemove"
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
                    :disabled="saving"
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
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import moment from 'moment'

const ZIP_ENTRIES_PAGE_SIZE = 5

export default {
    name: 'SoundKitAddEdit',
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
            soundKit: null,
            form: {
                isPublic: false,
                title: '',
                price: '',
                genreId: '',
                description: '',
                coverArtBase64: '',
                tags: [],
                scheduled: false,
                date: new Date(),
                time: '00:00:00',
                mp3File: {},
                zipFile: {},
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
        }),
        isEditMode() {
            return !!this.soundKit
        },
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
            return this.zipEntriesPaginated.length < this.zipEntriesCount
        },
        isZipFileAdded() {
            return !!this.form.zipFile.base64
        },
        isMp3FileAdded() {
            return !!this.form.mp3File.base64
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
                    const params = {
                        value,
                        trackType: 3,
                        userId: this.user.id,
                    }
                    if (this.isEditMode) {
                        params.audioId = this.soundKit.id
                    }
                    const { status } = await api.audios.getAvailability(params)
                    return status === 'success'
                },
            },
        },
    },
    async created() {
        this.loading = true

        const route = this.$route

        if (route.name === 'accountSoundKitEdit') {
            const skId = route.params.id
            const skResponse = await api.audios.getSoundKit(skId, this.user.id)
            if (skResponse.status !== 'success' || !skResponse.data.length) {
                this.$router.push({ name: 'accountSoundKits' })
                this.$toast.error('Sound kit not found.')
                return
            }
            const sk = skResponse.data[0]
            const form = {
                isPublic: sk.public == appConstants.visibilities.public,
                title: sk.title,
                price: sk.price,
                genreId: sk.genre_id,
                description: sk.description,
                coverArtBase64: sk.data_image,
                scheduled: sk.scheduled,
                date: sk.scheduled
                    ? new Date(sk.date + ' 00:00:00')
                    : new Date(),
                time: sk.scheduled ? sk.time : '00:00:00',
                tags: sk.tags
                    ? sk.tags.split(', ').map(tag => ({
                          text: tag,
                      }))
                    : [],
                mp3File: sk.tagged_file
                    ? {
                          name: sk.tagged_file_name,
                          base64: sk.tagged_file,
                      }
                    : {},
                zipFile: sk.track_stems
                    ? {
                          name: sk.track_stems_name,
                          base64: sk.track_stems,
                      }
                    : {},
            }
            this.form = { ...this.form, ...form }
            this.soundKit = sk
        }

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
        handleImageAdd(file) {
            this.form.coverArtBase64 = file.base64
        },
        handleImageRemove() {
            this.form.coverArtBase64 = null
        },
        handleLoadMoreZipEntriesClick() {
            this.zipEntriesCurrentPage++
        },
        handleMp3Add({ name, base64 }) {
            this.form.mp3File = {
                name,
                base64,
            }
        },
        handleMp3Remove() {
            this.form.mp3File = {}
        },
        async handleZipAdd({ name, base64 }) {
            this.form.zipFile = {
                name,
                base64,
            }
        },
        handleZipRemove() {
            this.form.zipFile = {}
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

            // Cover art

            if (this.isEditMode) {
                if (form.coverArtBase64 !== this.soundKit.data_image) {
                    params.image = form.coverArtBase64
                }
            } else {
                params.image = form.coverArtBase64
            }

            // Files

            const { zipFile, mp3File } = form

            if (
                !this.isEditMode ||
                zipFile.name !== this.soundKit.track_stems_name ||
                zipFile.base64 !== this.soundKit.data_track_stems
            ) {
                params.track_stems = zipFile.base64 || null
                params.track_stems_name = zipFile.name || null
            }

            if (
                !this.isEditMode ||
                mp3File.name !== this.soundKit.tagged_file_name ||
                mp3File.base64 !== this.soundKit.data_tagged_file
            ) {
                params.tagged_file = mp3File.base64 || null
                params.tagged_file_name = mp3File.name || null
            }

            const { status, message, error } = this.isEditMode
                ? await this.$store.dispatch('me/updateSoundKit', {
                      id: this.soundKit.id,
                      params,
                  })
                : await this.$store.dispatch('me/createSoundKit', { params })

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
