<template>
    <div class="fwz" :class="`--step-${step}`">
        <div class="fwz-counter">Step {{ stepIndex }} / {{ numSteps - 1 }}</div>
        <WizardTabs
            v-show="stepIndex > 0"
            :tabs="tabs"
            :activeStepName="step"
            :activeStepIndex="stepIndex"
        />

        <!-- STEP - TRACK TYPE -->
        <wizard-step v-show="isStepTrackType" class="step-trackType">
            <div class="Card">
                <LsIcon icon="beat" />
                <h2 class="Card-title">Upload a Beat</h2>
                <div class="Card-text">
                    Generally short music tracks created
                    <br />
                    by producers. Usually intended to be
                    <br />
                    licensed by recording artists and
                    <br />
                    songwriters for use in commercially
                    <br />
                    released songs. Beats can be sold
                    <br />
                    individually or as part of a beat pack.
                </div>
                <ls-button @click="handleAddBeatClick">Get Started</ls-button>
            </div>
            <div class="Card">
                <LsIcon icon="song" />
                <h2 class="Card-title">Upload a Song</h2>
                <div class="Card-text">
                    Commonly released by recording
                    <br />
                    artists and songwriters and are
                    <br />
                    considered a finished musical
                    <br />
                    product intended for commercial
                    <br />
                    release. Songs can be single releases
                    <br />
                    or part of an album or playlist.
                </div>
                <ls-button @click="handleAddSongClick">Get Started</ls-button>
            </div>
        </wizard-step>

        <!-- STEP - TRACK INFO -->
        <wizard-step
            v-if="isStepTrackInfo"
            class="step-trackInfo"
            :title="isSong ? 'Song info' : 'Beat info'"
        >
            <div class="col-image">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.coverArtBase64"
                    @file-added="handleImageAdded"
                    @file-removed="handleImageRemoved"
                />
                <div class="text-muted" v-if="!form.coverArtBase64">
                    Suggested Dimensions: 1000x1000
                </div>
            </div>
            <InfoBlock class="col-fields" no-track-type-field />
        </wizard-step>

        <!-- STEP - LICENSE TYPES -->
        <wizard-step
            v-if="isStepLicenses"
            title="License types"
            class="step-licenses"
        >
            <LicensesBlock />
        </wizard-step>

        <!-- STEP - UPLOAD FILES -->
        <wizard-step
            v-if="isStepFiles"
            title="Upload files"
            subtitle="Add files to deliver when the license for this track is purchased"
            class="step-files"
        >
            <FilesBlock />
        </wizard-step>

        <!-- STEP - MARKETING -->
        <wizard-step
            v-if="isStepMarketing"
            title="Free downloads"
            subtitle="Build your audience by allowing free MP3 downloads for social follows, email and SMS subscribes"
            class="step-marketing"
        >
            <MarketingBlock />
        </wizard-step>

        <!-- STEP - REVIEW -->
        <wizard-step
            v-if="isStepReview"
            :title="isSong ? 'Review song' : 'Review beat'"
            class="step-review"
        >
            <div class="col-image">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.coverArtBase64"
                    @file-added="handleImageAdded"
                    @file-removed="handleImageRemoved"
                />
            </div>
            <ReviewBlock class="col-summary" />
        </wizard-step>

        <footer class="fwz-pager" v-show="stepIndex > 0">
            <ls-button variant="secondary" class="fwz-prev-btn" @click="prev">
                Back
            </ls-button>
            <ls-spinner-button
                class="fwz-next-btn"
                :loading="saving"
                @click="handleNextClick"
            >
                {{ isStepReview ? 'Save' : 'Next' }}
            </ls-spinner-button>
        </footer>
    </div>
</template>

<script>
import WizardStep from './WizardStep'
import WizardTabs from './WizardTabs'
import InfoBlock from './Block/InfoBlock'
import LicensesBlock from './Block/LicensesBlock'
import FilesBlock from './Block/FilesBlock'
import MarketingBlock from './Block/MarketingBlock'
import ReviewBlock from './Block/ReviewBlock'
import { DropImage } from '~/components/Uploader'
import { appConstants } from '~/constants'
import { api } from '~/services/api'
import { mapGetters } from 'vuex'
import moment from 'moment'

const STEP_TRACK_TYPE = 'trackType'
const STEP_TRACK_INFO = 'trackInfo'
const STEP_LICENSES = 'licenses'
const STEP_FILES = 'files'
const STEP_MARKETING = 'marketing'
const STEP_REVIEW = 'review'

const steps = [
    STEP_TRACK_TYPE,
    STEP_TRACK_INFO,
    STEP_LICENSES,
    STEP_FILES,
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
        step: STEP_FILES,
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
        InfoBlock,
        LicensesBlock,
        FilesBlock,
        MarketingBlock,
        ReviewBlock,
        DropImage,
    },
    data() {
        return {
            stepIndex: 0,
            saving: false,
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            form: 'trackAddWizard/form',
            isSong: 'trackAddWizard/isSong',
            tags: 'trackAddWizard/tags',
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
        isStepTrackType() {
            return this.step === STEP_TRACK_TYPE
        },
        isStepTrackInfo() {
            return this.step === STEP_TRACK_INFO
        },
        isStepLicenses() {
            return this.step === STEP_LICENSES
        },
        isStepFiles() {
            return this.step === STEP_FILES
        },
        isStepMarketing() {
            return this.step === STEP_MARKETING
        },
        isStepReview() {
            return this.step === STEP_REVIEW
        },
    },
    beforeMount() {
        this.$store.dispatch('trackAddWizard/updateForm', {
            collabs: [
                {
                    profit: 100,
                    publishing: 100,
                    user: {
                        id: this.user.id,
                        name: this.user.user_name,
                        photo: this.user.photo,
                    },
                },
            ],
        })
    },
    methods: {
        goToStep(index) {
            this.stepIndex = index
        },
        next() {
            if (this.stepIndex < this.numSteps - 1) {
                this.goToStep(this.stepIndex + 1)
            }
        },
        prev() {
            if (this.stepIndex > 0) {
                this.goToStep(this.stepIndex - 1)
            }
        },
        async save() {
            this.saving = true

            const form = this.form

            const params = {
                user_id: this.user.id,
                track_type: form.trackType,
                title: form.title,
                bpm: form.bpm,
                key: form.key ? form.key.id : '',
                image: form.coverArtBase64,
                genre_id: form.genre ? form.genre.id : '',
                tags: form.tags.map(({ text }) => text).join(', '),
                public: form.isPublic ? 1 : 2,
                scheduled: false,
            }

            if (form.scheduled) {
                params.date = moment(form.date).format('YYYY-MM-DD')
                params.time = form.time
            }

            const marketing = form.selectedPromos.map(({ id }) => {
                return {
                    marketing_id: id,
                    connect_id: '',
                }
            })

            if (marketing.length) {
                params.marketing = JSON.stringify(marketing)
            }

            const collabs = form.collabs.map(({ user, profit, publishing }) => {
                return {
                    user_id: user.id,
                    profit: profit,
                    publishing: publishing,
                }
            })

            if (collabs.length) {
                params.collaborators = JSON.stringify(collabs)
            }

            const licenses = form.selectedLicenses.map(
                ({ id, price, status_id }) => {
                    return {
                        license_id: id,
                        price,
                        status_id,
                    }
                }
            )

            if (licenses.length) {
                params.licenses = JSON.stringify(licenses)
            }

            if (form.files.untagged) {
                params.untagged_file = form.files.untagged.base64
            }

            if (form.files.tagged) {
                params.tagged_file = form.files.tagged.base64
            }

            if (form.files.stems) {
                params.track_stems = form.files.stems.base64
            }

            const { status, message, error } = await api.audios.createAudio(
                params
            )

            if (status === 'success') {
                this.$toast.success(message)
                this.$router.push({ name: 'userAccountBeats' })
                this.$store.dispatch('trackAddWizard/reset')
            } else {
                this.$toast.error(error)
            }

            this.saving = false
        },
        handleNextClick() {
            switch (this.step) {
                case STEP_TRACK_INFO:
                case STEP_LICENSES:
                case STEP_FILES:
                case STEP_MARKETING:
                    this.$bus.$emit(`wz.validateBlock.${this.step}`, {
                        onSuccess: this.next,
                    })
                    return
                case STEP_REVIEW:
                    this.$bus.$emit(`wz.validateBlock.${this.step}`, {
                        onSuccess: this.save,
                    })
                    return
                default:
                    this.next()
            }
        },
        handleAddBeatClick() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackType: appConstants.tracks.types.beat,
            })
            this.next()
        },
        handleAddSongClick() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackType: appConstants.tracks.types.song,
            })
            this.next()
        },
        handleImageAdded(file) {
            this.$store.dispatch('trackAddWizard/updateForm', {
                coverArtBase64: file.base64,
            })
        },
        handleImageRemoved() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                coverArtBase64: null,
            })
        },
    },
}
</script>
