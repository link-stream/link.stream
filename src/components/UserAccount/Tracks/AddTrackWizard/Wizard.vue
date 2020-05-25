<template>
    <div class="fwz">
        <WizardTabs
            v-show="stepIndex > 0"
            :tabs="tabs"
            :activeStep="step"
            @tab-click="handleTabClick"
        />

        <!-- STEP - TRACK TYPE -->
        <wizard-step v-show="isStepTrackType" class="step-track-type">
            <div class="crd">
                <LsIcon icon="beat" />
                <h2 class="crd-title">Upload a Beat</h2>
                <div class="crd-text">
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
            <div class="crd">
                <LsIcon icon="song" />
                <h2 class="crd-title">Upload a Song</h2>
                <div class="crd-text">
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
            v-show="isStepTrackInfo"
            :title="isSong ? 'Song info' : 'Beat info'"
        >
            <div class="step-side">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.imageBase64"
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
            </div>
            <TrackInfoFormBlock
                class="step-main"
                :active="isStepTrackInfo"
                :track-type="form.trackType"
                :track-info="form.trackInfo"
            />
        </wizard-step>

        <!-- STEP - LICENSE TYPES -->
        <wizard-step
            title="License types"
            class="step-licenses"
            v-show="isStepLicenses"
        >
            <LicensesBlock
                :active="isStepLicenses"
                :initial-selected="form.licenses"
            />
        </wizard-step>

        <!-- STEP - UPLOAD FILES -->
        <wizard-step
            title="Upload files"
            class="step-files"
            v-show="isStepFiles"
        >
            <FileUploadBlock
                :active="isStepFiles"
                :initial-files="form.files"
            />
        </wizard-step>

        <!-- STEP - MARKETING -->
        <wizard-step title="Marketing" v-show="isStepMarketing">
            <MarketingBlock
                :active="isStepMarketing"
                :initial-selected="form.marketing"
            />
        </wizard-step>

        <!-- STEP - REVIEW -->
        <wizard-step
            :title="isSong ? 'Review song' : 'Review beat'"
            v-show="isStepReview"
        >
            <div class="step-side">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.imageBase64"
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
            </div>
            <ReviewBlock class="step-main" :summary="form" />
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
import {
    WizardStep,
    WizardTabs,
    TrackInfoFormBlock,
    LicensesBlock,
    FileUploadBlock,
    MarketingBlock,
    ReviewBlock,
} from './'
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
            form: {
                imageBase64: null,
                trackType: null,
                trackInfo: null,
                licenses: [],
                marketing: [],
                files: {},
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
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
    created() {
        this.$bus.$on('wz.updateForm', this.handleUpdateForm)
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
            this.goToStep(steps.indexOf(tab.step))
        },
        handleUpdateForm(value) {
            this.form = {
                ...this.form,
                ...value,
            }
            console.log(value)
        },
        handleNextClick() {
            switch (this.step) {
                case STEP_TRACK_INFO:
                case STEP_FILES:
                case STEP_LICENSES:
                case STEP_MARKETING:
                    this.$bus.$emit(`wz.validate.${this.step}`, {
                        onSuccess: this.next,
                    })
                    return
                default:
                    this.next()
            }
        },
        handleAddBeatClick() {
            this.form.trackType = appConstants.tracks.types.beat
            this.next()
        },
        handleAddSongClick() {
            this.form.trackType = appConstants.tracks.types.song
            this.next()
        },
        handleImageAdded(file) {
            this.form.imageBase64 = file.base64
        },
        handleImageRemoved() {
            this.form.imageBase64 = null
        },
    },
}
</script>
