<template>
    <div class="page page-messages">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Manage subscribers</h1>
                <h4 class="page-subtitle">
                    You have
                    <span class="font-weight-bold">
                        {{ cntEmail | thousandCNumber }}
                    </span>
                    email subscribers and
                    <span class="font-weight-bold">
                        {{ cntSms | thousandCNumber }}
                    </span>
                    SMS subscribers
                </h4>
            </div>
            <div class="right-col">
                <basic-button @click="handleCreateClick">
                    Add Subscribers
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-empty" v-if="!loading && !subscribers.length">
                <div class="empty-text">
                    Your subscribers will appear here.
                </div>
            </div>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-else-if="subscribers.length > 0">
            </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Subscribers',
    data: () => ({
        loading: false,
        cntEmail: 5748,
        cntSms: 2257,
    }),
    computed: {
        ...mapGetters({
            subscribers: 'marketing/subscribers',
        }),
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('marketing/getSubscribers')
        this.loading = false
        console.log(this.subscribers)
    }
}
</script>