<template>
    <div class="page page-beat-edit">
        <LsSpinner v-if="isLoading" />
        <div class="page-content" v-else>
            <nav class="page-nav">
                <ls-button
                    class="back-btn"
                    variant="text"
                    :to="{ name: 'accountBeats' }"
                >
                    <i class="ico ico-back"></i>
                    <span>Beats</span>
                </ls-button>
            </nav>
            <header class="page-header">
                <div class="col-left">
                    <h1 class="page-title">{{ beat.title }}</h1>
                    <div class="page-preview">
                        <span>
                            <span class="text-light">link.stream/</span
                            >{{ beat.url_user }}/beats/{{ beat.url_title }}
                        </span>
                        <preview-pill-button
                            :to="{
                                name: 'userBeats',
                                params: {
                                    username: beat.url_user,
                                    title: beat.url_title,
                                },
                            }"
                        >
                            Preview
                        </preview-pill-button>
                    </div>
                </div>
                <div class="col-right">
                    <ls-button
                        class="cancel-btn"
                        variant="secondary"
                        size="sm"
                        :to="{ name: 'accountBeats' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button
                        size="sm"
                        :loading="isSaving"
                        @click="handleSaveClick"
                    >
                        Save
                    </ls-spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="col-left">
                    <!-- Info Card -->
                    <base-card title="Beat Details" class="info-card">
                        <b-form-group label="Title">
                            <b-form-input
                                placeholder="e.g. My Beat"
                                v-model="$v.form.title.$model"
                                :state="!$v.form.title.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.title.required">
                                    Enter a title
                                </template>
                                <template v-else-if="!$v.form.title.isUnique">
                                    You already have a beat with this title,
                                    pick a new one.
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Primary Genre">
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
                                :tags="form.tags"
                                @tags-changed="handleTagsChange"
                            />
                            <b-form-invalid-feedback
                                :state="!$v.form.tags.$error"
                            >
                                Add 3 or more tags that describe the beat
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-row>
                            <b-col md="6">
                                <b-form-group label="BPM">
                                    <b-form-input
                                        type="number"
                                        v-model="form.bpm"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group label="Key">
                                    <LsSelect
                                        v-model="form.keyId"
                                        placeholder="Select"
                                        :options="audioKeys"
                                        :reduce="key => key.id"
                                        label="name"
                                    />
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                    </base-card>

                    <!-- Files Card -->
                    <base-card title="Files">
                        <DropAudio
                            title="Untagged .MP3"
                            :class="{
                                'is-invalid': $v.form.files.untaggedMp3.$error,
                            }"
                            :src="
                                form.files.untaggedMp3 &&
                                    form.files.untaggedMp3.base64
                            "
                            :filename="
                                form.files.untaggedMp3 &&
                                    form.files.untaggedMp3.name
                            "
                            :acceptTypes="['.mp3']"
                            @file-added="handleUntaggeMp3Added"
                            @file-removed="handleUntaggedMp3Removed"
                        />
                        <DropAudio
                            title="Untagged .WAV"
                            :class="{
                                'is-invalid': $v.form.files.untaggedWav.$error,
                            }"
                            :src="
                                form.files.untaggedWav &&
                                    form.files.untaggedWav.base64
                            "
                            :filename="
                                form.files.untaggedWav &&
                                    form.files.untaggedWav.name
                            "
                            :acceptTypes="['.wav']"
                            @file-added="handleUntaggedWavAdded"
                            @file-removed="handleUntaggedWavRemoved"
                        />
                        <DropAudio
                            title="Tagged Streaming File (.MP3 or .WAV)"
                            :src="form.files.tagged && form.files.tagged.base64"
                            :filename="
                                form.files.tagged && form.files.tagged.name
                            "
                            @file-added="handleTaggedAdded"
                            @file-removed="handleTaggedRemoved"
                        />
                        <DropFile
                            title="Track Stems .ZIP (or .RAR)"
                            :class="{
                                'is-invalid': $v.form.files.stems.$error,
                            }"
                            :acceptTypes="['.rar', '.zip']"
                            :src="form.files.stems && form.files.stems.base64"
                            :filename="
                                form.files.stems && form.files.stems.name
                            "
                            @file-added="handleStemsAdded"
                            @file-removed="handleStemsRemoved"
                        />
                    </base-card>

                    <!-- Licenses Card -->
                    <base-card title="Licensing">
                        <LicenseCard
                            v-for="license in userLicenses"
                            :license="license"
                            :key="license.id"
                            :checked="
                                form.selectedLicenseIds.indexOf(license.id) > -1
                            "
                            @updated="handleLicenseUpdated"
                            @checked="handleLicenseChecked"
                            @unchecked="handleLicenseUnchecked"
                        />
                    </base-card>

                    <!-- Beat Pack Card -->
                    <base-card title="Add to Beat Pack">
                        <div class="search-input">
                            <LsIcon class="input-icon" icon="search" />
                            <b-form-input
                                placeholder="Search for beat packs"
                            ></b-form-input>
                        </div>
                    </base-card>

                    <!-- Marketing Card -->
                    <base-card title="Free downloads" class="marketing-card">
                        <div
                            class="custom-control custom-checkbox"
                            v-for="option in freeOptions"
                            :key="option.id"
                        >
                            <input
                                type="checkbox"
                                class="custom-control-input"
                                v-model="form.selectedFreeOptionIds"
                                :value="option.id"
                                :checked="
                                    form.selectedFreeOptionIds.indexOf(
                                        option.id
                                    ) !== -1
                                "
                                :id="`freeCheck${option.id}`"
                            />
                            <label
                                class="custom-control-label"
                                :for="`freeCheck${option.id}`"
                            >
                                {{ option.title }}
                            </label>
                        </div>
                    </base-card>

                    <!-- Collabs Card -->
                    <base-card title="Collaborators">
                        <div class="collabs">
                            <div class="collabs-grid">
                                <div
                                    class="fr"
                                    v-for="(collab, index) in form.collabs"
                                    :key="index"
                                >
                                    <div class="fc user-col">
                                        <label>Collaborator</label>
                                        <div class="mini-profile">
                                            <UserAvatar :user="collab.user" />
                                            {{
                                                collab.user.name | truncate(14)
                                            }}
                                            {{
                                                collab.user.id == user.id
                                                    ? '(you)'
                                                    : ''
                                            }}
                                        </div>
                                    </div>
                                    <div class="fc profit-col">
                                        <label>Profit %</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :readonly="index == 0"
                                            :value="collab.profit"
                                            @keyup="
                                                handleCollabProfitInput(
                                                    collab,
                                                    $event
                                                )
                                            "
                                        />
                                    </div>
                                    <div class="fc pub-col">
                                        <label>Publishing %</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :readonly="index === 0"
                                            :value="collab.publishing"
                                            @keyup="
                                                handleCollabPublishingInput(
                                                    collab,
                                                    $event
                                                )
                                            "
                                        />
                                    </div>
                                    <div class="fc remove-col" v-if="index > 0">
                                        <LsIconButton
                                            icon="close"
                                            class="remove-icon"
                                            @click="
                                                handleCollabRemoveClick(index)
                                            "
                                        />
                                        <ls-button
                                            variant="link"
                                            class="remove-btn"
                                            @click="
                                                handleCollabRemoveClick(index)
                                            "
                                        >
                                            Remove Collaborator
                                        </ls-button>
                                    </div>
                                </div>
                            </div>
                            <ls-button
                                variant="text"
                                class="add-btn"
                                @click="showCollabSearchModal"
                            >
                                <LsIcon icon="plus" />
                                Add Collaborator
                            </ls-button>
                        </div>
                    </base-card>
                </div>
                <div class="col-right">
                    <!-- Visibility Card -->
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
                                    ? 'Remove schedule'
                                    : 'Schedule release'
                            }}
                        </ls-button>
                    </div>

                    <!-- Image Card -->
                    <div class="Card">
                        <DropImage
                            variant="inline"
                            msg-long="Drag artwork here or<br><u>browse for file</u>"
                            :src="form.coverArtBase64"
                            @file-added="handleImageAdded"
                            @file-removed="handleImageRemoved"
                        />
                    </div>
                </div>
            </main>
            <footer class="page-footer">
                <div class="col-left">
                    <LsIconButton
                        icon="trash-sm"
                        title="Delete"
                        @click="handleDeleteClick"
                    />
                </div>
                <div class="col-right">
                    <ls-button
                        class="cancel-btn"
                        variant="secondary"
                        size="sm"
                        :to="{ name: 'accountBeats' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button
                        size="sm"
                        :loading="isSaving"
                        @click="handleSaveClick"
                    >
                        Save
                    </ls-spinner-button>
                </div>
            </footer>
        </div>
        <UserInviteModal />
        <UserSearchModal />
    </div>
</template>

<script>
import { LicenseCard } from '~/components/Account/Tracks/AddTrackWizard'
import { DropAudio, DropFile, DropImage } from '~/components/Uploader'
import { UserInviteModal, UserSearchModal } from '~/components/Modal'
import { collabsProfitFormMixin } from '~/mixins/tracks/collabsProfitForm'
import { api } from '~/services'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import moment from 'moment'

const STATUS_IDLE = 'idle'
const STATUS_LOADING = 'loading'
const STATUS_SAVING = 'saving'

export default {
    name: 'BeatEdit',
    mixins: [collabsProfitFormMixin],
    components: {
        DropAudio,
        DropFile,
        DropImage,
        LicenseCard,
        UserInviteModal,
        UserSearchModal,
    },
    data() {
        return {
            tag: '',
            status: STATUS_IDLE,
            beat: {},
            form: {},
            userLicenses: [],
            freeOptions: [...appConstants.marketingOptions],
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
        }),
        isLoading() {
            return this.status === STATUS_LOADING
        },
        isSaving() {
            return this.status === STATUS_SAVING
        },
        selectedLicenses() {
            return this.userLicenses.filter(
                ({ id }) => this.form.selectedLicenseIds.indexOf(id) !== -1
            )
        },
        selectedFreeOptions() {
            return this.freeOptions.filter(
                ({ id }) => this.form.selectedFreeOptionIds.indexOf(id) !== -1
            )
        },
    },
    watch: {
        form() {
            this.$v.form.$touch()
        },
    },
    validations() {
        const files = {
            stems: {},
            untaggedMp3: {},
            untaggedWav: {},
        }

        this.selectedLicenses.forEach(({ mp3, wav, trackout_stems }) => {
            if (mp3 === '1') {
                files.untaggedMp3 = { required }
            }
            if (wav === '1') {
                files.untaggedWav = { required }
            }
            if (trackout_stems === '1') {
                files.stems = { required }
            }
        })

        return {
            form: {
                files,
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
                            audioId: this.beat.id,
                        })
                        return status === 'success'
                    },
                },
            },
        }
    },
    mounted() {
        this.$bus.$on('modal.userSearch.userSelected', this.handleCollabAdd)
    },
    async created() {
        this.status = STATUS_LOADING

        const beatId = this.$route.params.id
        const beatResponse = await api.audios.getBeat(beatId, this.user.id)
        let beat = null

        if (beatResponse.status === 'success' && beatResponse.data.length) {
            beat = beatResponse.data[0]
        } else {
            this.$router.push({ name: 'accountBeats' })
            this.$toast.error('Beat not found.')
            return
        }

        await this.$store.dispatch('common/loadGenres')
        await this.$store.dispatch('common/loadAudioKeys')
        await this.$store.dispatch('me/loadLicenses')

        const userLicenses = this.$store.getters['me/licenses']

        if (!userLicenses.length) {
            this.$router.push({ name: 'accountBeats' })
            this.$toast.error('Licenses not found.')
            return
        }

        this.userLicenses = userLicenses.map(userLicense => {
            const beatLicense = beat.licenses.find(
                ({ license_id }) => license_id == userLicense.id
            )
            if (beatLicense) {
                return {
                    ...userLicense,
                    price: beatLicense.price,
                }
            } else {
                return userLicense
            }
        })

        const form = {
            title: beat.title,
            genreId: beat.genre_id || null,
            bpm: beat.bpm,
            keyId: beat.key_id || null,
            coverArtBase64: beat.data_image,
            isPublic: beat.public === '1',
            scheduled: beat.scheduled,
            date: beat.scheduled
                ? new Date(beat.date + ' 00:00:00')
                : new Date(),
            time: beat.scheduled ? beat.time : '00:00:00',
            tags: beat.tags
                ? beat.tags.split(', ').map(tag => ({
                      text: tag,
                  }))
                : [],
            files: {
                stems: beat.data_track_stems
                    ? {
                          name: beat.track_stems_name,
                          base64: beat.data_track_stems,
                      }
                    : null,
                tagged: beat.data_tagged_file
                    ? {
                          name: beat.tagged_file_name,
                          base64: beat.data_tagged_file,
                      }
                    : null,
                untaggedMp3: beat.data_untagged_mp3
                    ? {
                          name: beat.untagged_mp3_name,
                          base64: beat.data_untagged_mp3,
                      }
                    : null,
                untaggedWav: beat.data_untagged_wav
                    ? {
                          name: beat.untagged_wav_name,
                          base64: beat.data_untagged_wav,
                      }
                    : null,
            },

            selectedFreeOptionIds: Array.isArray(beat.marketing)
                ? beat.marketing.map(({ marketing_id }) => marketing_id)
                : [],

            selectedLicenseIds: Array.isArray(beat.licenses)
                ? beat.licenses.map(({ license_id }) => license_id)
                : [],

            collabs: Array.isArray(beat.collaborators)
                ? beat.collaborators.map(
                      ({
                          user_id,
                          user_name,
                          data_image,
                          profit,
                          publishing,
                      }) => ({
                          profit,
                          publishing,
                          user: {
                              id: user_id,
                              name: user_name,
                              photo: data_image,
                          },
                      })
                  )
                : [],
        }

        this.form = form
        this.beat = beat
        this.status = STATUS_IDLE
    },
    methods: {
        showCollabSearchModal() {
            this.$bus.$emit('modal.userSearch.open')
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
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleLicenseChecked(license) {
            const index = this.form.selectedLicenseIds.indexOf(license.id)
            index === -1 && this.form.selectedLicenseIds.push(license.id)
        },
        handleLicenseUnchecked(license) {
            const index = this.form.selectedLicenseIds.indexOf(license.id)
            this.form.selectedLicenseIds.splice(index, 1)
        },
        handleLicenseUpdated(license) {
            const licenseIndex = this.userLicenses.findIndex(
                ({ id }) => id == license.id
            )
            this.userLicenses.splice(licenseIndex, 1, license)
        },
        handleUntaggeMp3Added({ name, base64 }) {
            this.form.files.untaggedMp3 = {
                name,
                base64,
            }
        },
        handleUntaggedMp3Removed() {
            this.form.files.untaggedMp3 = null
        },
        handleUntaggedWavAdded({ name, base64 }) {
            this.form.files.untaggedWav = {
                name,
                base64,
            }
        },
        handleUntaggedWavRemoved() {
            this.form.files.untaggedWav = null
        },
        handleStemsAdded({ name, base64 }) {
            this.form.files.stems = {
                name,
                base64,
            }
        },
        handleStemsRemoved() {
            this.form.files.stems = null
        },
        handleTaggedAdded({ name, base64 }) {
            this.form.files.tagged = {
                name,
                base64,
            }
        },
        handleTaggedRemoved() {
            this.form.files.tagged = null
        },
        async handleDeleteClick() {
            this.$alert.confirm({
                title: 'Delete beat?',
                message: 'This beat and its data will be permanently deleted.',
                onOk: async () => {
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteBeat', this.beat)
                    if (status === 'success') {
                        this.$router.push({ name: 'accountBeats' })
                        this.$toast.success(message)
                    } else {
                        this.$toast.error(error)
                    }
                },
            })
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (!this.$v.form.title.required) {
                this.$toast.error('Enter a title.')
                return
            }

            if (!this.$v.form.title.isUnique) {
                this.$toast.error(
                    'You already have a beat with that title, pick a new one.'
                )
                return
            }

            if (this.$v.form.tags.$invalid) {
                this.$toast.error('Add 3 or more tags that describe the beat.')
                return
            }

            if (!this.form.selectedLicenseIds.length) {
                this.$toast.error('Pick one or more licenses.')
                return
            }

            if (this.$v.form.files.$invalid) {
                this.$toast.error('Upload required files.')
                return
            }

            this.status = STATUS_SAVING

            const form = this.form

            const params = {
                user_id: this.user.id,
                title: form.title,
                bpm: form.bpm,
                key: form.keyId,
                genre_id: form.genreId,
                tags: form.tags.map(({ text }) => text).join(', '),
                public: form.isPublic ? 1 : 2,
                scheduled: false,
            }

            if (this.beat.image !== form.coverArtBase64) {
                params.image = form.coverArtBase64
            }

            if (form.scheduled) {
                params.date = moment(form.date).format('YYYY-MM-DD')
                params.time = form.time
            }

            // Collabs

            const collabs = form.collabs.map(({ user, profit, publishing }) => {
                return {
                    user_id: user.id,
                    profit: profit,
                    publishing: publishing,
                }
            })

            params.collaborators = JSON.stringify(collabs)

            // Licenses

            const selectedLicenses = this.selectedLicenses.map(
                ({ id, price, status_id }) => {
                    return {
                        license_id: id,
                        price,
                        status_id,
                    }
                }
            )

            params.licenses = JSON.stringify(selectedLicenses)

            // Free downloads

            const selectedFreeOptions = this.selectedFreeOptions.map(
                ({ id }) => {
                    return {
                        marketing_id: id,
                        connect_id: '',
                    }
                }
            )

            if (selectedFreeOptions.length) {
                params.marketing = JSON.stringify(selectedFreeOptions)
            }

            // Files

            if (
                form.files.stems &&
                this.beat.track_stems !== form.files.stems.base64
            ) {
                params.track_stems_name = form.files.stems.name
                params.track_stems = form.files.stems.base64
            }

            if (
                form.files.tagged &&
                this.beat.tagged_file !== form.files.tagged.base64
            ) {
                params.tagged_file_name = form.files.tagged.name
                params.tagged_file = form.files.tagged.base64
            }

            if (
                form.files.untaggedMp3 &&
                this.beat.untagged_mp3 !== form.files.untaggedMp3.base64
            ) {
                params.untagged_mp3_name = form.files.untaggedMp3.name
                params.untagged_mp3 = form.files.untaggedMp3.base64
            }

            if (
                form.files.untaggedWav &&
                this.beat.untagged_wav !== form.files.untaggedWav.base64
            ) {
                params.untagged_wav_name = form.files.untaggedWav.name
                params.untagged_wav = form.files.untaggedWav.base64
            }

            const { status, message, error } = await this.$store.dispatch(
                'me/updateBeat',
                {
                    id: this.beat.id,
                    params,
                }
            )

            if (status === 'success') {
                this.$toast.success(message)
                this.$router.push({ name: 'accountBeats' })
            } else {
                this.$toast.error(error)
            }

            this.status = STATUS_IDLE
        },
    },
}
</script>
