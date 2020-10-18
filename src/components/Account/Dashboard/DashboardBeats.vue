<template>
    <b-container class="DashboardBeats">
        <b-card class="beats-card" no-body>
            <b-card-text class="d-flex align-items-center text-card">
                <h3>{{ index + 1 }}</h3>
                <b-avatar square class="avatar-card" :src="beat.image_url"></b-avatar>
                <div>
                    <span>{{ beat.title }}</span>
                    <span class="count-span">{{ beat.Count }} beat plays</span>
                </div>
            </b-card-text>
        </b-card>
    </b-container>
</template>

<script>
export default {
    name: 'DashboardBeats',
    props: {
        beat: {
            type: Object,
        },
        index: {
            type: Number,
        },
    },
}
</script>
