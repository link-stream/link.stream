<template>
    <div>
        form wiz
        <StepTrackType />
        <StepTrackInfo />
        <StepLicense />
        <StepUpload />
        <StepMarketing />
        <StepReview />
    </div>
</template>

<script>
import StepTrackType from './Steps/TrackType'
import StepTrackInfo from './Steps/TrackInfo'
import StepLicense from './Steps/License'
import StepUpload from './Steps/Upload'
import StepMarketing from './Steps/Marketing'
import StepReview from './Steps/Review'

export default {
    name: 'AddTrackWizard',
    components: {
        StepTrackType,
        StepTrackInfo,
        StepLicense,
        StepUpload,
        StepMarketing,
        StepReview,
    },
}
</script>