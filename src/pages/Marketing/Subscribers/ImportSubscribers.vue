<template>
    <div class="page page-import-subscribers">
        <header class="page-header">
            <h1 class="page-title">Import Subscribers</h1>
        </header>
        <div class="page-body">
            <WizardTabs
                :tabs="tabs"
                :activeStepName="step"
                :activeStepIndex="stepIndex"
            />
            <ImportFile v-if="step === 'import'" @next="handleNextClick" />
            <SelectStatus v-if="step === 'status'" @next="handleNextClick" />
            <ReviewMatch v-if="step === 'match'"  @next="handleNextClick" />
            <ReviewSubscribers v-if="step === 'review'" @next="handleNextClick" />
        </div>
        <!-- <footer class="page-footer">
            <basic-button
                v-if="step === 'review'"
                variant="secondary"
                class="btn-prev"
                :disabled="saving"
                @click="handleCancelClick"
            >
                Cancel
            </basic-button>
            <spinner-button
                class="btn-next"
                :loading="saving"
                @click="handleNextClick"
            >
                {{ step === 'review' ? 'Complete Import' : 'Next' }}
            </spinner-button>
        </footer> -->
    </div>
</template>
<script>
import { mapState } from 'vuex' 
import {
    WizardTabs,
    ImportFile,
    SelectStatus,
    ReviewMatch,
    ReviewSubscribers,
} from '@/components/Marketing/Subscribers'
export default {
    name: 'ImportSubscribers',
    components: {
        WizardTabs,
        ImportFile,
        SelectStatus,
        ReviewMatch,
        ReviewSubscribers,
    },
    data: () => ({
        tabs: [
            {
                text: 'Import',
                step: 'import',
            },
            {
                text: 'Select status',
                step: 'status',
            },
            {
                text: 'Match',
                step: 'match',
            },
            {
                text: 'Review',
                step: 'review',
            },
        ],
        stepIndex: 0,
        saving: false,
    }),
    computed: {
        ...mapState({
            importSubscribers: 'marketing/importSubscribers',
        }),
        step() {
            return this.tabs[this.stepIndex].step
        },
    },
    methods: {
        handleNextClick() {
            if (this.stepIndex < this.tabs.length - 1) {
                this.stepIndex++
            } else {
                console.log('last')
            }
        },
    },
}
</script>
