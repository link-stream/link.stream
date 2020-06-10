<template>
    <div class="page page-ua-beat-edit">
        <LsSpinner v-if="loading" />
        <div class="page-content" v-else>
            <div class="page-nav">
                <ls-button
                    class="back-btn"
                    variant="text"
                    :to="{ name: 'userAccountBeats' }"
                >
                    <i class="LsIcon LsIcon-back"></i>
                    <span>Beats</span>
                </ls-button>
            </div>
            <header class="page-header">
                <div class="col-left">
                    <h1 class="page-title">Your beats</h1>
                    <div class="page-preview">
                        <span class="text-light">link.stream/</span>
                        <span>
                            {{ beat.url_user }}/beats/{{ beat.url_title }}
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
                        :to="{ name: 'userAccountBeats' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button
                        size="sm"
                        :loading="saving"
                        @click="handleSaveClick"
                    >
                        Save
                    </ls-spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="form-block">
                    <div class="col-left">
                        <!-- Info Card -->
                        <edit-card title="Beat Details" class="info-card">
                            <b-form-group label="Title">
                                <b-form-input
                                    placeholder="Enter a title"
                                    v-model="$v.form.title.$model"
                                    :state="!$v.form.title.$error"
                                ></b-form-input>
                                <b-form-invalid-feedback>
                                    Title can't be blank
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
                                <VueTagsInput
                                    v-model="tag"
                                    :tags="form.tags"
                                    @tags-changed="handleTagsChange"
                                />
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
                        </edit-card>

                        <!-- Files Card -->
                        <edit-card title="Files">
                            <DropAudio
                                title="Untagged .MP3"
                                :class="{
                                    'is-invalid':
                                        $v.form.files.untaggedMp3.$error,
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
                                    'is-invalid':
                                        $v.form.files.untaggedWav.$error,
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
                                :src="
                                    form.files.tagged &&
                                        form.files.tagged.base64
                                "
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
                                :src="
                                    form.files.stems && form.files.stems.base64
                                "
                                :filename="
                                    form.files.stems && form.files.stems.name
                                "
                                @file-added="handleStemsAdded"
                                @file-removed="handleStemsRemoved"
                            />
                        </edit-card>

                        <!-- Licenses Card -->
                        <edit-card title="Licensing">
                            <LicenseCard
                                v-for="license in userLicenses"
                                :license="license"
                                :key="license.id"
                                :checked="
                                    form.licenseIds.indexOf(license.id) > -1
                                "
                                @updated="handleLicenseUpdated"
                                @checked="handleLicenseChecked"
                                @unchecked="handleLicenseUnchecked"
                            />
                        </edit-card>

                        <!-- Beat Pack Card -->
                        <edit-card title="Add to Beat Pack">
                            <b-form-group>
                                <div class="search-box">
                                    <LsIcon class="search-icon" icon="search" />
                                    <b-form-input
                                        class="search-input"
                                        placeholder="Search for beat packs"
                                    ></b-form-input>
                                </div>
                            </b-form-group>
                        </edit-card>

                        <!-- Marketing Card -->
                        <edit-card
                            title="Free downloads"
                            class="marketing-card"
                        >
                            <div
                                class="custom-control custom-checkbox"
                                v-for="offer in freeDownloadOffers"
                                :key="offer.id"
                            >
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    v-model="form.freeDownloadOfferIds"
                                    :value="offer.id"
                                    :checked="
                                        form.freeDownloadOfferIds.indexOf(
                                            offer.id
                                        ) !== -1
                                    "
                                    :id="`fdCheck${offer.id}`"
                                />
                                <label
                                    class="custom-control-label"
                                    :for="`fdCheck${offer.id}`"
                                >
                                    {{ offer.title }}
                                </label>
                            </div>
                        </edit-card>

                        <!-- Collabs Card -->
                        <edit-card title="Collaborators">
                            <div class="collabs">
                                <ul>
                                    <li
                                        v-for="(collab, index) in $v.form
                                            .collabs.$each.$iter"
                                        :key="index"
                                    >
                                        <div class="cell user-cell">
                                            <div class="cell-title">
                                                Collaborator
                                            </div>
                                            <div class="user-profile">
                                                <UserAvatar
                                                    :user="collab.$model.user"
                                                />
                                                {{
                                                    collab.$model.user.name
                                                        | truncate(14)
                                                }}
                                                {{
                                                    collab.$model.user.id ==
                                                    user.id
                                                        ? '(you)'
                                                        : ''
                                                }}
                                            </div>
                                        </div>
                                        <div class="cell profit-cell">
                                            <div class="cell-title">
                                                Profit %
                                            </div>
                                            <b-form-group>
                                                <b-form-input
                                                    type="number"
                                                    v-model="
                                                        collab.profit.$model
                                                    "
                                                    :state="
                                                        !collab.profit.$error
                                                    "
                                                ></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="cell pub-cell">
                                            <div class="cell-title">
                                                Publishing %
                                            </div>
                                            <b-form-group>
                                                <b-form-input
                                                    type="number"
                                                    v-model="
                                                        collab.publishing.$model
                                                    "
                                                    :state="
                                                        !collab.publishing
                                                            .$error
                                                    "
                                                ></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="cell remove-cell">
                                            <LsIconButton
                                                icon="close"
                                                class="remove-icon"
                                                v-if="index > 0"
                                                @click="
                                                    handleCollabRemoveClick(
                                                        index
                                                    )
                                                "
                                            />
                                            <ls-button
                                                variant="link"
                                                class="remove-btn"
                                                v-if="index > 0"
                                                @click="
                                                    handleCollabRemoveClick(
                                                        index
                                                    )
                                                "
                                            >
                                                Remove Collaborator
                                            </ls-button>
                                        </div>
                                    </li>
                                </ul>
                                <ls-button
                                    variant="text"
                                    class="add-btn"
                                    @click="showCollabSearchModal"
                                >
                                    <LsIcon icon="plus" />
                                    Add Collaborator
                                </ls-button>
                            </div>
                        </edit-card>
                    </div>
                    <div class="col-right">
                        <!-- Visibility Card -->
                        <div class="Card EditCard vis-card">
                            <div class="row-title">
                                <h4 class="Card-title">
                                    Visibility
                                </h4>
                                <div>
                                    <small>
                                        {{
                                            form.isPublic ? 'Public' : 'Private'
                                        }}
                                    </small>
                                    <LsToggleButton v-model="form.isPublic" />
                                </div>
                            </div>
                            <div>
                                <b-form-group
                                    v-show="form.scheduled"
                                    label="Set Release Date"
                                >
                                    <b-input-group class="dt-input-group">
                                        <LsDatePicker v-model="form.date" />
                                        <LsTimePicker v-model="form.time" />
                                    </b-input-group>
                                    <b-form-invalid-feedback
                                        :state="
                                            !(
                                                $v.form.date.$error ||
                                                $v.form.time.$error
                                            )
                                        "
                                    >
                                        Select date and time
                                    </b-form-invalid-feedback>
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
                        </div>

                        <!-- Image Card -->
                        <div class="Card EditCard">
                            <DropImage
                                msgLong="Drag artwork here or<br><u>browse for file</u>"
                                :src="form.coverArtBase64"
                                @file-added="handleImageAdded"
                                @file-removed="handleImageRemoved"
                            />
                        </div>
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
                        :to="{ name: 'userAccountBeats' }"
                    >
                        Cancel
                    </ls-button>
                    <ls-spinner-button
                        size="sm"
                        :loading="saving"
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
import { EditCard } from '~/components/UserAccount/Tracks/Beats/Edit'
import { LicenseCard } from '~/components/UserAccount/Tracks/AddTrackWizard'
import { DropAudio, DropFile, DropImage } from '~/components/Uploader'
import { UserInviteModal, UserSearchModal } from '~/components/Modal'
import { api } from '~/services/api'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { required, requiredIf } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
    name: 'BeatEdit',
    components: {
        EditCard,
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
            loading: false,
            saving: false,
            beat: {},
            form: {},
            userLicenses: [],
            freeDownloadOffers: [...appConstants.marketingOptions],
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
        }),
        selectedLicenses() {
            return this.userLicenses.filter(
                ({ id }) => this.form.licenseIds.indexOf(id) !== -1
            )
        },
        selectedFreeDownloadOffers() {
            return this.freeDownloadOffers.filter(
                ({ id }) => this.form.freeDownloadOfferIds.indexOf(id) !== -1
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
                title: {
                    required,
                },
                time: {
                    required: requiredIf(function() {
                        return this.form.scheduled
                    }),
                },
                date: {
                    required: requiredIf(function() {
                        return this.form.scheduled
                    }),
                },
                collabs: {
                    $each: {
                        profit: {
                            required,
                        },
                        publishing: {
                            required,
                        },
                    },
                },
            },
        }
    },
    mounted() {
        this.$bus.$on('modal.userSearch.userSelected', this.handleCollabAdd)
    },
    async created() {
        this.loading = true

        const beatId = this.$route.params.id
        const beatResponse = await api.audios.getBeat(beatId, this.user.id)
        let beat = null

        if (beatResponse.status === 'success' && beatResponse.data.length) {
            beat = beatResponse.data[0]
        } else {
            this.$router.push({ name: 'userAccountBeats' })
            this.$toast.error('Beat not found.')
            return
        }

        await this.$store.dispatch('common/loadGenres')
        await this.$store.dispatch('common/loadAudioKeys')
        await this.$store.dispatch('me/loadLicenses')

        const userLicenses = this.$store.getters['me/licenses']

        if (!userLicenses.length) {
            this.$router.push({ name: 'userAccountBeats' })
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
            date: beat.scheduled ? new Date(beat.date + ' 00:00:00') : null,
            time: beat.scheduled ? beat.time : null,
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

            freeDownloadOfferIds: Array.isArray(beat.marketing)
                ? beat.marketing.map(({ marketing_id }) => marketing_id)
                : [],

            licenseIds: Array.isArray(beat.licenses)
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
        this.loading = false
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
        handleCollabRemoveClick(index) {
            this.form.collabs.splice(index, 1)
        },
        handleCollabAdd(user) {
            const { collabs } = this.form
            const alreadyAdded = collabs.find(c => c.user.id == user.id)
            if (alreadyAdded) {
                return
            }
            collabs.push({
                user,
                profit: null,
                publishing: null,
            })
        },
        handleLicenseChecked(license) {
            const index = this.form.licenseIds.indexOf(license.id)
            index === -1 && this.form.licenseIds.push(license.id)
        },
        handleLicenseUnchecked(license) {
            const index = this.form.licenseIds.indexOf(license.id)
            this.form.licenseIds.splice(index, 1)
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
                        this.$router.push({ name: 'userAccountBeats' })
                        this.$toast.success(message)
                    } else {
                        this.$toast.error(error)
                    }
                },
            })
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (this.$v.form.title.$invalid) {
                this.$toast.error('Please enter a title.')
                return
            }

            if (!this.form.licenseIds.length) {
                this.$toast.error('Please select at least one license.')
                return
            }

            if (this.$v.form.files.$invalid) {
                this.$toast.error('Please add required files.')
                return
            }

            if (this.$v.form.collabs.$invalid) {
                this.$toast.error('Please enter collaborator revenue shares.')
                return
            }

            if (this.$v.form.date.$invalid || this.$v.form.time.$invalid) {
                this.$toast.error('Please select schedule date and time.')
                return
            }

            this.saving = true

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

            const selectedOffers = this.selectedFreeDownloadOffers.map(
                ({ id }) => {
                    return {
                        marketing_id: id,
                        connect_id: '',
                    }
                }
            )

            if (selectedOffers.length) {
                params.marketing = JSON.stringify(selectedOffers)
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
                this.$router.push({ name: 'userAccountBeats' })
            } else {
                this.$toast.error(error)
            }

            this.saving = false
        },
    },
}
</script>
