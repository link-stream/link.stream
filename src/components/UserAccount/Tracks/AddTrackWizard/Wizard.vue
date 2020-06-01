<template>
    <div class="fwz">
        <WizardTabs
            v-show="stepIndex > 0"
            :tabs="tabs"
            :activeStepName="step"
            :activeStepIndex="stepIndex"
            @tab-click="handleTabClick"
        />

        <!-- STEP - TRACK TYPE -->
        <wizard-step v-show="isStepTrackType" class="step-track-type">
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
            class="step-track-info"
            :title="isSong ? 'Song info' : 'Beat info'"
        >
            <div class="step-sidebar">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.trackInfo.imageBase64"
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
                <div class="text-muted" v-if="!form.trackInfo.imageBase64">
                    Suggested Dimensions: 1000x1000
                </div>
            </div>
            <TrackInfoFormBlock class="step-main" no-track-type-field />
        </wizard-step>

        <!-- STEP - LICENSE TYPES -->
        <wizard-step
            title="License types"
            class="step-licenses"
            v-if="isStepLicenses"
        >
            <LicensesBlock />
        </wizard-step>

        <!-- STEP - UPLOAD FILES -->
        <wizard-step
            title="Upload files"
            subtitle="Add files to deliver when the license for this track is purchased"
            class="step-files"
            v-if="isStepFiles"
        >
            <FileUploadBlock />
        </wizard-step>

        <!-- STEP - MARKETING -->
        <wizard-step
            title="Free downloads"
            subtitle="Build your audience by allowing free MP3 downloads for social follows, email and SMS subscribes"
            class="step-marketing"
            v-if="isStepMarketing"
        >
            <MarketingBlock />
        </wizard-step>

        <!-- STEP - REVIEW -->
        <wizard-step
            :title="isSong ? 'Review song' : 'Review beat'"
            class="step-review"
            v-if="isStepReview"
        >
            <div class="step-sidebar">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.trackInfo.imageBase64"
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
            </div>
            <ReviewBlock class="step-main" />
        </wizard-step>

        <footer class="fwz-pager" v-show="stepIndex > 0">
            <ls-button variant="secondary" class="fwz-prev-btn" @click="prev">
                Back
            </ls-button>
            <ls-button class="fwz-next-btn" @click="handleNextClick">
                Next
            </ls-button>
        </footer>
    </div>
</template>

<script>
import WizardStep from './WizardStep'
import WizardTabs from './WizardTabs'
import TrackInfoFormBlock from './Block/TrackInfoFormBlock'
import LicensesBlock from './Block/LicensesBlock'
import FileUploadBlock from './Block/FileUploadBlock'
import MarketingBlock from './Block/MarketingBlock'
import ReviewBlock from './Block/ReviewBlock'
import { DropImage } from '~/components/Uploader'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'

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
        TrackInfoFormBlock,
        LicensesBlock,
        FileUploadBlock,
        MarketingBlock,
        ReviewBlock,
        DropImage,
    },
    data() {
        return {
            stepIndex: 0,
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            form: 'trackAddWizard/form',
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
            return (
                this.form.trackInfo.trackType === appConstants.tracks.types.song
            )
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
            trackInfo: {
                ...this.form.trackInfo,
                collabs: [
                    {
                        profitPercent: 100,
                        pubPercent: 100,
                        user: {
                            id: this.user.id,
                            name: this.user.user_name,
                            photo: this.user.photo,
                        },
                    },
                ],
            },
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
        handleTabClick(tab) {
            //this.goToStep(steps.indexOf(tab.step))
        },
        handleNextClick() {
            switch (this.step) {
                case STEP_TRACK_INFO:
                case STEP_FILES:
                case STEP_LICENSES:
                case STEP_MARKETING:
                    this.$bus.$emit(`wz.validateBlock.${this.step}`, {
                        onSuccess: this.next,
                    })
                    return
                default:
                    this.next()
            }
        },
        handleAddBeatClick() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackInfo: {
                    ...this.form.trackInfo,
                    trackType: appConstants.tracks.types.beat,
                },
            })
            this.next()
        },
        handleAddSongClick() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackInfo: {
                    ...this.form.trackInfo,
                    trackType: appConstants.tracks.types.song,
                },
            })
            this.next()
        },
        handleImageAdded(file) {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackInfo: {
                    ...this.form.trackInfo,
                    imageBase64: file.base64,
                },
            })
        },
        handleImageRemoved() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackInfo: {
                    ...this.form.trackInfo,
                    imageBase64: null,
                },
            })
        },
    },
}
</script>
