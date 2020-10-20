<template>
    <div class="page page-edit-message">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'marketingMessages' }"
            >
                <i class="ico ico-back"></i>
                <span>Messages</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">
                    Your SMS has been sent!
                </h1>
                <p v-if="smsData.scheduled" class="description mb-0">
                    {{ smsData.campaing_name }}
                    will be sent on
                    {{ smsData.date | mmddyyyy }}
                    at
                    {{
                        new Date(smsData.date + ' ' + smsData.time) | normalTime
                    }}
                    {{ timezone.zone }}
                </p>
                <p v-else class="description mb-0">
                    {{ smsData.campaing_name }}
                    is on its way to
                    {{ smsData.cnt_subscribers }}
                    SMS subscribers
                </p>
            </div>
        </header>
        <main class="page-body">
            <basic-button :to="{ name: 'marketingMessages' }">
                Go to Messages
            </basic-button>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SentSMS',
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
            user: 'me/user',
            timezones: 'common/timezones',
        }),
        timezone() {
            return this.timezones.find(({ id }) => id === this.user.timezone)
        },
    },
    async created() {
        await this.$store.dispatch('common/loadTimezones')
    },
}
</script>
