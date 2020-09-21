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
            <ImportFile v-if="step === 'import'" />
            <SelectStatus v-if="step === 'status'" />
            <ReviewMatch v-if="step === 'match'" />
            <ReviewSubscribers v-if="step === 'review'" />
        </div>
        <footer class="page-footer">
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
        </footer>
    </div>
</template>
<script>
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
        step() {
            return this.tabs[this.stepIndex].step
        },
    },
    methods: {
        handleCancelClick() {
            this.$router.push({
                name: 'addSubscriber',
            })
        },
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
