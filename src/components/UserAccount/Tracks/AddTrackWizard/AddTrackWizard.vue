<template>
    <div class="fwz">
        <WizardTabs v-show="stepIndex > 0" :tabs="tabs" :activeStep="step" />

        <!-- STEP - TRACK TYPE -->
        <wizard-step v-show="isStepTrackType" title="Select Track Type">
            <ls-button @click="handleAddBeatClick">Add a Beat</ls-button>
            <ls-button @click="handleAddSongClick">Add a Song</ls-button>
        </wizard-step>

        <!-- STEP - TRACK INFO -->
        <wizard-step
            v-show="isStepTrackInfo"
            :title="isSong ? 'Song info' : 'Beat info'"
        >
            <aside>
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    @image-added="handleImageAdded"
                    @image-removed="handleImageRemoved"
                />
            </aside>
            <main>
                <div class="step-fields">
                    <b-form-group
                        :label="isSong ? 'Song Title*' : 'Beat Title*'"
                        label-for="titleInput"
                    >
                        <b-form-input
                            id="titleInput"
                            placeholder="Enter a title"
                            v-model="$v.form.trackInfo.title.$model"
                            :state="!$v.form.trackInfo.title.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            Enter a title
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Primary Genre" label-for="genreInput">
                        <LsSelect
                            v-model="form.trackInfo.genre"
                            id="genreInput"
                            placeholder="Select Genre"
                            :options="genres"
                            :reduce="genre => genre.id"
                            label="genre"
                        />
                    </b-form-group>

                    <b-form-group label="Tags(3)">
                        <VueTagsInput
                            :placeholder="
                                form.trackInfo.tags.length ? '' : 'Tags'
                            "
                            v-model="tag"
                            @tags-changed="handleTagsChanged"
                        />
                    </b-form-group>

                    <b-form-row>
                        <b-col md="6">
                            <b-form-group label="BPM" label-for="bpmInput">
                                <b-form-input
                                    id="bpmInput"
                                    v-model="form.trackInfo.bpm"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Key" label-for="keyInput">
                                <LsSelect
                                    v-model="form.trackInfo.genre"
                                    id="keyInput"
                                    placeholder="Select"
                                    :options="[]"
                                    :reduce="key => key.id"
                                    label="text"
                                />
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <div class="collabs-table">
                        <header class="t-row">
                            <div class="t-col">
                                Collaborator
                            </div>
                            <div class="t-col">
                                Profit %
                            </div>
                            <div class="t-col">
                                Publishing %
                            </div>
                            <div class="t-col"></div>
                        </header>
                        <ul>
                            <li
                                class="t-row"
                                v-for="(collab, index) in $v.form.trackInfo
                                    .collabs.$each.$iter"
                                :key="collab.id"
                            >
                                <div class="t-col">
                                    <div class="user-profile">
                                        <UserAvatar
                                            :username="collab.$model.user.name"
                                            :src="collab.$model.user.photo"
                                        />
                                        {{ collab.$model.user.name }}
                                    </div>
                                </div>
                                <div class="t-col">
                                    <b-form-group>
                                        <b-form-input
                                            v-model="collab.profitPct.$model"
                                            :state="!collab.profitPct.$error"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="t-col">
                                    <b-form-group>
                                        <b-form-input
                                            v-model="collab.pubPct.$model"
                                            :state="!collab.pubPct.$error"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="t-col">
                                    <LsIconButton
                                        icon="close"
                                        v-if="index > 0"
                                        @click="removeCollab(index)"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ls-button
                        variant="link"
                        @click="showCollabSearchModal = true"
                    >
                        Add Collaborator
                    </ls-button>
                </div>
            </main>
        </wizard-step>

        <!-- STEP - LICENSE TYPES -->
        <wizard-step
            title="License types"
            class="step-licenses"
            v-show="isStepLicenses"
        >
            <LicenseCard
                v-for="license in licenses"
                :license="license"
                :key="license.id"
            />
        </wizard-step>

        <!-- STEP - UPLOAD -->
        <wizard-step
            title="Upload files"
            class="step-upload"
            v-show="isStepUpload"
        >
            <DropAudio title="Untagged .WAV (or .MP3)" />
            <DropFile
                title="Track Stems .ZIP (or .RAR)"
                acceptTypes=".zip,.rar"
            />
            <DropAudio title="Tagged Streaming File (.MP3 or .WAV)" />
        </wizard-step>

        <footer class="fwz-pager" v-show="stepIndex > 0">
            <ls-button variant="secondary" class="fwz-prev-btn" @click="prev">
                Back
            </ls-button>
            <ls-button class="fwz-next-btn" @click="next">Next</ls-button>
        </footer>

        <UserSearchModal
            v-if="showCollabSearchModal"
            @hidden="handleCollabSearchModalHidden"
            @user-selected="handleAddCollab"
        />
        <UserInviteModal />
    </div>
</template>

<script>
import WizardStep from './WizardStep'
import WizardTabs from './WizardTabs'
import LicenseCard from './LicenseCard'
import { DropImage, DropAudio, DropFile } from '~/components/Uploader'
import { UserSearchModal, UserInviteModal } from '~/components/Modal'
import { appConstants } from '~/constants'
import { required, minLength } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

const STEP_TRACK_TYPE = 'trackType'
const STEP_TRACK_INFO = 'trackInfo'
const STEP_LICENSES = 'licenses'
const STEP_UPLOAD = 'upload'
const STEP_MARKETING = 'marketing'
const STEP_REVIEW = 'review'

const steps = [
    STEP_TRACK_TYPE,
    STEP_TRACK_INFO,
    STEP_LICENSES,
    STEP_UPLOAD,
    STEP_MARKETING,
    STEP_REVIEW,
]

const tabs = [
    {
        text: 'Beat Info',
        step: STEP_TRACK_INFO,
    },
    {
        text: 'Licenses',
        step: STEP_LICENSES,
    },
    {
        text: 'Upload Files',
        step: STEP_UPLOAD,
    },
    {
        text: 'Marketing',
        step: STEP_MARKETING,
    },
    {
        text: 'Review',
        step: STEP_REVIEW,
    },
]

export default {
    name: 'AddTrackWizard',
    components: {
        WizardTabs,
        WizardStep,
        LicenseCard,
        DropImage,
        DropAudio,
        DropFile,
        UserSearchModal,
        UserInviteModal,
    },
    data() {
        const data = {
            stepIndex: 3,
            showCollabSearchModal: false,
            tag: '',
        }

        const form = {}
        form[STEP_TRACK_TYPE] = null
        form[STEP_TRACK_INFO] = {
            title: 'test',
            image: null,
            genre: null,
            tags: [],
            bpm: 0,
            collabs: [
                {
                    profitPct: 100,
                    pubPct: 100,
                    user: {
                        id: null,
                        name: null,
                        photo: null,
                    },
                },
            ],
        }

        return {
            ...data,
            form,
        }
    },
    validations() {
        const form = {}
        form[STEP_TRACK_INFO] = {
            title: {
                required,
            },
            collabs: {
                $each: {
                    profitPct: {
                        required,
                    },
                    pubPct: {
                        required,
                    },
                },
            },
        }
        return { form }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            licenses: 'me/licenses',
        }),
        step() {
            return steps[this.stepIndex]
        },
        numSteps() {
            return steps.length
        },
        tabs() {
            tabs[0].text = this.isSong ? 'Song info' : 'Beat info'
            return tabs
        },
        isSong() {
            return this.form.trackType === appConstants.tracks.types.song
        },
        isStepTrackType() {
            return this.step === STEP_TRACK_TYPE
        },
        isStepTrackInfo() {
            return this.step === STEP_TRACK_INFO
        },
        isStepLicenses() {
            return this.step === STEP_LICENSES
        },
        isStepUpload() {
            return this.step === STEP_UPLOAD
        },
        isStepMarketing() {
            return this.step === STEP_MARKETING
        },
        isStepReview() {
            return this.step === STEP_REVIEW
        },
    },
    beforeMount() {
        this.form.trackInfo.collabs[0].user = {
            id: this.user.id,
            name: this.user.user_name + ' (you)',
            photo: this.user.photo,
        }
    },
    methods: {
        next() {
            if (this.$v.form[this.step]) {
                this.$v.form[this.step].$touch()
                if (this.$v.form[this.step].$invalid) {
                    return
                }
            }

            if (this.stepIndex < this.numSteps - 1) {
                this.stepIndex++
            }
        },
        prev() {
            if (this.stepIndex > 0) {
                this.stepIndex--
            }
        },
        /* STEP - TRACK TYPE */
        handleAddBeatClick() {
            this.form.trackType = appConstants.tracks.types.beat
            this.next()
        },
        handleAddSongClick() {
            this.form.trackType = appConstants.tracks.types.song
            this.next()
        },
        /* STEP - TRACK INFO */
        removeCollab(index) {
            this.form.trackInfo.collabs.splice(index, 1)
        },
        handleImageAdded(image) {
            this.form.trackInfo.image = image.base64
        },
        handleImageRemoved(image) {
            this.form.trackInfo.image = null
        },
        handleTagsChanged(tags) {
            this.form.trackInfo.tags = tags.map(tag => tag.text)
        },
        handleCollabSearchModalHidden() {
            this.showCollabSearchModal = false
        },
        handleAddCollab(user) {
            const collabs = this.form.trackInfo.collabs
            const exist = collabs.find(collab => collab.user.id == user.id)
            if (exist) {
                return
            }
            collabs.push({
                user,
                profitPct: null,
                pubPct: null,
            })
        },
    },
}
</script>
