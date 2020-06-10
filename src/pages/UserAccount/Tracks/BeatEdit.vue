<template>
    <div class="page page-ua-beat-edit">
        <LsSpinner v-if="loading" />
        <div v-else>
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
                        <span>{{ user.user_name }}/beats/</span>
                        <preview-pill-button
                            :to="{
                                name: 'userBeats',
                                params: { username: user.user_name },
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
                    <ls-spinner-button size="sm">
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
                                    v-model="form.title"
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
                                v-for="license in allLicenses"
                                :license="license"
                                :key="license.id"
                                :checked="
                                    form.selectedLicenseIds.indexOf(
                                        license.id
                                    ) > -1
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
                        <edit-card title="Free downloads" class="MarketingCard">
                            <div
                                class="custom-control custom-checkbox"
                                v-for="offer in allOffers"
                                :key="offer.id"
                            >
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    :checked="
                                        form.selectedOfferIds.indexOf(
                                            offer.id
                                        ) !== -1
                                    "
                                    :id="`marketingCheck${offer.id}`"
                                />
                                <label
                                    class="custom-control-label"
                                    :for="`marketingCheck${offer.id}`"
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
                                        :key="collab.id"
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
                                                {{ index == 0 ? '(you)' : '' }}
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
                                                class="remove-ibtn"
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
                                <h4 class="Card-title EditCard-title">
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
                                    <div
                                        class="invalid-feedback"
                                        v-show="$v.form.$error"
                                    >
                                        Select date and time
                                    </div>
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
            beat: null,
            form: {},
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
            allLicenses: 'trackAddWizard/allLicenses',
            allOffers: 'trackAddWizard/allOffers',
        }),
    },
    validations() {
        return {
            form: {
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
                files: {
                    stems: {},
                    untaggedMp3: {},
                    untaggedWav: {},
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

        const id = this.$route.params.id
        const { status, data } = await api.audios.getBeat(id, this.user.id)

        if (!(status === 'success' && data.length)) {
            this.$router.push({ name: 'userAccountBeats' })
            this.$toast.error('Beat not found.')
            return
        }

        await this.$store.dispatch('trackAddWizard/loadWizard')

        const { allLicenses } = this.$store.state.trackAddWizard
        const beat = data[0]
        // Merge beat licenses into license options
        beat.licenses.forEach(({ license_id, price }) => {
            const license = allLicenses.find(
                license => license.id == license_id
            )
            if (license) {
                this.$store.dispatch('trackAddWizard/updateLicense', {
                    ...license,
                    price,
                })
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
                    ? { base64: beat.data_track_stems }
                    : null,
                tagged: beat.data_tagged_file
                    ? { base64: beat.data_tagged_file }
                    : null,
                untaggedMp3: beat.data_untagged_mp3
                    ? { base64: beat.data_untagged_mp3 }
                    : null,
                untaggedWav: beat.data_untagged_wav
                    ? { base64: beat.data_untagged_wav }
                    : null,
            },

            selectedOfferIds: Array.isArray(beat.marketing)
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
            const index = this.form.selectedLicenseIds.indexOf(license.id)
            index === -1 && this.form.selectedLicenseIds.push(license)
        },
        handleLicenseUnchecked(license) {
            const index = this.form.selectedLicenseIds.indexOf(license.id)
            this.form.selectedLicenseIds.splice(index, 1)
        },
        handleLicenseUpdated(license) {
            this.$store.dispatch('trackAddWizard/updateLicense', license)
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
    },
}
</script>
