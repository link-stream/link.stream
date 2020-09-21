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
            <ImportType v-if="step === 'import'" />
            <SelectStatus v-if="step === 'status'" />
        </div>
        <footer class="page-footer">
            <basic-button
                v-if="stepIndex > 0"
                variant="secondary"
                class="btn-prev"
                :disabled="saving"
                @click="handlePrevClick"
            >
                Back
            </basic-button>
            <spinner-button
                class="btn-next"
                :loading="saving"
                @click="handleNextClick"
            >
                Next
            </spinner-button>
        </footer>
    </div>
</template>
<script>
import {
    WizardTabs,
    ImportType,
    SelectStatus,
} from '@/components/Marketing/Subscribers'
export default {
    name: 'ImportSubscribers',
    components: {
        WizardTabs,
        ImportType,
        SelectStatus,
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
        handlePrevClick() {
            if (this.stepIndex > 0) {
                this.stepIndex--
            }
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
