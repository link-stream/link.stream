<template>
    <div>
        <span v-for="(step, k) in stepsWithTabs" :key="k">
            <span :class="{ 'font-weight-bold': step.name === curStep.name }">
                {{ k + 1 }}. {{ step.tab }}&nbsp;
            </span>
        </span>

        <div class="my-5">
            <keep-alive>
                <component :is="curStep.name"></component>
            </keep-alive>
        </div>

        <basic-button @click="prev">Prev</basic-button>
        <basic-button @click="next">Next</basic-button>
    </div>
</template>

<script>
import StepTrackType from './Steps/TrackType'
import StepTrackInfo from './Steps/TrackInfo'
import StepLicense from './Steps/License'
import StepUpload from './Steps/Upload'
import StepMarketing from './Steps/Marketing'
import StepReview from './Steps/Review'

import { BasicButton } from '~/components/Button'

export default {
    name: 'AddTrackWizard',
    components: {
        BasicButton,
        StepTrackType,
        StepTrackInfo,
        StepLicense,
        StepUpload,
        StepMarketing,
        StepReview,
    },
    data() {
        return {
            curStepIndex: 0,
            steps: [
                {
                    name: 'StepTrackType',
                    tab: 'Beat Type',
                },
                {
                    name: 'StepTrackInfo',
                    tab: 'Beat Info',
                },
                {
                    name: 'StepLicense',
                    tab: 'Licenses',
                },
                {
                    name: 'StepUpload',
                    tab: 'Upload Files',
                },
                {
                    name: 'StepMarketing',
                    tab: 'Marketing',
                },
                {
                    name: 'StepReview',
                    tab: 'Review',
                },
            ],
        }
    },
    computed: {
        stepsWithTabs() {
            return this.steps.filter(step => {
                return step.tab !== false
            })
        },
        curStep() {
            return this.steps[this.curStepIndex]
        },
        curStepNum() {
            return 1 + this.curStepIndex
        },
        numSteps() {
            return this.steps.length
        },
    },
    methods: {
        next() {
            if (this.curStepNum < this.numSteps) {
                this.curStepIndex++
            }
        },
        prev() {
            if (this.curStepNum > 1) {
                this.curStepIndex--
            }
        },
    },
}
</script>