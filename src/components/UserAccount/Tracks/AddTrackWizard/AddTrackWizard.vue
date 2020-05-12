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
                <fieldset>
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
                            v-model="tagInput"
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

                    <div class="collabs">
                        <header class="c-row">
                            <div class="c-col">
                                Collaborator
                            </div>
                            <div class="c-col">
                                Profit %
                            </div>
                            <div class="c-col">
                                Publishing %
                            </div>
                            <div class="c-col"></div>
                        </header>
                        <ul>
                            <li
                                class="c-row"
                                v-for="(c, index) in form.trackInfo.collabs"
                                :key="c.id"
                            >
                                <div class="c-col">
                                    <div class="c-user">
                                        <img :src="c.user.photo" />
                                        {{ c.user.name }}
                                    </div>
                                </div>
                                <div class="c-col">
                                    <b-form-group>
                                        <b-form-input
                                            v-model="c.profitPercent"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="c-col">
                                    <b-form-group>
                                        <b-form-input
                                            v-model="c.pubPercent"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="c-col">
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
                </fieldset>
            </main>
        </wizard-step>

        <footer class="fwz-pager" v-show="stepIndex > 0">
            <ls-button variant="secondary" class="fwz-prev-btn" @click="prev">
                Back
            </ls-button>
            <ls-button class="fwz-next-btn" @click="next">Next</ls-button>
        </footer>

        <CollaboratorSearchModal
            v-if="showCollabSearchModal"
            @hidden="handleCollabSearchModalHidden"
            @user-selected="handleAddCollab"
        />
    </div>
</template>

<script>
import WizardStep from './WizardStep'
import WizardTabs from './WizardTabs'
import { DropImage } from '~/components/Uploader'
import { CollaboratorSearchModal } from '~/components/Modal'
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
        DropImage,
        CollaboratorSearchModal,
    },
    data() {
        const data = {
            stepIndex: 0,
            showCollabSearchModal: false,
            tagInput: '',
        }

        const form = {}
        form[STEP_TRACK_TYPE] = null
        form[STEP_TRACK_INFO] = {
            title: null,
            image: null,
            genre: null,
            tags: [],
            bpm: 0,
            collabs: [
                {
                    profitPercent: 100,
                    pubPercent: 100,
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
        }
        return { form }
    },
    computed: {
        ...mapGetters({ user: 'me/user', genres: 'common/genres' }),
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
            const exist = collabs.find(c => c.user.id == user.id)
            if (exist) {
                return
            }
            collabs.push({
                user,
                profitPercent: null,
                pubPercent: null,
            })
        },
    },
}
</script>
