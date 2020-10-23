<template>
    <b-container class="AnalyticsList">
        <b-card class="analytics-list-card" no-body>
            <b-card-text class="d-flex align-items-center text-card">
                <b-avatar class="avatar-card" :src="referrer.img"></b-avatar>
                <span>{{ referrer.utm_source }}</span>
                <span class="ml-auto">{{ referrer.Count }}</span>
            </b-card-text>
        </b-card>
    </b-container>
</template>

<script>
export default {
    name: 'AnalyticsTopReferres',
    props: {
        referrer: {
            type: Object,
        },
    },
}
</script>
