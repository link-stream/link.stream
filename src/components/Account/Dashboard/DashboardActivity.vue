<template>
    <b-container class="DashboardActivity">
        <b-card class="activity-card" no-body>
            <b-card-text class="d-flex align-items-center text-card">
                <b-avatar class="avatar-card" :src="activity.image"></b-avatar>
                <span>
                    <b>{{ userName }}</b>
                    {{ activity.log }}
                </span>
                <b-link
                    size="xs"
                    :to="{
                        name: 'publicProfile',
                        params: { url: activity.url },
                    }"
                    target="_blank"
                    class="btn btn-outline-light rounded-pill btn-profile ml-auto"
                >Profile</b-link>
            </b-card-text>
        </b-card>
    </b-container>
</template>

<script>
export default {
    name: 'DashboardActivity',
    props: {
        activity: {
            type: Object,
            default: () => [],
        },
    },
    data() {
        return {
            userName: '',
        }
    },
    created() {
        this.userName =
            this.activity.first_name && this.activity.last_name
                ? `${this.activity.first_name} ${this.activity.last_name}`
                : this.activity.display_name
    },
}
</script>
