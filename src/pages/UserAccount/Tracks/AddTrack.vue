<template>
    <div class="page page-ua-track-add">
        <h1>Track Add</h1>
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
