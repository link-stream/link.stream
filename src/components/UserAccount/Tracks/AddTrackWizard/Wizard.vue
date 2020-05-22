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
            <div class="step-side">
                <DropImage
                    msgLong="Drag artwork here or<br><u>browse for file</u>"
                    :src="form.imageBase64"
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
            </div>
            <TrackInfoPane
                class="step-main"
                :track-type="form.trackType"
                :track-info="form.trackInfo"
            />
        </wizard-step>

        <!-- STEP - LICENSE TYPES -->
        <wizard-step
            title="License types"
            class="licenses-step"
            v-show="isStepLicenses"
        >
            <LicensesPane :initial-selected="form.licenses" />
        </wizard-step>

        <!-- STEP - UPLOAD FILES -->
        <wizard-step
            title="Upload files"
            class="files-step"
            v-show="isStepFiles"
        >
            <FilesPane />
        </wizard-step>

        <!-- STEP - MARKETING -->
        <wizard-step title="Marketing" v-show="isStepMarketing">
            <MarketingPane :initial-selected="form.marketing" />
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
            <ReviewPane class="step-main" :summary="form" />
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
    TrackInfoPane,
    LicensesPane,
    FilesPane,
    MarketingPane,
    ReviewPane,
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
        TrackInfoPane,
        LicensesPane,
        FilesPane,
        MarketingPane,
        ReviewPane,
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
                files: {
                    tagged: null,
                    untagged: null,
                    stems: null,
                },
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
        this.$eventBus.$on('wz.updateForm', this.handleUpdateForm)
        this.$eventBus.$on('wz.goToNext', this.next)
    },
    methods: {
        next() {
            if (this.stepIndex < this.numSteps - 1) {
                this.stepIndex++
            }
        },
        prev() {
            if (this.stepIndex > 0) {
                this.stepIndex--
            }
        },
        handleUpdateForm(value) {
            this.form = {
                ...this.form,
                ...value,
            }
        },
        handleNextClick() {
            switch (this.step) {
                case STEP_TRACK_INFO:
                case STEP_FILES:
                case STEP_LICENSES:
                case STEP_MARKETING:
                    this.$eventBus.$emit('wz.nextClick', {
                        currentStep: this.step,
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
