<template>
    <div class="page page-ua-track-add">
        <AddTrackWizard />
    </div>
</template>

<script>
import { AddTrackWizard } from '~/components/UserAccount/Tracks'

export default {
    name: 'AddTrack',
    components: {
        AddTrackWizard,
    },
}
</script>
