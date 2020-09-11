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
                <p class="description mb-0">
                    {{ smsData.campaing_name }}
                    is on its way to
                    {{ cntSubscribers }}
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
    data: () => ({
        cntSubscribers: 200,
    }),
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    created() {
        console.log(this.smsData)
    },
}
</script>
